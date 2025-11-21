
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function CommentBox({ isAuthenticated, onAddComment }) {
  const [text, setText] = useState("");
  const [touched, setTouched] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateError, setTranslateError] = useState("");
  const { lang, t, translateComment } = useLanguage();

  if (!isAuthenticated) {
    return (
      <p className="comment-locked">
        {t("commentLocked")}{" "}
        <Link to="/login" className="comment-login-link">
          {t("navbarLogin")}
        </Link>
        .
      </p>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setTouched(true);
    setTranslateError("");
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    const fromLang = lang;
    const toLang = lang === "de" ? "en" : "de";

    setIsTranslating(true);
    let translated = trimmed;
    try {
      translated = await translateComment(trimmed, fromLang, toLang);
    } catch (error) {
      console.error(error);
      setTranslateError(t("commentTranslateError"));
    } finally {
      setIsTranslating(false);
    }

    onAddComment({
      originalLang: fromLang,
      textByLang: {
        [fromLang]: trimmed,
        [toLang]: translated,
      },
    });

    setText("");
    setTouched(false);
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit} noValidate>
      <label className="form-label">
        {t("blogCommentsHeading")}
        <textarea
          className={`form-textarea ${
            touched && !text.trim() ? "input-error" : ""
          }`}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={t("commentPlaceholder")}
          rows={3}
        />
      </label>
      <button
        type="submit"
        className="btn btn-secondary comment-submit"
        disabled={isTranslating}
      >
        {isTranslating ? t("commentTranslating") + "..." : t("commentButton")}
      </button>
      {translateError && <p className="form-error">{translateError}</p>}
    </form>
  );
}
