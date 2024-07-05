![img can't be displayed](src/assets/logo.jpg)


<h1>Beyond the Horizon</h1>

**Overview**

<p>Beyond the Horizon is a holiday planning web application designed to help users plan and manage their holidays. Users can create, view, edit, and delete holiday plans, as well as add details for hotels, flights, and events associated with each holiday.</p>

**Features**

User Authentication: Users can sign up, log in, and log out.

Holiday Management: Users can create, view, edit, and delete holiday plans.

Hotel Management: Users can add, view, edit, and delete hotel details for each holiday.

Flight Management: Users can add, view, edit, and delete flight details for each holiday.

Event Management: Users can add, view, edit, and delete event details for each holiday.

Currency Converter: Users can convert currency values directly within the application.

Image Upload: Users can upload pictures that they have taken on their holidays directly into the application.

Have a look at the front end <a href="https://beyond-the-horizon-fe.vercel.app/">HERE!</a>

**Technologies Used**

Frontend: React, React Router
Backend: Node.js, Express
Database: MongoDB, Cloudinary
Authentication: JWT (JSON Web Token)
Styling: CSS
Utilities: date-fns (for date formatting), Fetch API (for API requests)
Installation
Prerequisites
Node.js
npm (Node Package Manager)
MongoDB


**Steps to run the repo**

Install Dependencies:

npm install
cd client
npm install
cd ..
Set Up Environment Variables:

Create a .env file in the root directory of your backend and add the following environment variables:

env:
DATABASE_URL=(MongoDB URL here)
PORT=(PORT number)
SECRET=(JWT secret)
CLOUDINARY_CLOUD_NAME=d(Cloudinary database name)
CLOUDINARY_API_KEY=(Cloudinary API key)
CLOUDINARY_SECRET_KEY=(Cloudinary secret key)

Create a env file in the client directory of your frontend and add the following environment variable:

Please first obtain an API key from Currency Converter API @ https://apyhub.com/utility/currency-conversion

Copy and paste your API key into the .env file of this frontend application using the VITE_API_TOKEN=(your api key here) prefix.

VITE_API_TOKEN=(API token from apyhub or external currency api)
VITE_API_URL=(API url here)
VITE_BASE_URL=(base backend url here)


**Usage**

Sign Up and Log In:

Navigate to the sign-up page to create a new account.
After signing up, click on the sign in button to log in with your credentials.

Manage Holidays:

Create a new holiday plan by providing details such as name and country.
View the list of your holiday plans on the profile page.
Edit or delete existing holiday plans.

Add Hotel, Flight, and Event Details:

For each holiday, add details for hotels, flights, and events.
Ensure that the check-out date and time are not earlier than the check-in date and time for hotels.
Ensure that the end time is not earlier than the start time for events.

Convert Currency:

Use the currency converter to convert values between different currencies.
Maximum of 5 conversions a day.

**Acknowledgements:**

Front end is hosted by Vercel

Back end is hosted By Render

date-fns for date formatting and manipulation.

React for building the user interface.

Node.js and Express for the backend server.

MongoDB for the database.
