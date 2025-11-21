# Project2-itsc3135
BundesBlog – Project 2 (ITSC 3135)

BundesBlog is a React blog about Germany, inspired by my home country. The application features user authentication, bilingual language support, and AI-powered translation with the OpenAI API. It shows modern React development, including protected routes, context-based state management, and a Node.js translation backend.

Features

User Authentication

It uses a simple form-based login mechanism: users log in, can post comments, and view authenticated content. The application manages authentication state via React Context.

Multilingual support: English and German

Because this project is based on my home country, the application fully supports English and German. The entire user interface can switch languages instantly using a global LanguageContext.

AI-Powered Translation

Comments automatically translated with OpenAI powered Node backend.

English to German

German to English

Original and translated versions set side-by-side

Includes a fallback dictionary when API credits are unavailable

Germany-Inspired UI

The modern, dark design of the interface is based on the colors of the German flag: black, red, and gold.

All pages are fully responsive, with styling to give them a clean, professional appearance.

Backend Translation Server

A custom Node.js server handles the following:

OpenAI text translation

Language detection Fallback translations Loading environment variables securely
