🎬 CineGPT - GPT-powered Movie Recommendation App

CineGPT is an intelligent movie recommendation app built with React and powered by OpenAI GPT and TMDB APIs. Users can search for movie suggestions using natural language and explore categorized movie content like Trending, Popular, Top Rated, and Upcoming titles.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://cine-gpt-c4bc8.web.app/)

## Demo Credentials

**Email:** test@user.com  
**Password:** Test@1234

## 📷 Screenshots

### Landing Page

![Landing Page view](./src/assets/cinegpt-Landing%20page%20view.png)

### Signup

![Signup view](./src/assets/cinegpt-Signup%20view.png)

### Browse Products

![Browse Page view](./src/assets/cinegpt-Browse%20view.png)

### Movie Cards

![Movie Cards view](./src/assets/cinegpt-Movie%20Cards%20view.png)

### GPT Search

![Gpt Search Movie](./src/assets/cinegpt-gpt%20search%20view.png)

🚀 Features
🔐 Authentication with Firebase

🤖 GPT-powered movie search

🎞️ Trending / Popular / Top Rated / Upcoming movies

🎥 Movie trailer previews with hover interaction

🌐 Multi-language support

📱 Responsive design

🔐 Protected routes for authenticated users

💬 GPT integration with language toggle

🌓 Light/Dark mode toggle

🛠️ Tech Stack
Frontend: React (Create React App), Tailwind CSS

State Management: Redux Toolkit

Auth: Firebase Authentication

API Integration: OpenAI (GPT), TMDB

Routing: React Router DOM

Icons: React Icons

## 📁 Project Structure

```
cine-gpt/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       └── images/
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   └── cinegpt_banner.png
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── Footer/
│   │   │   └── Footer.js
│   │   ├── Header/
│   │   │   └── Header.js
│   │   ├── HoverPreviewCard/
│   │   │   └── HoverPreviewCard.js
│   │   ├── Layout/
│   │   │   └── Layout.js
│   │   ├── MovieCard/
│   │   │   └── MovieCard.js
│   │   ├── MovieRow/
│   │   │   └── MovieRow.js
│   │   ├── ShowMoreInfo/
│   │   │   └── ShowMoreInfo.js
│   │   ├── ThemeProvider/
│   │   │   └── ThemeProvider.js
│   │   ├── ThemeToggle/
│   │   │   └── ThemeToggle.js
│   │   ├── VideoBackground/
│   │   │   └── VideoBackground.js
│   │   └── VideoTitle/
│   │       └── VideoTitle.js
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── AuthListener.js
│   │   │   ├── Login.js
│   │   │   └── ProtectedRoute.js
│   │   ├── gpt/
│   │   │   ├── GptSearch.js
│   │   │   ├── GptSearchBar.js
│   │   │   └── GptMovieSuggestions.js
│   │   └── home/
│   │       ├── Browse.js
│   │       ├── LandingPage.js
│   │       ├── MainContainer.js
│   │       ├── SecondaryContainer.js
│   │       └── NotFound.js
│   │
│   ├── hooks/
│   │   ├── useNowPlayingMovies.js
│   │   ├── usePopularMovies.js
│   │   ├── useTopRatedMovies.js
│   │   ├── useTrailerVideoKey.js
│   │   └── useUpcomingMovies.js
│   │
│   ├── redux/
│   │   ├── appStore.js
│   │   ├── configSlice.js
│   │   ├── gptSlice.js
│   │   ├── moviesSlice.js
│   │   └── userSlice.js
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── firebase.js
│   │   ├── languageConstants.js
│   │   ├── openai.js
│   │   ├── staticApiData.js
│   │   ├── themeConstants.js
│   │   └── validate.js

│   │
│   ├── App.js
│   └── index.js
│
├── .env
├── .gitignore
├── package.json
├── README.md
└── tailwind.config.js
```

### 📂 Directory Explanations

1. **`/public`**: Static files

   - Main HTML file
   - Favicon and other static assets

2. **`/src/assets`**: Media files

   - Images and icons used in the application

3. **`/src/components`**: Reusable UI components

   - Each component in its own directory
   - Contains component-specific logic and styles

4. **`/src/features`**: Feature-based modules

   - `auth`: Authentication related components
   - `gpt`: GPT search functionality
   - `home`: Main application pages

5. **`/src/hooks`**: Custom React hooks

   - Movie data fetching hooks
   - Custom functionality hooks

6. **`/src/redux`**: State management

   - Redux store configuration
   - Feature-specific slices
   - Actions and reducers

7. **`/src/utils`**: Utility functions and constants

   - API configurations
   - Constants and helpers
   - Firebase setup
   - Language configurations
   - Validation functions
   - Constant Tailwind CSS Theme styles for dark and light themes

8. **Root files**
   - Configuration files
   - Environment variables
   - Package management
   - Documentation

This structure follows a feature-based organization pattern that promotes:

- Modularity and reusability
- Clear separation of concerns
- Easy navigation and maintenance
- Scalable architecture

🔧 Setup Instructions
Clone the repo

git clone https://github.com/premasagarbontula/cine-gpt.git
cd cine-gpt
Install dependencies

npm install
Set up environment variables

npm start
Open http://localhost:3000 to view in browser.

Deploy Link: https://cine-gpt-c4bc8.web.app/
**Demo Credentials**:
Email: test@user.com
Password: Test@1234

✍️ Author
Name: Prema Sagar B

GitHub: https://github.com/premasagarbontula

LinkedIn: https://www.linkedin.com/in/premasagarbontula/

🪪 License
This project is licensed under the MIT License.
