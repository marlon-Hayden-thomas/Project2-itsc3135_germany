
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/blog";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/blog", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    setTouched(true);

    if (!username.trim() || !password.trim()) {
      setError(t("loginErrorRequired"));
      return;
    }

    login(username.trim());
    setError("");
    navigate(from, { replace: true });
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="flag-strip small" />
        <h1 className="auth-title">{t("loginTitle")}</h1>
        <p className="auth-subtitle">{t("loginSubtitle")}</p>
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <label className="form-label">
            {t("loginUsernameLabel")}
            <input
              type="text"
              className={`form-input ${
                touched && !username.trim() ? "input-error" : ""
              }`}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder={t("loginUsernamePlaceholder")}
            />
          </label>

          <label className="form-label">
            {t("loginPasswordLabel")}
            <input
              type="password"
              className={`form-input ${
                touched && !password.trim() ? "input-error" : ""
              }`}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t("loginPasswordPlaceholder")}
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn-primary auth-submit">
            {t("loginButton")}
          </button>
        </form>
      </div>
    </section>
  );
}
