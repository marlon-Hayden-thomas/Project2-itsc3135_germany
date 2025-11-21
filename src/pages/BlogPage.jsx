import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import CommentBox from "../components/CommentBox.jsx";
import familyPhoto from "../family.jpg";

const posts = [
  {
    id: 1,
    title: {
      en: "Travelling through Germany",
      de: "Reisen durch Deutschland",
    },
    body: {
      en: "From the North Sea to the Alps, Germany offers many landscapes, historic cities, and great food.",
      de: "Von der Nordsee bis zu den Alpen bietet Deutschland viele unterschiedliche Landschaften, historische Städte und gutes Essen.",
    },
  },
  {
    id: 2,
    title: {
      en: "German technology and innovation",
      de: "Deutsche Technologie und Innovation",
    },
    body: {
      en: "Germany is known for engineering and research. This post talks about modern technologies and exciting projects.",
      de: "Deutschland ist für Ingenieurskunst und Forschung bekannt. Dieser Beitrag spricht über moderne Technologien und spannende Projekte.",
    },
  },
  {
  id: 3,
  title: {
    en: "Christmas in Germany with my family",
    de: "Weihnachten in Deutschland mit meiner Familie",
  },
  body: {
    en: "This Christmas I am especially grateful for my family. I love my mom, my sister, my auntie, and my cousin so much. Spending time with them in Germany feels really special. I cannot wait to laugh with them, eat good food together, and make new memories that we will talk about for years.❤️🇩🇪",
    de: "Dieses Weihnachten bin ich meiner Familie besonders dankbar. Ich liebe meine Mutter, meine Schwester, meine Tante und meinen Cousin sehr. Die Zeit mit ihnen in Deutschland zu verbringen, fühlt sich etwas ganz Besonderes an. Ich kann es kaum erwarten, mit ihnen zu lachen, gemeinsam gutes Essen zu genießen und neue Erinnerungen zu schaffen, über die wir noch jahrelang reden werden.❤️🇩🇪",
  },
  image: familyPhoto,
},

];

export default function BlogPage() {
  const { user, isAuthenticated } = useAuth();
  const { lang, t } = useLanguage();
  const [commentsByPost, setCommentsByPost] = useState({});

  function handleAddComment(postId, payload) {
    setCommentsByPost((previous) => {
      const existing = previous[postId] || [];
      const newComment = {
        id: Date.now() + Math.random(),
        author: user.username,
        originalLang: payload.originalLang,
        textByLang: payload.textByLang,
      };
      return {
        ...previous,
        [postId]: [...existing, newComment],
      };
    });
  }

  return (
    <section className="blog-page">
      <h1 className="blog-title">{t("blogTitle")}</h1>
      <p className="blog-intro">
        {t("blogIntroPrefix")} <strong>{user.username}</strong>.{" "}
        {t("blogIntroSuffix")}
      </p>

      <div className="posts-list">
        {posts.map((post) => {
          const comments = commentsByPost[post.id] || [];
          const title = post.title[lang] || post.title.de;
          const body = post.body[lang] || post.body.de;
          return (
            <article key={post.id} className="post-card">
              <h2 className="post-title">{title}</h2>

              {post.image && (
                <img
                  src={post.image}
                  alt="Marlon with family in a restaurant"
                  className="post-image"
                />
              )}

              <p className="post-body">{body}</p>

              <h3 className="comments-heading">{t("blogCommentsHeading")}</h3>
              {comments.length === 0 && (
                <p className="no-comments">{t("blogNoComments")}</p>
              )}
              {comments.length > 0 && (
                <ul className="comments-list">
                  {comments.map((comment) => {
                    const text =
                      comment.textByLang[lang] ||
                      comment.textByLang[comment.originalLang];
                    const originalLabel =
                      comment.originalLang === "de"
                        ? t("commentOriginalLabelDE")
                        : t("commentOriginalLabelEN");
                    const showOriginalBadge = comment.originalLang !== lang;
                    return (
                      <li key={comment.id} className="comment-item">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-text">{text}</span>
                        {showOriginalBadge && (
                          <span className="comment-original-note">
                            {originalLabel}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              <CommentBox
                isAuthenticated={isAuthenticated}
                onAddComment={(payload) => handleAddComment(post.id, payload)}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
