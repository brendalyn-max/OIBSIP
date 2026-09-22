const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskError = document.getElementById("taskError");

const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const pendingEmptyState = document.getElementById("pendingEmptyState");
const completedEmptyState = document.getElementById("completedEmptyState");

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

function saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function formatTime(timestamp) {
    const date = new Date(timestamp);

    return date.toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short"
    });
}

function updateCounts() {
    const pendingTasksCount = tasks.filter(task => !task.completed).length;
    const completedTasksCount = tasks.filter(task => task.completed).length;

    pendingCount.textContent = `${pendingTasksCount} pending`;
    completedCount.textContent = `${completedTasksCount} completed`;
}

function updateEmptyStates() {
    const hasPendingTasks = tasks.some(task => !task.completed);
    const hasCompletedTasks = tasks.some(task => task.completed);

    pendingEmptyState.style.display = hasPendingTasks ? "none" : "block";
    completedEmptyState.style.display = hasCompletedTasks ? "none" : "block";
}

function createTaskElement(task) {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.dataset.taskId = task.id;

    const taskDetails = document.createElement("div");
    taskDetails.className = "task-details";

    const taskText = document.createElement("p");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    const taskTime = document.createElement("p");
    taskTime.className = "task-time";
    taskTime.textContent = `Added ${formatTime(task.createdAt)}`;

    if (task.completedAt) {
        taskTime.textContent += ` • Completed ${formatTime(task.completedAt)}`;
    }

    taskDetails.appendChild(taskText);
    taskDetails.appendChild(taskTime);

    const taskActions = document.createElement("div");
    taskActions.className = "task-actions";

    const completeButton = document.createElement("button");
    completeButton.className = "complete-button";
    completeButton.textContent = task.completed
        ? "Mark Pending"
        : "Mark Complete";

    completeButton.addEventListener("click", () => {
        toggleTaskStatus(task.id);
    });

    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {
        editTask(task.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        deleteTask(task.id);
    });

    taskActions.appendChild(completeButton);
    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);

    taskItem.appendChild(taskDetails);
    taskItem.appendChild(taskActions);

    return taskItem;
}

function renderTasks() {
    const pendingTaskElements = pendingTasks.querySelectorAll(".task-item");
    const completedTaskElements = completedTasks.querySelectorAll(".task-item");

    pendingTaskElements.forEach(task => task.remove());
    completedTaskElements.forEach(task => task.remove());

    tasks.forEach(task => {
        const taskElement = createTaskElement(task);

        if (task.completed) {
            completedTasks.appendChild(taskElement);
        } else {
            pendingTasks.appendChild(taskElement);
        }
    });

    updateCounts();
    updateEmptyStates();
}

function addTask(taskText) {
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();
}

function toggleTaskStatus(taskId) {
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return;
    }

    task.completed = !task.completed;

    if (task.completed) {
        task.completedAt = new Date().toISOString();
    } else {
        task.completedAt = null;
    }

    saveTasks();
    renderTasks();
}

function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return;
    }

    const taskItem = document.querySelector(
        `[data-task-id="${taskId}"]`
    );

    const taskText = taskItem.querySelector(".task-text");

    const editInput = document.createElement("input");

    editInput.type = "text";
    editInput.value = task.text;
    editInput.className = "edit-input";

    taskText.replaceWith(editInput);

    editInput.focus();

    function saveEditedTask() {
        const updatedText = editInput.value.trim();

        if (!updatedText) {
            renderTasks();
            return;
        }

        task.text = updatedText;

        saveTasks();
        renderTasks();
    }

    editInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            saveEditedTask();
        }

        if (event.key === "Escape") {
            renderTasks();
        }
    });

    editInput.addEventListener("blur", saveEditedTask);
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);

    saveTasks();
    renderTasks();
}

taskForm.addEventListener("submit", event => {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    taskError.textContent = "";

    if (!taskText) {
        taskError.textContent = "Please enter a task before adding it.";
        return;
    }

    addTask(taskText);

    taskInput.value = "";
    taskInput.focus();
});

renderTasks();