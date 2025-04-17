# SCHEDULER #

# Overview #

This is a scheduling app under development for a tennis club. It allows users to:

View and choose a tennis court location from the homepage.

Book a training session: After choosing a location, users can see a calendar with available dates and book a session.

View other users' bookings to avoid conflicts.

In the future, the app will include Telegram authentication for users.

# Authentication #

To book a training session, users must be authenticated with their phone number.

If a user clicks on the "Book the court" button without being logged in, a modal window will appear, prompting them to authenticate by entering their name and phone number.

API for user authentication is still in the testing phase.

# Booking Details #

Maximum booking window: Users can book training sessions up to 14 days in advance.

Booking time: From 5:00 AM to 11:00 PM.

Minimum session duration: 30 minutes.

# Dependencies #

Node v22.14.0

NPM 10.9.2

react-router-dom

# Technologies #

# Frontend #

React Vite

TypeScript

fetch API

SCSS

HTML5

# Backend #

Express.js

Mongoose

MongoDB