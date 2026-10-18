import "../style.css";

const app = document.getElementById("login-app");

if (app) {
  app.innerHTML = `
    <section class="auth-container">
      <div class="auth-card">
        <div class="auth-logo">AURA</div>
        <h1>Welcome Back</h1>
        <p class="auth-subtitle">
          Sign in to continue to your accessibility assistant.
        </p>

        <form id="loginForm">
          <div class="form-group">
            <label for="loginEmail">Email address</label>
            <input type="email" id="loginEmail" name="email"
              placeholder="Enter your email" autocomplete="email" required />
          </div>

          <div class="form-group">
            <label for="loginPassword">Password</label>
            <input type="password" id="loginPassword" name="password"
              placeholder="Enter your password"
              autocomplete="current-password" required />
          </div>

          <p id="loginMessage" role="status" aria-live="polite"></p>
          <button type="submit" id="loginButton">Sign In</button>
        </form>

        <p class="auth-footer">
          Don't have an account?
          <a href="/pages/register.html">Create an account</a>
        </p>
        <p class="auth-footer"><a href="/">Back to Home</a></p>
      </div>
    </section>
  `;
}

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const loginButton = document.getElementById("loginButton");

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;

  loginMessage.textContent = "";
  loginMessage.style.color = "";

  if (!email || !password) {
    loginMessage.textContent = "Please enter your email and password.";
    return;
  }

  loginButton.disabled = true;
  loginButton.textContent = "Signing in...";

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Login failed. Please try again.");
    }

    if (!data.user) {
      throw new Error("The server did not return user details.");
    }

    localStorage.setItem("auraUser", JSON.stringify(data.user));

    loginMessage.style.color = "green";
    loginMessage.textContent = "Login successful! Opening your dashboard...";

    window.location.href = "/pages/dashboard.html";
  } catch (error) {
    console.error("AURA login error:", error);
    loginMessage.style.color = "#dc2626";

    loginMessage.textContent =
      error instanceof TypeError
        ? "Cannot connect to AURA. Make sure the backend is running on port 5000."
        : error.message;
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "Sign In";
  }
});