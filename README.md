# 🔎 LostLink

LostLink is a Thapar campus lost-and-found web app prototype. Students can post lost or found items, browse and filter reports, and submit private claims to help reunite belongings with their owners. 🤝

## ✨ Features

- 📊 Dashboard with recent reports, item counts, and possible matches
- 🔍 Browse and filter reports by type, category, location, date, and status
- 📣 Create lost-item and found-item reports
- 📨 Submit claims with private identifying details; item owners can review requests
- 🪪 Safety guidance for handing found ID cards to their owner or campus authority
- 👤 Manage your reports and profile
- 🎨 Warm light theme and dark theme, with the selection saved in the browser
- 📱 Responsive layout for desktop and mobile

## 🚀 Getting Started
To run LostLink locally, clone this repository to your system:

```
git clone <repository-url>
```
Navigate to the project folder:

```
cd LostLink
```
Open the `index.html` file in your browser or use the **Live Server** extension in VS Code to launch the application.

No additional installation or setup is required.

## 🧪 Demo and data

Use **Continue with demo account** on the sign-in screen to explore the app. Reports, claims, profile details, uploaded found-item photos, and theme preference are stored in your browser's `localStorage`; they are not shared with other users or synchronized to a server. Clearing the browser's site data will remove them. 💾 Sample item photos load from Unsplash and require an internet connection.

Sign-in and student verification are simulated in this prototype. No email is sent, and passwords are not authenticated or stored. **🔒 Do not enter a real password or sensitive personal information.**

## 📁 Project files

- `index.html` — app shell and page structure 🧱
- `styles.css` — layout, components, responsive styles, and color themes 🎨
- `app.js` — client-side rendering, interactions, demo data, and local storage ⚙️

## 🛠️ Technology

Built with vanilla HTML, CSS, and JavaScript. DM Sans and Manrope are loaded from Google Fonts when an internet connection is available; system fallbacks are used otherwise. 🌐
