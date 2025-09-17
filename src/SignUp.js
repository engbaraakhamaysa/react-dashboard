import axios from "axios";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");
  // const [flag, setFlag] = useState(false);
  console.log(name);
  // console.log(flag);

  async function Submit(e) {
    e.preventDefault(); //Dont Can Sumbent The Form
    let flag = true;
    setAccept(true);
    if (name === "" || password.length < 8 || passwordR !== password) {
      flag = false; // setFlag(false);
    } else flag = true; //setFlag(true) // use useState he change the vlaue after end function
    try {
      if (flag) {
        let res = await axios.post("http://localhost:8000/api/signup", {
          name: name,
          email: email,
          password: password,
          // password_confirmation: passwordR,
        });
        //.then((serthen) => console.log(serthen)); //what habend about send data
        if (res.status === 201) {
          window.localStorage.setItem("email", email);
          window.location.pathname = "/";
          console.log(window.localStorage.setItem("email"));
        }
      }
    } catch (error) {
      console.log(error);
      setEmailError(error.response.status);
    }
  }
  return (
    <div className="parent">
      <div className="register">
        <form onSubmit={Submit}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name === "" && accept && (
            <p className="error">User Name is Required</p>
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
