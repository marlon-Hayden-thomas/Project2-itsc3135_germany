import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function CommentBox({ isAuthenticated, onAddComment }) {
  const [text, setText] = useState("");
  const [touched, setTouched] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateError, setTranslateError] = useState("");

  // Only take lang + t from context
  const { lang, t } = useLanguage();

  // If user is not logged in, show locked message
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

  // Local helper that hits your Express + OpenAI backend
  async function translateComment(text, sourceLang, targetLang) {
    try {
      const response = await fetch("http://localhost:3001/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          sourceLang,
          targetLang,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Translation server error:", data.error);
        return text; // fallback to original
      }

      return data.translatedText || text;
    } catch (error) {
      console.error("Translation request failed:", error);
      return text; // fallback to original
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setTouched(true);
    setTranslateError("");

    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    // Current UI language
    const fromLang = lang; // "en" or "de"
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
