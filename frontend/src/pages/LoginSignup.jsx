import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/LoginSignup.css";
import { useAuth } from "@/context/AuthContext.jsx";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function mapServerErrors(details) {
  const map = {};
  for (const e of details) {
    const key = e.path === "password_confirmation" ? "confirmPassword" : e.path;
    map[key] = e.message;
  }
  return map;
}

export default function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const { user, initializing, login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";

  useEffect(() => {
    if (!initializing && user) {
      navigate(from, { replace: true });
    }
  }, [user, initializing, navigate, from]);

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function validateForm() {
    const next = {};

    if (isSignup && !formData.name.trim()) {
      next.name = "Le nom est obligatoire";
    }
    if (!formData.email.trim()) {
      next.email = "L'email est obligatoire";
    }
    if (!formData.password.trim()) {
      next.password = "Le mot de passe est obligatoire";
    } else if (isSignup && formData.password.length < 8) {
      next.password = "Minimum 8 caractères";
    }
    if (isSignup) {
      if (!formData.confirmPassword.trim()) {
        next.confirmPassword = "Confirmez votre mot de passe";
      } else if (formData.password !== formData.confirmPassword) {
        next.confirmPassword = "Les mots de passe ne correspondent pas";
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    setErrors({});

    try {
      if (isSignup) {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        });
      } else {
        await login({
          email: formData.email,
          password: formData.password,
        });
      }
    } catch (error) {
      const body = error.response?.data;
      if (body?.errors?.length) {
        setErrors(mapServerErrors(body.errors));
      } else {
        alert(body?.message ?? "Une erreur est survenue");
      }
    }
  }

  return (
    <div className="login-page container">
      <div className="box">
        <div className="text">
          <h1>
            Fac<span>turo</span>
          </h1>
          <p className="subtitle">GESTION INTELLIGENTE DES FACTURES</p>
          <h2>{isSignup ? "Créer un compte" : "Bon retour 👋"}</h2>
        </div>

        <form className="inputs" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="input">
              <p>Nom complet</p>
              <input
                type="text"
                placeholder="Ali Benali"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && <small className="error">{errors.name}</small>}
            </div>
          )}

          <div className="input">
            <p>Adresse e-mail</p>
            <input
              type="email"
              placeholder="ali.benali@facturo.fr"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>

          <div className="input">
            <p>Mot de passe</p>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {errors.password && (
              <small className="error">{errors.password}</small>
            )}
          </div>

          {isSignup && (
            <div className="input">
              <p>Confirmer mot de passe</p>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
              />
              {errors.confirmPassword && (
                <small className="error">{errors.confirmPassword}</small>
              )}
            </div>
          )}

          <button className="btn" type="submit" disabled={initializing}>
            {isSignup ? "Créer un compte" : "Se connecter"}
          </button>

          <div className="line">
            <span>ou</span>
          </div>

          <div className="signup">
            {isSignup ? (
              <>
                Déjà un compte ?{" "}
                <span
                  onClick={() => {
                    setIsSignup(false);
                    setErrors({});
                  }}
                >
                  Se connecter
                </span>
              </>
            ) : (
              <>
                Pas encore de compte ?{" "}
                <span
                  onClick={() => {
                    setIsSignup(true);
                    setErrors({});
                  }}
                >
                  Créer un compte
                </span>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
