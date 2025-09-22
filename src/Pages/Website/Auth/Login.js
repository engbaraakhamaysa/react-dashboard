import { useState } from "react";
import Header from "../../../Components/Header";
import "./auth.css";
import axios from "axios";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");

  async function Submit(e) {
    e.preventDefault(); //Dont Can Sumbent The Form
    let flag = true;
    setAccept(true);
    if (password.length < 8) {
      flag = false; // setFlag(false);
    } else flag = true; //setFlag(true) // use useState he change the vlaue after end function
    try {
      if (flag) {
        let res = await axios.post("http://localhost:8000/api/auth/login", {
          email: email,
          password: password,
        });
        // if (res.status === 200) {
        //   window.localStorage.setItem("email", email);
        //   // window.location.pathname = "/";
        //   window.location.href = "/";

        //   console.log(window.localStorage.setItem("email"));
        // }
      }
    } catch (error) {
      console.log(error);
      setEmailError(error.response.status);
    }
  }
  return (
    <div>
      <Header />
      <div className="parent">
        <div className="register">
          <form onSubmit={Submit}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Email..."
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {accept && emailError === 400 && (
              <p className="error">Email Is already benn token</p>
            )}

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length < 8 && accept && (
              <p className="error">Password must be than 8 Char</p>
            )}

            <div style={{ textAlign: "center" }}>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
