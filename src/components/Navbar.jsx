
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    if (location.pathname !== "/") {
      navigate("/");
    }
  }

  function handleSetLang(next) {
    setLang(next);
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          BundesBlog
        </Link>
        <nav className="nav-links">
          <Link to="/">{t("navbarHome")}</Link>
          <Link to="/blog">{t("navbarBlog")}</Link>
        </nav>
        <div className="nav-right">
          <div className="lang-switch">
            <span className="lang-label">{t("langLabel")}:</span>
            <button
              type="button"
              className={`btn btn-ghost lang-btn ${
                lang === "en" ? "lang-btn-active" : ""
              }`}
              onClick={() => handleSetLang("en")}
            >
              {t("langEN")}
            </button>
            <button
              type="button"
              className={`btn btn-ghost lang-btn ${
                lang === "de" ? "lang-btn-active" : ""
              }`}
              onClick={() => handleSetLang("de")}
            >
              {t("langDE")}
            </button>
          </div>
          {isAuthenticated ? (
            <>
              <span className="nav-username">
                {t("navbarWelcomePrefix")} {user.username}
              </span>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              {t("navbarLogin")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
