
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  return (
    <section className="home-container">
      <div className="home-hero-card">
        <div className="flag-strip" />
        <h1 className="home-title">{t("homeTitle")}</h1>
        <p className="home-subtitle">{t("homeSubtitle")}</p>
        <div className="home-actions">
          {isAuthenticated ? (
            <Link className="btn btn-primary" to="/blog">
              {t("homeCtaToBlog")}
            </Link>
          ) : (
            <>
              <Link className="btn btn-primary" to="/login">
                {t("homeCtaLogin")}
              </Link>
              <Link className="btn btn-ghost" to="/blog">
                {t("homeCtaExplore")}
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="home-info-card">
        <h2>{t("homeInfoTitle")}</h2>
        <p>{t("homeInfoP1")}</p>
        <p>{t("homeInfoP2")}</p>
        <p>{t("homeInfoP3")}</p>
      </div>
    </section>
  );
}
