import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [accept, setAccept] = useState(false);

  const context = useContext(User);
  const token = context.auth.token;

  const nav = useNavigate();

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      let res = await axios.post(
        `http://localhost:8000/api/user/create`,
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(res);

      nav("/dashboard/users");
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
      <div>
        <div>
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

            <div className="register button" style={{ textAlign: "center" }}>
              <button type="submit">Create User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
