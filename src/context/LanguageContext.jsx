
import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  en: {
    navbarHome: "Home",
    navbarBlog: "Blog",
    navbarLogin: "Login",
    navbarWelcomePrefix: "Welcome,",
    homeTitle: "BundesBlog",
    homeSubtitle:
      "A small React blog with a German theme. Log in to see protected posts and write comments.",
    homeInfoTitle: "What you can do here",
    homeInfoP1:
      "The app uses React Context to manage your login state. Once you are logged in, you are redirected to the protected blog page.",
    homeInfoP2:
      "Colors and accents are inspired by the German flag, with a dark background, red highlights, and golden buttons.",
    homeInfoP3:
      "The layout is responsive so BundesBlog looks good on both desktop and mobile screens.",
    homeCtaLogin: "Login",
    homeCtaExplore: "Explore Blog",
    homeCtaToBlog: "Go to Blog",
    loginTitle: "Login",
    loginSubtitle:
      "For this project you may use any username and password. The data is stored only in your browser.",
    loginUsernameLabel: "Username",
    loginPasswordLabel: "Password",
    loginUsernamePlaceholder: "bundes_student",
    loginPasswordPlaceholder: "secretPassword",
    loginButton: "Login and go to blog",
    loginErrorRequired: "Please enter both username and password.",
    blogTitle: "BundesBlog posts",
    blogIntroPrefix: "You are logged in as",
    blogIntroSuffix: "You can leave a comment below every post.",
    blogCommentsHeading: "Comments",
    blogNoComments: "No comments yet. Start the conversation.",
    commentLocked:
      "Comments are only visible for logged in users. Please log in to write a comment.",
    commentPlaceholder: "What do you think about this post",
    commentButton: "Post comment",
    langLabel: "Language",
    langEN: "EN",
    langDE: "DE",
    commentOriginalLabelDE: "Original comment in German",
    commentOriginalLabelEN: "Original comment in English",
    commentTranslating: "Translating comment",
    commentTranslateError:
      "Could not translate right now, showing original text only",
  },
  de: {
    navbarHome: "Startseite",
    navbarBlog: "Blog",
    navbarLogin: "Login",
    navbarWelcomePrefix: "Willkommen,",
    homeTitle: "BundesBlog",
    homeSubtitle:
      "Ein kleiner React Blog mit Deutschland Thema. Melde dich an, um geschützte Beiträge zu sehen und Kommentare zu schreiben.",
    homeInfoTitle: "Was dich erwartet",
    homeInfoP1:
      "Die Anwendung verwendet React Context, um deinen Loginzustand zu verwalten. Sobald du angemeldet bist, wirst du automatisch zur Blogseite weitergeleitet.",
    homeInfoP2:
      "Die Farben und Akzente orientieren sich an der Flagge von Deutschland mit einem dunklen Hintergrund, roten Highlights und goldenen Schaltflächen.",
    homeInfoP3:
      "Das Layout ist responsiv, damit BundesBlog sowohl auf dem Desktop als auch auf dem Smartphone gut aussieht.",
    homeCtaLogin: "Login",
    homeCtaExplore: "Blog erkunden",
    homeCtaToBlog: "Zum Blog",
    loginTitle: "Login",
    loginSubtitle:
      "Für dieses Projekt kannst du einen beliebigen Benutzernamen und ein beliebiges Passwort verwenden. Die Daten werden nur lokal gespeichert.",
    loginUsernameLabel: "Benutzername",
    loginPasswordLabel: "Passwort",
    loginUsernamePlaceholder: "bundes_student",
    loginPasswordPlaceholder: "geheimesPasswort",
    loginButton: "Einloggen und zum Blog",
    loginErrorRequired: "Bitte gib Benutzername und Passwort ein.",
    blogTitle: "BundesBlog Beiträge",
    blogIntroPrefix: "Du bist angemeldet als",
    blogIntroSuffix:
      "Du kannst unter jedem Beitrag einen Kommentar hinterlassen.",
    blogCommentsHeading: "Kommentare",
    blogNoComments: "Noch keine Kommentare. Starte die Unterhaltung.",
    commentLocked:
      "Kommentare sind nur für angemeldete Nutzer sichtbar. Bitte melde dich an, um einen Kommentar zu schreiben.",
    commentPlaceholder: "Was denkst du über diesen Beitrag",
    commentButton: "Kommentar posten",
    langLabel: "Sprache",
    langEN: "EN",
    langDE: "DE",
    commentOriginalLabelDE: "Original Kommentar auf Deutsch",
    commentOriginalLabelEN: "Original Kommentar auf Englisch",
    commentTranslating: "Kommentar wird übersetzt",
    commentTranslateError:
      "Konnte gerade nicht übersetzen, zeige nur den Originaltext",
  },
};

// local dictionary for demo + fallback
function translateLocally(text, from, to) {
  const pairs = [
    { en: "hello", de: "hallo" },
    { en: "hi", de: "hallo" },
    { en: "hey", de: "hey" },
    { en: "good morning", de: "guten Morgen" },
    { en: "good afternoon", de: "guten Tag" },
    { en: "good evening", de: "guten Abend" },
    { en: "good night", de: "gute Nacht" },
    { en: "how are you", de: "wie geht es dir" },
    { en: "i am fine", de: "mir geht es gut" },
    { en: "i am good", de: "mir geht es gut" },
    { en: "i am tired", de: "ich bin müde" },
    { en: "i am hungry", de: "ich habe Hunger" },
    { en: "i am thirsty", de: "ich habe Durst" },
    { en: "thank you", de: "danke" },
    { en: "thank you very much", de: "vielen Dank" },
    { en: "thanks", de: "danke" },
    { en: "you are welcome", de: "gern geschehen" },
    { en: "please", de: "bitte" },
    { en: "excuse me", de: "entschuldigung" },
    { en: "sorry", de: "tut mir leid" },
    { en: "yes", de: "ja" },
    { en: "no", de: "nein" },
    { en: "maybe", de: "vielleicht" },
    { en: "what is your name", de: "wie heißt du" },
    { en: "my name is", de: "ich heiße" },
    { en: "where is the train station", de: "wo ist der Bahnhof" },
    { en: "where is the bus stop", de: "wo ist die Bushaltestelle" },
    { en: "where is the bathroom", de: "wo ist die Toilette" },
    { en: "how much does this cost", de: "wie viel kostet das" },
    { en: "i would like to eat", de: "ich möchte essen" },
    { en: "i would like to drink", de: "ich möchte trinken" },
    { en: "i love germany", de: "ich liebe Deutschland" },
    { en: "i like this", de: "das gefällt mir" },
    { en: "this is very good", de: "das ist sehr gut" },
    { en: "this is delicious", de: "das ist lecker" },
    { en: "this is interesting", de: "das ist interessant" },
    { en: "see you later", de: "bis später" },
    { en: "see you tomorrow", de: "bis morgen" },
    { en: "goodbye", de: "auf Wiedersehen" },
  ];

  const lower = text.toLowerCase().trim();

  for (const pair of pairs) {
    if (from === "en" && lower === pair.en) {
      return pair.de;
    }
    if (from === "de" && lower === pair.de.toLowerCase()) {
      return pair.en;
    }
  }

  if (from === "en" && to === "de") {
    return text + " (übersetzt ins Deutsche)";
  }

  if (from === "de" && to === "en") {
    return text + " (translated to English)";
  }

  return text;
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("de");

  function t(key) {
    const table = translations[lang] || translations.de;
    return table[key] || key;
  }

  async function translateComment(text, fromLang, toLang) {
    try {
      const response = await fetch("http://localhost:3001/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          sourceLang: fromLang,
          targetLang: toLang,
        }),
      });

      if (!response.ok) {
        throw new Error("Bad response from translation backend");
      }

      const data = await response.json();
      if (data && data.translatedText) {
        return data.translatedText;
      }

      return translateLocally(text, fromLang, toLang);
    } catch (error) {
      console.error("Falling back to local translation:", error);
      return translateLocally(text, fromLang, toLang);
    }
  }

  const value = {
    lang,
    setLang,
    t,
    translateComment,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}
