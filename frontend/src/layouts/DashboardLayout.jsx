import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";

function navClass({ isActive }) {
  return `dash-nav__link${isActive ? " dash-nav__link--active" : ""}`;
}

function IconDashboard() {
  return (
    <svg className="dash-nav__icon" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
      />
    </svg>
  );
}

function IconInvoice() {
  return (
    <svg className="dash-nav__icon" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
      />
    </svg>
  );
}

function IconSuppliers() {
  return (
    <svg className="dash-nav__icon" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
      />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg className="dash-nav__icon" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
      />
    </svg>
  );
}

function todayFr() {
  return new Date().toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}


function layoutMeta(pathname) {
  if (pathname.startsWith("/invoices/") && pathname !== "/invoices") {
    return {
      crumb: "Factures / Détail",
      title: "Détail facture #INV-2025-046",
    };
  }
  if (pathname === "/invoices") {
    return { crumb: "Gestion / Factures", title: "Factures" };
  }
  if (pathname.startsWith("/suppliers/") && pathname !== "/suppliers") {
    const id = pathname.split("/")[2];
    return {
      crumb: `Accueil / Fournisseurs / ${id}`,
      title: "Détail fournisseur",
    };
  }
  if (pathname === "/suppliers") {
    return { crumb: "Accueil / Fournisseurs", title: "Fournisseurs" };
  }
  if (pathname === "/dashboard" || pathname === "/") {
    return { crumb: "Accueil / Tableau de bord", title: "Tableau de bord" };
  }
  return { crumb: "Accueil", title: "Page" };
}


function userInitials(name) {
  if (!name?.trim()) return "?";
  return name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function DashboardLayout() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { crumb, title } = layoutMeta(pathname);

  return (
    <div className="dash-root">
      <aside className="dash-sidebar" aria-label="Navigation">
        <div className="dash-sidebar__brand">
          <span className="dash-sidebar__logo">Facturo</span>
          <span className="dash-sidebar__version">V2.4.1 • PRODUCTION</span>
        </div>

        <div className="dash-nav">
          <p className="dash-nav__label">Principal</p>
          <NavLink to="/dashboard" className={navClass} end>
            <IconDashboard />
            Tableau de bord
          </NavLink>

          <p className="dash-nav__label">Gestion</p>
          <NavLink to="/invoices" className={navClass}>
            <IconInvoice />
            Factures
            <span className="dash-nav__badge">3</span>
          </NavLink>
          <NavLink to="/suppliers" className={navClass}>
            <IconSuppliers />
            Fournisseurs
          </NavLink>

          <p className="dash-nav__label">Compte</p>
          <button
            type="button"
            className="dash-nav__link dash-nav__link--button"
            onClick={logout}
          >
            <IconLogout />
            Déconnexion
          </button>
        </div>

        <div className="dash-user">
          <div className="dash-user__avatar" aria-hidden>
            {userInitials(user?.name)}
          </div>
          <div className="dash-user__meta">
            <span className="dash-user__name">{user?.name ?? "—"}</span>
            <span className="dash-user__role">
              {user?.role === "admin" ? "Administrateur" : "Client"}
            </span>
          </div>
        </div>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar">
          <div>
            <p className="dash-topbar__crumb">{crumb}</p>
            <h1 className="dash-topbar__title">{title}</h1>
          </div>
          <div className="dash-topbar__side">
            {pathname === "/invoices" && (
              <button type="button" className="dash-topbar__cta">
                + Nouvelle facture
              </button>
            )}
            <div className="dash-topbar__date">{todayFr()}</div>
          </div>
        </header>
        <div className="dash-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
