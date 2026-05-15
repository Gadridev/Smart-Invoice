import { Link } from "react-router-dom";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge.jsx";

function DueIcon() {
  return (
    <svg className="inv-due__icon" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
      />
    </svg>
  );
}

export function InvoiceRow({ row }) {
  const paidClass =
    row.paidTone === "zero"
      ? "inv-paid inv-paid--zero"
      : row.paidTone === "partial"
        ? "inv-paid inv-paid--partial"
        : "inv-paid inv-paid--full";

  return (
    <tr>
      <td>
        <span className="inv-num">{row.number}</span>
      </td>
      <td>
        <span className="inv-supplier">{row.supplier}</span>
      </td>
      <td>
        <span className="inv-amount">{row.amount}</span>
      </td>
      <td>
        <span className={paidClass}>{row.paid}</span>
      </td>
      <td>
        <span
          className={
            row.dueLate ? "inv-due inv-due--late" : "inv-due"
          }
        >
          {row.dueLate && <DueIcon />}
          {row.dueDate}
        </span>
      </td>
      <td>
        <InvoiceStatusBadge variant={row.status} />
      </td>
      <td>
        <Link to={`/invoices/${row.id}`} className="inv-action-btn">
          Voir →
        </Link>
      </td>
    </tr>
  );
}
