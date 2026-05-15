import { useState, useEffect } from "react";
import "@/styles/dashboard.css";
import Loading from "@/components/Loading.jsx";
import { getDashboard } from "@/api/dashboardApi.js";
import { formatMAD } from "@/utils/currency.js";

const STATUS_META = {
  paid: { label: "Payées", count: 0, color: "var(--success)", icon: "✅" },
  partially_paid: { label: "Partielles", count: 0, color: "var(--warn)", icon: "🟡" },
  unpaid: { label: "Impayées", count: 0, color: "var(--danger)", icon: "🔴" },
};

function StatCard({ icon, label, value, sub, trend }) {
  return (
    <div className="stat-card">
      <div className="stat-card__head">
        <span className="stat-card__icon">{icon}</span>
        <span className="stat-card__label">{label}</span>
      </div>
      <div className="stat-card__value">{value}</div>
      {sub && <div className="stat-card__sub">{sub}</div>}
      {trend != null && (
        <div
          className="stat-card__trend"
          data-up={trend >= 0}
          data-down={trend < 0}
        >
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% vs mois précédent
        </div>
      )}
    </div>
  );
}

function Bar({ label, value, max, color }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="bar-row">
      <span className="bar-row__label">{label}</span>
      <div className="bar-row__track">
        <div
          className="bar-row__fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="bar-row__value">{formatMAD(value)}</span>
    </div>
  );
}

function StatusRing({ stats }) {
  // Calculate total invoices
  let total = 0;
  for (const key in stats) {
    total += stats[key];
  }
  const displayTotal = total || 1; // Avoid division by zero

  // Prepare items for legend and SVG
  const items = [];
  for (const key in STATUS_META) {
    const meta = STATUS_META[key];
    const count = stats[key] ?? 0;
    const pct = ((count / displayTotal) * 100).toFixed(1);
    items.push({ ...meta, key, count, pct });
  }

  // Calculate SVG circles
  let currentOffset = 0;
  const circles = items.map((item) => {
    const len = (item.count / displayTotal) * 100;
    const dash = len > 0 ? Math.max(len, 0.5) : 0;
    const gap = 100 - dash;
    const colors = {
      paid: "var(--success)",
      partially_paid: "var(--warn)",
      unpaid: "var(--danger)",
    };

    const circle = (
      <circle
        key={item.key}
        cx="21"
        cy="21"
        r="15.9"
        fill="none"
        stroke={colors[item.key]}
        strokeWidth="3.5"
        strokeDasharray={`${dash} ${gap}`}
        strokeDashoffset={-currentOffset}
        strokeLinecap="round"
      />
    );

    currentOffset += dash;
    return circle;
  });

  return (
    <div className="status-ring">
      <div className="status-ring__center">
        <span className="status-ring__total">{total}</span>
        <span className="status-ring__total-label">factures</span>
      </div>
      <div className="status-ring__segments">
        <svg viewBox="0 0 42 42" className="status-ring__svg">
          {circles}
        </svg>
      </div>
      <div className="status-ring__legend">
        {items.map((item) => (
          <div key={item.key} className="status-ring__row">
            <span
              className="status-ring__dot"
              style={{ background: item.color }}
            />
            <span className="status-ring__row-label">{item.label}</span>
            <span className="status-ring__row-count">{item.count}</span>
            <span className="status-ring__row-pct">{item.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // We create an async function inside useEffect to fetch data
    async function fetchData() {
      try {
        setLoading(true);
        const dashboardData = await getDashboard();
        setData(dashboardData);
      } catch (err) {
        const errorMessage = err?.response?.data?.message || err.message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading message="Chargement du tableau de bord…" />;
  }

  if (error) {
    return (
      <div className="dash-error">
        <p className="dash-error__icon">⚠️</p>
        <p className="dash-error__msg">{error}</p>
      </div>
    );
  }

  // Set default values if data is missing
  const totalInvoices = data?.totalInvoices || 0;
  const totalAmount = data?.totalAmount || 0;
  const totalPaid = data?.totalPaid || 0;
  const totalRemaining = data?.totalRemaining || 0;
  const totalSuppliers = data?.totalSuppliers || 0;
  const invoicesByStatus = data?.invoicesByStatus || { unpaid: 0, partially_paid: 0, paid: 0 };

  const paymentRate = totalAmount > 0 ? (totalPaid / totalAmount) * 100 : 0;
  const overdue = invoicesByStatus.unpaid || 0;

  // Prepare summary blocks for the bottom section
  const summaryStats = [
    {
      label: "Payées",
      count: invoicesByStatus.paid,
      pct: totalInvoices > 0 ? ((invoicesByStatus.paid / totalInvoices) * 100).toFixed(0) : 0,
      color: "var(--success)",
      icon: "✓",
    },
    {
      label: "Partielles",
      count: invoicesByStatus.partially_paid,
      pct: totalInvoices > 0 ? ((invoicesByStatus.partially_paid / totalInvoices) * 100).toFixed(0) : 0,
      color: "var(--warn)",
      icon: "◐",
    },
    {
      label: "Impayées",
      count: invoicesByStatus.unpaid,
      pct: totalInvoices > 0 ? ((invoicesByStatus.unpaid / totalInvoices) * 100).toFixed(0) : 0,
      color: "var(--danger)",
      icon: "✗",
    },
  ];

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <StatCard
          icon="🧾"
          label="Total factures"
          value={totalInvoices}
          sub={`${totalSuppliers} fournisseurs`}
          trend={12}
        />
        <StatCard
          icon="💰"
          label="Total dépenses"
          value={formatMAD(totalAmount)}
          sub={`${formatMAD(totalRemaining)} restant`}
          trend={8.3}
        />
        <StatCard
          icon="⚠️"
          label="Factures en retard"
          value={overdue}
          sub={overdue > 0 ? `${overdue} cette semaine` : "Aucune"}
          trend={overdue > 0 ? -1 : 0}
        />
        <StatCard
          icon="✅"
          label="Taux de paiement"
          value={`${paymentRate.toFixed(1)}%`}
          sub={`${formatMAD(totalPaid)} payé sur ${formatMAD(totalAmount)}`}
          trend={3.1}
        />
      </div>

      <div className="charts-grid">
        <div className="card">
          <div className="card__header">
            <h3 className="card__title">Répartition financière</h3>
            <span className="card__sub">MONTANTS EN MAD</span>
          </div>
          <div className="card__body">
            <Bar
              label="Payé"
              value={totalPaid}
              max={totalAmount}
              color="var(--success)"
            />
            <Bar
              label="Restant"
              value={totalRemaining}
              max={totalAmount}
              color="var(--warn)"
            />
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <h3 className="card__title">Répartition des statuts</h3>
            <span className="card__sub">
              {totalInvoices} FACTURES TOTAL
            </span>
          </div>
          <div className="card__body">
            <StatusRing stats={invoicesByStatus} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card__header">
          <h3 className="card__title">Résumé des statuts</h3>
          <span className="card__sub">TOUTES LES FACTURES</span>
        </div>
        <div className="card__body card__body--row">
          {summaryStats.map((s) => (
            <div key={s.label} className="stat-block">
              <div className="stat-block__icon" style={{ color: s.color }}>
                {s.icon}
              </div>
              <div>
                <div className="stat-block__count">
                  {s.count}
                  <span className="stat-block__pct">{s.pct}%</span>
                </div>
                <div className="stat-block__label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
