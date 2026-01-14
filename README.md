# Midnyt Surprise 🎂

A fully animated, interactive birthday wishes web page connected with automated email delivery.

## Features
- **Cinematic Animations**: Hero section with name reveal and confetti.
- **Scroll Storytelling**: A cover letter that unfolds as you scroll.
- **Photo Memories**: Embedded photos with polaroid style interactions.
- **Admin Interface**: A dedicated settings page (`/admin`) to configure recipient details and date without coding.
- **Automated Delivery**: Node.js backend schedules an email at midnight.

## Setup Instructions

### Frontend
1. Navigate to `frontend`: `cd frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Customize content in `src/data/content.js`.

### Backend
1. Navigate to `backend`: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file based on `.env.example`.
4. Configure your email credentials and recipient details in `.env`.
5. Start server: `npm start` (or `node server.js`)

## Testing
- Visit `http://localhost:5173` to view the animation.
- REST API: `POST http://localhost:3000/api/test-email` to trigger an email immediately.
