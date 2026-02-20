import Header from "../components/Header";
import FloatingLines from "../components/FloatingLines";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState({ error: false, message: "" });
  async function handleRegister() {
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      if (response.status === 409) {
        setError({
          error: true,
          message: "Username or Email is already registered",
        });
      } else if (response.status === 201) {
        const result = await response.json();
        navigate("/login");
      } else {
        console.log("Something went wrong please try again");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <FloatingLines lineCount={10} />
      <Header />
      <div className="register-form">
        <div className="register-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="register-part"
            name="username"
            id="username"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="register-part"
            name="password"
            id="email"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="register-part"
            name="password"
            id="password"
          />
          <button className="register-button" onClick={handleRegister}>
            Register
          </button>
          {
            error.error ? <div className="error-message-register">
              {error.message}
            </div>: ""
          }
        </div>
      </div>
    </>
  );
}
