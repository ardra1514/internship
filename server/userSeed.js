import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './Models/User.js';
import connectDB from './db/connection.js';

const userRegister = async () => {
  await connectDB();

  try {
    const hashPassword = await bcrypt.hash("admin", 10);

    const newUser = new User({
      name: "admin",
      email: "admin@gmail.com",
      phoneno: "9999999999",   
      password: hashPassword,
      role: "admin"
    });

    await newUser.save();
    console.log(" Admin user created successfully!");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

userRegister();
