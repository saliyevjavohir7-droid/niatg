# Niat Marketing Lead Generation App

This project consists of a React frontend and a Google Apps Script backend.

## Backend Deployment (Google Apps Script)

1. Go to your Google Sheet "Niat Marketing Arizalar".
2. Click `Extensions` > `Apps Script`.
3. Clear the default code and copy the content from `backend/Code.gs` into the editor.
4. Click `Save`.
5. Click `Deploy` > `New deployment`.
6. Click the `Select type` gear icon > `Web app`.
7. **Description**: "Backend API".
8. **Execute as**: "Me" (your email).
9. **Who has access**: "Anyone" (Important for public forms).
10. Click `Deploy`.
11. Copy the **Web App URL**.
12. Open `src/constants.ts` in this project and paste the URL into `GOOGLE_SCRIPT_URL`.

## Frontend Setup

1. Install dependencies: `npm install`
2. Run development server: `npm start`
3. Build for production: `npm run build`
