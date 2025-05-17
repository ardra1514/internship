// // scripts/createAdmin.js
// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
// import dotenv from 'dotenv';
// import User from '../models/User.js';

// dotenv.config();

// mongoose.connect(process.env.MONGO_URL).then(async () => {
//   const hashed = await bcrypt.hash("admin123", 10);
//   await User.create({
//     name: "Admin",
//     email: "admin@example.com",
//     password: hashed,
//     role: "admin"
//   });
//   console.log("Admin created");
//   process.exit();
// });
