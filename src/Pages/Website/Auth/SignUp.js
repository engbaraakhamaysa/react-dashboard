import axios from "axios";
import { useContext, useState } from "react";
import { User } from "../Context/UserContext";
import "./auth.css";
import Header from "../../../Components/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [accept, setAccept] = useState(false);

  const nav = useNavigate();

  const cookie = new Cookies();
  const userNow = useContext(User);
  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      let res = await axios.post(`http://localhost:8000/api/auth/signup`, {
        name: name,
        email: email,
        password: password,
      });
      console.log(res);
      const token = res.data.token;
      cookie.set("Bearer", token);
      const userDetails = res.data.user;

      console.log(token);

      console.log(userDetails);

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
      {" "}
      <Header />
      <div className="register parent">
        <form onSubmit={Submit}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name.length < 2 && accept && (
            <p className="error">Name must be more than 2 char</p>
          )}

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

          <label htmlFor="repeat">Repeat Password:</label>
          <input
            id="repeat"
            type="password"
            placeholder="Repeat Password..."
            value={passwordR}
            onChange={(e) => setPasswordR(e.target.value)}
          />
          {passwordR !== password && accept && (
            <p className="error">Password Dose Not Match</p>
          )}

          <div style={{ textAlign: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
