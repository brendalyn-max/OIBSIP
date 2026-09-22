# Daily Planner — To-Do Web App

## Overview

Daily Planner is a responsive to-do web application that helps users organize and manage their daily tasks.

Users can add tasks, mark them as completed, edit existing tasks, and delete tasks. Tasks are separated into pending and completed lists for easier organization.

## Project Objective

The objective of this project was to build an interactive web application using HTML, CSS, and vanilla JavaScript.

The project demonstrates DOM manipulation, event handling, form validation, task management, and browser storage.

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Browser `localStorage`

## Features

* Add new tasks
* Display newly added tasks in the Pending Tasks list
* Mark tasks as complete
* Move completed tasks to the Completed Tasks list
* Mark completed tasks as pending again
* Edit task text inline
* Delete tasks
* Display pending and completed task counts
* Display task timestamps
* Save tasks using `localStorage`
* Restore tasks after refreshing the page
* Friendly empty-state messages
* Empty-input validation
* Responsive layout for desktop and mobile devices

## Project Structure

```text
webdev-L2-to-do-web-app/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## How It Works

### Add a Task

Enter a task in the input field and click **Add Task**.

The task is immediately added to the Pending Tasks list.

### Complete a Task

Click **Mark Complete** to move a task from Pending Tasks to Completed Tasks.

The completion time is also recorded.

### Edit a Task

Click **Edit** to modify the task text directly within the task item.

Press **Enter** to save the changes.

### Delete a Task

Click **Delete** to permanently remove a task.

### Task Persistence

Tasks are stored in the browser using `localStorage`, allowing them to remain available after refreshing the page.

## What I Learned

Through this project, I practiced:

* Selecting and manipulating DOM elements
* Creating dynamic HTML elements with JavaScript
* Handling form submissions and button events
* Using JavaScript arrays and objects to manage application data
* Implementing inline editing
* Working with browser `localStorage`
* Adding input validation
* Creating responsive layouts with CSS
* Organizing JavaScript into reusable functions

## Internship

This project was completed as part of the **Oasis Infobyte Web Development Internship**.

## Author

**Brendalyn Musoki**

Software & AI Engineer

### Connect With Me

* GitHub: brendaly-max
* LinkedIn: brendalyne-musoki
