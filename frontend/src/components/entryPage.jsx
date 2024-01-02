// EntryPage.jsx
import React, { Component } from 'react';
import '../scripts/loginregister.css';


let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [gmail, setGmail] = useState("");



  let handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  let handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  let handleGmailChange = (e) => {
    setGmail(e.target.value);
  }


let handleLogin = async() =>{
    let response =await fetch('http://localhost:5000/register',{
        method: 'POST',
        body: JSON.stringify({username:username, password:password, gmail:gmail}),
        headers: { 'Content-Type': 'application/json'}
    })
    console.log("handlelogin ran");
}




















class EntryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "signUp"
    };
  }

  changeView = (view) => {
    this.setState({
      currentView: view
    });
  }




  currentView = () => {
    switch(this.state.currentView) {
      case "signUp":
        return (
          <form>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label for="username">Username:</label>
                  <input value={username} type="text" id="username" required/>
                </li>
                <li>
                  <label for="gmail">Email:</label>
                  <input value={gmail} type="email" id="email" required/>
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input value={password} type="password" id="password" required/>
                </li>
              </ul>
            </fieldset>
            <button className="sign" onClick={handleLogin}>Sign Up</button>
            <button type="button" onClick={() => this.changeView("logIn")}>Have an Account?</button>
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
                  <a onClick={() => this.changeView("PWReset")} href="#">Forgot Password?</a>
                </li>
              </ul>
            </fieldset>
            <button>Login</button>
            <button type="button" onClick={() => this.changeView("signUp")}>Create an Account</button>
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
            <button type="button" onClick={() => this.changeView("logIn")}>Go Back</button>
          </form>
        );
      default:
        break;
    }
  }

  render() {
    return (
      <section id="entry-page">
        {this.currentView()}
      </section>
    );
  }
}

export default EntryPage;
