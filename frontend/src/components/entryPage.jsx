// EntryPage.jsx
import React, { useState } from 'react';
import '../scripts/loginregister.css';

const EntryPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gmail, setGmail] = useState("");
  const [currentView, setCurrentView] = useState("signUp");

  const changeView = (view) => {
    setCurrentView(view);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleGmailChange = (e) => {
    setGmail(e.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    let response = await fetch('http://localhost:5050/register', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password, gmail: gmail }),
      headers: { 'Content-Type': 'application/json' }
    })
    let data = await response.json();
    console.log(data);
  };

  const renderView = () => {
    switch (currentView) {
      case "signUp":
        return (
          <form>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input onChange={handleUsernameChange} value={username} type="text" id="username" required/>
                </li>
                <li>
                  <label htmlFor="gmail">Email:</label>
                  <input onChange={handleGmailChange} value={gmail} type="email" id="email" required/>
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input onChange={handlePasswordChange} value={password} type="password" id="password" required/>
                </li>
              </ul>
            </fieldset>
            <button className="sign" onClick={handleLogin}>Sign Up</button>
            <button type="button" onClick={() => changeView("logIn")}>Have an Account?</button>
          </form>
        );
      case "logIn":
        return (
          <form>
            <h2>Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input type="text" id="username" required/>
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" required/>
                </li>
                <li>
                  <i></i>
                  <a onClick={() => changeView("PWReset")} href="#">Forgot Password?</a>
                </li>
              </ul>
            </fieldset>
            <button>Login</button>
            <button type="button" onClick={() => changeView("signUp")}>Create an Account</button>
          </form>
        );
      case "PWReset":
        return (
          <form>
            <h2>Reset Password</h2>
            <fieldset>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" required/>
                </li>
              </ul>
            </fieldset>
            <button>Send Reset Link</button>
            <button type="button" onClick={() => changeView("logIn")}>Go Back</button>
          </form>
        );
      default:
        break;
    }
  };

  return (
    <section id="entry-page">
      {renderView()}
    </section>
  );
};

export default EntryPage;