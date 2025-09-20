import axios from "axios";
import { useEffect, useState } from "react";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);

  const id = window.location.pathname.split("/").slice(-1)[0];
  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:8000/api/user/showuser/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setName(data.name);
        setEmail(data.email);
      });
  }, []);

  async function Submit(e) {
    e.preventDefault(); //Dont Can Sumbent The Form
    let flag = true;
    setAccept(true);
    if (name === "" || password.length < 8 || passwordR !== password) {
      flag = false; // setFlag(false);
    } else flag = true; //setFlag(true) // use useState he change the vlaue after end function
    try {
      if (flag) {
        let res = await axios.put(
          `http://localhost:8000/api/user/update/${id}`,
          {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordR,
          }
        );
        if (res.status === 200) {
          window.localStorage.setItem("email", email);
          window.location.pathname = "/dashboard/users";
          console.log(window.localStorage.setItem("email"));
        }
      }
    } catch (error) {
      console.log(error);
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
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
