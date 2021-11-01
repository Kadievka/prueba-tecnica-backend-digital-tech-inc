# Prueba Técnica Digital Tech 👩‍💻

☕️ Developed by **Kadievka** 💻

In this project you will found:
- Car Rentals Services:
  - **Route:** POST http://localhost:4000/car-rentals/create **Description:** Every Active User can create one car rental register.
  - **Route:** PUT http://localhost:4000/car-rentals/update **Description:** The user can update one of its car rental register.
  - **Route:** GET http://localhost:4000/car-rentals/get-all **Description:** It shows all car rentals by the user.
- Users Services:
  - **Route:** GET http://localhost:4000/users/get-all **Description:** Only admin users can get all users.
  - **Route:** POST http://localhost:4000/users/create **Description:** Only admin users can create users, afeter create one new user, the email service send a email to the new user with se jwt token to activate its profile (in console you can see the token anyways).
  - **Route:** POST http://localhost:4000/users/activate **Description:** Service to activate the user's profile.
  - **Route:** POST http://localhost:4000/users/login **Description:** After activating profile, the user can login and get another JWT to use the car rental service.
  - **Route:** PUT http://localhost:4000/users/edit **Description:** User can edit its own profile.
  - **Route:** DELETE http://localhost:4000/users/delete-many **Description:** Only admin users can delete other users.

**Every route, except login, uses JWT Bearer authentication.**

------------

## Install dependencies

Download the project, and run `npm install`.

## Configure .env variables

In the **.env.example** file you can see which variables are needed to run the project. The

## Run the serve

Run `npm start`, it will compile a star the server has development mode.

