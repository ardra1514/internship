
# 📋 CSV Task Distributor MERN App



This project is a full-stack MERN application that allows an admin to:

Register and manage agents

Upload a CSV file with task data

Automatically and equally distribute tasks to agents

View distributed tasks in a frontend dashboard
## Features

✅ Agent Registration and Login (with hashed passwords)

📤 CSV Upload (with Multer)

📊 Task Distribution:

Tasks are equally distributed to N agents

Any remainder is assigned sequentially to the first few agents

📄 View Distributed Tasks with Agent Info

🛡️ JWT-based Authentication

🔒 Passwords encrypted with bcrypt


##  Technologies Used

**Frontend:**
React

Axios

React Router

Tailwind CSS

**Backend:**
Express.js

MongoDB with Mongoose

Multer (for file uploads)

CSV-Parser (to read CSV files)

Bcrypt (for password hashing)

JSON Web Tokens (JWT)




## Project Structure



📁 client/            # React frontend

📁 server/            # Express backend
│
├── 📁 Models/        
│   ├── Agent.js           # Agent schema
│   ├── DistributedList.js # Stores tasks assigned to agents
│   └── User.js            # (Optional) Admin or user schema
│
├── 📁 routes/
│   ├── agents.js          # Agent-related routes (CRUD)
│   ├── auth.js            # Agent login & authentication
│   ├── distributRoute.js  # Distributes tasks among agents
│   └── uploadRoute.js     # Handles CSV upload and parsing
│
├── 📁 uploads/            # Temporary CSV storage (auto-deleted after parsing)
│
├── .env                  # Environment variables (port, MongoDB URI, JWT secret)
└── server.js             # Entry point of the Express backend

## Installation

Backend Setup

```bash
  cd server
npm init -y           # Initialize a new Node.js project (only once)
npm install           # Install all dependencies listed in package.json

```


 Frontend Setup
```bash
cd client
npm install
npm start

````
##  Task Distribution Logic

baseTasks = Math.floor(totalTasks / totalAgents)
extraTasks = totalTasks % totalAgents

Loop over each agent:
  if (i < extraTasks):
    assign baseTasks + 1
  else:
    assign baseTasks

## TO DO/Improvement


 Fix item distribution logic: Currently, there is an issue where tasks are not equally distributed among agents in some cases. This may happen due to improper handling of CSV headers or remainder logic.


 Improve agent login flow: Add proper validation, error handling, and feedback messages on the frontend for a better user experience.