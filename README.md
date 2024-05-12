# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

- /login page to sign in user

- /register page to sign up user

- /dashboard protected page that can be viewed only by logged in user

- /not-found page where user will be redirected if user hit any route that not exist

## Major dependencies
- react-router-dom ( For routing)
- material-ui (For creating design components)
- react-google-recaptcha (for captcha verification)
- axios (For communicating with server)
- formik (For forms management)
- Yup (For input validations)
- typescript (For adding types)
-

## Installation
- create .env.development.local and copy .env content in it
- -> NOTE <- if you want to enable captcha for sign in and sign up, uncomment REACT_APP_API_RECAPTCHA_SITE_KEY in your env file and place your google site key, by default it commented in env file so captcha will not be visible and is disabled

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
