# EventProtal

A full-stack event management system built using **Node.js**, **React**, **MySQL**, and **Sequelize** ORM with support for **time zone-based publishing**, **nested categories**, **single session login**, and **event filtering**.

---

## Tech Stack

- **Backend**: Node.js, Express.js, Sequelize ORM
- **Database**: MySQL
- **Frontend**: React.js
- **Authentication**: JWT-based login
- **Storage**: File upload (local directory)
- **Others**: Luxon (for timezone), Rate Limiter, ESLint

## Folder Structure

EventPortal/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── models/
│ │ ├── middlewares/
│ │ └── config/
│ ├── migrations/
│ ├── uploads/
│ └── .env
├── frontend/
│ ├── src/
│ └── package.json


## Setup Instructions

### Backend

cd backend
npm install
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx nodemon server.mjs
Make sure .env is configured correctly.

### Frontend 
cd event-portal-frontend
npm install
npm start
API base URL is set in frontend/src/api/api.js


POST /api/auth/login
{
  "username": "admin",
  "password": "admin123"
}


NOTE : 
**Only one session allowed per user.

**Auto logout if user logs in on another browser/device.

Features Implemented
*JWT Login + Session Invalidation
*Timezone-aware publish logic
*Upload & display event photos
*Filter events: Published / Unpublished
*Nested categories with tree structure
*Soft + Hard Delete for events
*Rate Limiter on login route

Testing Instructions
Use Postman or browser frontend to:
Login → Get token
Create events → with future/past publishAt time
Access event list with ?timezone=Asia/Kolkata or ?timezone=America/New_York
Test category nesting via /categories
Test single login session logic on two browsers
Try soft and hard delete


Made with ❤️ by Krupa Bhatia