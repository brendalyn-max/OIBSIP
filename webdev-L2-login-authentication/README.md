# SecureAccess — Login Authentication System

## Overview

SecureAccess is a front-end login authentication system developed as part of the Oasis Infobyte Web Development Internship.

The project allows users to create an account, securely store their password as a SHA-256 hash, log in using their username or email, access a protected dashboard, and log out of their session.

## Project Objective

The objective of this project was to build a functional authentication system using HTML, CSS, and JavaScript while implementing form validation, password hashing, user registration, login authentication, session management, and protected page access.

## Features

* User registration
* Username and email fields
* Password validation
* Minimum 8-character password requirement
* Password must contain at least one number
* Confirm password validation
* Duplicate username and email detection
* Login using username or email
* Generic incorrect-credentials error message
* SHA-256 password hashing
* Protected dashboard
* Session-based authentication
* Logout functionality
* Responsive design
* Modern glassmorphism interface
* Client-side data storage using `localStorage`
* Active login session using `sessionStorage`

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Web Crypto API
* LocalStorage
* SessionStorage

## Project Structure

```text
webdev-L2-login-authentication/
│
├── index.html
├── register.html
├── dashboard.html
├── style.css
├── script.js
└── README.md
```

## How It Works

### 1. Registration

A new user provides:

* Username
* Email
* Password
* Password confirmation

The system validates the information before creating the account.

The password is processed using SHA-256 before being stored in the browser. The original plain-text password is not stored.

### 2. Login

Users can log in using either their username or email address.

The entered password is hashed using the same SHA-256 process and compared with the stored password hash.

If the credentials are correct, an active session is created and the user is redirected to the dashboard.

### 3. Protected Dashboard

The dashboard checks for an active authentication session.

If no active session exists, the user is automatically redirected to the login page.

### 4. Logout

When the user clicks the Logout button, the active session is removed and the user is redirected to the login page.

## Validation

The system validates:

* Empty registration fields
* Empty login fields
* Password length
* Password number requirement
* Password confirmation
* Duplicate usernames
* Duplicate email addresses
* Incorrect login credentials
* Protected dashboard access

## Data Storage

Registered users are stored in the browser's `localStorage`.

The active login session is stored in `sessionStorage`.

Example stored user structure:

```text
{
    username: "example",
    email: "example@email.com",
    passwordHash: "hashed-password"
}
```

## Security Note

This project uses SHA-256 password hashing because the Oasis Infobyte task allows a front-end authentication approach using SHA-256.

This is an educational project and should not be treated as a production authentication system. Real-world authentication should use a secure backend, HTTPS, and a password-specific hashing algorithm such as bcrypt or Argon2.

## Testing

The following functionality was tested:

* Successful registration
* Empty-field validation
* Invalid password validation
* Password confirmation
* Duplicate account detection
* Login with username
* Login with email
* Incorrect credentials
* Successful dashboard access
* Dashboard protection
* Logout
* Session clearing
* Responsive layout

## What I Learned

Through this project, I practiced:

* Building authentication interfaces with HTML and CSS
* Handling forms with JavaScript
* Validating user input
* Working with browser storage
* Using the Web Crypto API
* Hashing passwords
* Managing authentication sessions
* Protecting pages based on authentication state
* Creating responsive user interfaces
* Structuring a multi-page front-end project

## Internship

This project was completed as part of the **Oasis Infobyte Web Development Internship — Level 2, Task 4**.

## Author

**Brendalyn Musoki**

Software & AI Engineer

GitHub: https://github.com/brendalyn-max

LinkedIn: https://www.linkedin.com/in/brendalyne-musoki/
