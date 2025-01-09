import express from "express"; 
import dotenv from "dotenv"; 
import {database as db} from "../config/db.js"
import bcrypt from "bcrypt"
import { checkAccAvailibilty, hashPassword } from "../models/authmodels.js";
import session from "express-session";
dotenv.config(); 

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const availability = await checkAccAvailibilty(email);
    if (!availability) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const user = await db.query("SELECT password FROM users WHERE email = $1", [email]);
    const checkPassword = await bcrypt.compare(password, user.rows[0].password);
    if (checkPassword) {
      req.session.user = { email };
      return res.status(200).json({ message: "User is successfully logged in" });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Could not log out.');
    } else {
      res.send('Logged out');
    }
  });
};

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const availability = await checkAccAvailibilty(email);
    if (!availability) {
      return res.status(409).json({ message: "Account is already registered" });
    }
    const hashedPassword = await hashPassword(password);
    const response = await db.query("INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *", [email, hashedPassword]);
    if (response.rows.length > 0) {
      const user = response.rows[0];
      req.session.user = { email: user.email };
      return res.status(201).json({ message: "User is successfully registered" });
    } else {
      return res.status(500).json({ message: "An error occurred while registering the user" });
    }
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const isAuthenticated = (req, res) => {
  if (req.session.user) {
    res.status(200).send(true);
  } else {
    res.status(200).send(false);
  }
};