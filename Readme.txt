Assignment Tracker

This is my Assignment Tracker web app for INFR 3120.
I built it to keep all my school assignments in one place and to practice full CRUD using NodeJS, Express, and MongoDB.



What my app does

I can add new assignments

I can see all my assignments in a table

I can edit any assignment

I can delete assignments (with a confirmation page)

All data is stored in MongoDB

I used EJS for my pages and Bootstrap for the design




Tech I used

Node.js

Express.js

MongoDB Atlas

Mongoose

EJS

Bootstrap

CSS

Git + GitHub

Render (for hosting)




Main Files in My Project
app.js                → main server file
routes/assignments.js → all assignment routes
models/Assignment.js  → my MongoDB model

views/                 → all my EJS pages
public/css/styles.css  → my custom styles
public/images/logo.png → my logo




How I run my app

Install packages:

npm install


I added my MongoDB connection string into .env like this:

MONGO_URI=my-connection-string
PORT=3000


Start the server:

npm run dev


Open the app in the browser:

http://localhost:3000