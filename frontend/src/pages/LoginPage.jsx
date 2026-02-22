import Header from "../components/Header";
import FloatingLines from "../components/FloatingLines";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState({ error: false, message: "" });
  async function checkLogin() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    try {
      const response = await fetch("https://note-app-two-delta.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: "include",
      });

      if (response.status === 401) {
        setError({ error: true, message: "Incorrect Password" });
      } else if (response.status === 200) {
        navigate("/dashboard");
      } else if (response.status === 404) {
        setError({
          error: true,
          message: "User does not exist please first register",
        });
      } else {
        setError({
          error: true,
          message: "Something went wrong please try again",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <FloatingLines
        lineCount={4}
        animationSpeed={5}
        enabledWaves={["middle", "top"]}
        linesGradient={["574964", "9F8383", "D7BBF5", "FFDAB3"]}
      />
      <Header />
      <div className="login-form">
        <div className="login-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="login-part"
            id="username"
            name="username"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="login-part"
            id="password"
            name="password"
          />
          <button
            className="login-button"
            onClick={() => {
              checkLogin();
            }}
          >
            Login
          </button>
          {error.error ? (
            <div className="login-error-message">{error.message}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
