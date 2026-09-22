// ================================
// PASSWORD HASHING
// ================================

async function hashPassword(password) {
    const passwordData = new TextEncoder().encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        passwordData
    );

    const hashArray = Array.from(
        new Uint8Array(hashBuffer)
    );

    return hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}


// ================================
// REGISTRATION
// ================================

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const username =
                document
                    .getElementById("registerUsername")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document.getElementById(
                    "registerPassword"
                ).value;

            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;

            const registerError =
                document.getElementById(
                    "registerError"
                );

            registerError.textContent = "";


            if (
                !username ||
                !email ||
                !password ||
                !confirmPassword
            ) {
                registerError.textContent =
                    "Please fill in all fields.";
                return;
            }


            if (
                password.length < 8 ||
                !/\d/.test(password)
            ) {
                registerError.textContent =
                    "Password must be at least 8 characters long and include at least one number.";
                return;
            }


            if (password !== confirmPassword) {
                registerError.textContent =
                    "Passwords do not match.";
                return;
            }


            const users =
                JSON.parse(
                    localStorage.getItem(
                        "secureAccessUsers"
                    )
                ) || [];


            const usernameExists =
                users.some(
                    user =>
                        user.username.toLowerCase() ===
                        username.toLowerCase()
                );


            const emailExists =
                users.some(
                    user =>
                        user.email.toLowerCase() ===
                        email
                );


            if (
                usernameExists ||
                emailExists
            ) {
                registerError.textContent =
                    "An account with that username or email already exists.";
                return;
            }


            const passwordHash =
                await hashPassword(password);


            const newUser = {
                username: username,
                email: email,
                passwordHash: passwordHash
            };


            users.push(newUser);


            localStorage.setItem(
                "secureAccessUsers",
                JSON.stringify(users)
            );


            window.location.href = "index.html";
        }
    );
}


// ================================
// LOGIN
// ================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const identifier =
                document
                    .getElementById(
                        "loginIdentifier"
                    )
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document.getElementById(
                    "loginPassword"
                ).value;

            const loginError =
                document.getElementById(
                    "loginError"
                );

            loginError.textContent = "";


            if (
                identifier === "" &&
                password === ""
            ) {
                loginError.textContent =
                    "Please enter your username/email and password.";
                return;
            }


            if (identifier === "") {
                loginError.textContent =
                    "Please enter your username or email.";
                return;
            }


            if (password === "") {
                loginError.textContent =
                    "Please enter your password.";
                return;
            }


            const users =
                JSON.parse(
                    localStorage.getItem(
                        "secureAccessUsers"
                    )
                ) || [];


            const user =
                users.find(
                    account =>
                        account.username.toLowerCase() ===
                            identifier ||
                        account.email.toLowerCase() ===
                            identifier
                );


            if (!user) {
                loginError.textContent =
                    "Invalid username/email or password.";
                return;
            }


            const passwordHash =
                await hashPassword(password);


            if (
                passwordHash !==
                user.passwordHash
            ) {
                loginError.textContent =
                    "Invalid username/email or password.";
                return;
            }


            const session = {
                username: user.username
            };


            sessionStorage.setItem(
                "secureAccessSession",
                JSON.stringify(session)
            );


            window.location.href =
                "dashboard.html";
        }
    );
}


// ================================
// DASHBOARD PROTECTION
// ================================

const dashboardUsername =
    document.getElementById(
        "dashboardUsername"
    );

if (dashboardUsername) {

    const session =
        JSON.parse(
            sessionStorage.getItem(
                "secureAccessSession"
            )
        );


    if (!session) {

        window.location.href =
            "index.html";

    } else {

        dashboardUsername.textContent =
            session.username;
    }
}


// ================================
// LOGOUT
// ================================

const logoutButton =
    document.getElementById(
        "logoutButton"
    );

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            sessionStorage.removeItem(
                "secureAccessSession"
            );

            window.location.href =
                "index.html";
        }
    );
}