import { useState } from "react";
import "../styles/LoginSignup.css";
import api from "@/api/axios";

const LoginSignup = () => {
    const [isSignup, setIsSignup] = useState(false);

    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const validateForm = () => {
        let newErrors = {};

        // name
        if (isSignup && !formData.name.trim()) {
            newErrors.name = "Le nom est obligatoire";
        }

        // email
        if (!formData.email.trim()) {
            newErrors.email = "L'email est obligatoire";
        }

        // password
        if (!formData.password.trim()) {
            newErrors.password =
                "Le mot de passe est obligatoire";
        } else if (formData.password.length < 6) {
            newErrors.password =
                "Minimum 6 caractères";
        }

        // confirm password
        if (isSignup) {
            if (!formData.confirmPassword.trim()) {
                newErrors.confirmPassword =
                    "Confirmez votre mot de passe";
            } else if (
                formData.password !==
                formData.confirmPassword
            ) {
                newErrors.confirmPassword =
                    "Les mots de passe ne correspondent pas";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {

    // REGISTER
    if (isSignup) {

      const res = await api.post(
        "/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      alert("Compte créé");

      console.log(res.data);

    } 
    
    // LOGIN
    else {

      const res = await api.post(
        "/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Connexion réussie");

      console.log(res.data);
    }

  } catch (error) {

    alert(
      error.response?.data?.message
    );

    console.log(error);
  }
};

    return (
        <div className="container">
            <div className="box">
                <div className="text">
                    <h1>
                        Fac<span>turo</span>
                    </h1>

                    <p className="subtitle">
                        GESTION INTELLIGENTE DES FACTURES
                    </p>

                    <h2>
                        {isSignup
                            ? "Créer un compte"
                            : "Bon retour 👋"}
                    </h2>
                </div>

                <form
                    className="inputs"
                    onSubmit={handleSubmit}
                >
                    {/* NAME */}
                    {isSignup && (
                        <div className="input">
                            <p>Nom complet</p>

                            <input
                                type="text"
                                placeholder="Ali Benali"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                            />

                            {errors.name && (
                                <small className="error">
                                    {errors.name}
                                </small>
                            )}
                        </div>
                    )}

                    {/* EMAIL */}
                    <div className="input">
                        <p>Adresse e-mail</p>

                        <input
                            type="email"
                            placeholder="ali.benali@facturo.fr"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />

                        {errors.email && (
                            <small className="error">
                                {errors.email}
                            </small>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div className="input">
                        <p>Mot de passe</p>

                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password:
                                        e.target.value,
                                })
                            }
                        />

                        {errors.password && (
                            <small className="error">
                                {errors.password}
                            </small>
                        )}
                    </div>

                    {/* CONFIRM PASSWORD */}
                    {isSignup && (
                        <div className="input">
                            <p>
                                Confirmer mot de passe
                            </p>

                            <input
                                type="password"
                                placeholder="••••••••"
                                value={
                                    formData.confirmPassword
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        confirmPassword:
                                            e.target.value,
                                    })
                                }
                            />

                            {errors.confirmPassword && (
                                <small className="error">
                                    {
                                        errors.confirmPassword
                                    }
                                </small>
                            )}
                        </div>
                    )}

                    <button type="submit">
                        {isSignup
                            ? "Créer un compte"
                            : "Se connecter"}
                    </button>

                    <div className="line">
                        <span>ou</span>
                    </div>

                    <div className="signup">
                        {isSignup ? (
                            <>
                                Déjà un compte ?{" "}
                                <span
                                    onClick={() =>
                                        setIsSignup(false)
                                    }
                                >
                                    Se connecter
                                </span>
                            </>
                        ) : (
                            <>
                                Pas encore de compte ?{" "}
                                <span
                                    onClick={() =>
                                        setIsSignup(true)
                                    }
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
};

export default LoginSignup;