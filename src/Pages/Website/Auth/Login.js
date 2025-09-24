import { useContext, useState } from "react";
import Header from "../../../Components/Header";
import "./auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../Context/UserContext";
import Cookies from "universal-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");
  const nav = useNavigate();
  const cookie = new Cookies();
  const userNow = useContext(User);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post("http://localhost:8000/api/auth/login", {
        email: email,
        password: password,
      });

      const token = res.data.token;
      const userDetails = res.data.user;
      cookie.set("Bearer", token);
      console.log(token);
      console.log(userDetails);

      console.log(res);

      userNow.setAuth({ token, userDetails });
      nav("/dashboard");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setEmailError(true);
      }
      setAccept(true);
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
            {accept && emailError && (
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
