import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { User } from "../../Pages/Website/Context/UserContext";

export default function Form(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  // const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");

  const userNow = useContext(User);
  console.log(userNow);

  const styleReagister = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40px",
  };
  const form = {
    boxShadow: "0px 2px 15px rgb(0 0 0 / 10%)",
    width: "450px",
  };

  const buttonstyle = {
    width: "100%",
  };
  // const [flag, setFlag] = useState(false);
  console.log(name);
  // console.log(flag);

  useEffect(() => {
    setName(props.name);
    setEmail(props.email);
  }, [props.name, props.email]);

  async function Submit(e) {
    e.preventDefault(); //Dont Can Sumbent The Form
    // let flag = true;
    // setAccept(true);
    // if (name === "" || password.length < 8 || passwordR !== password) {
    //   flag = false; // setFlag(false);
    // } else flag = true; //setFlag(true) // use useState he change the vlaue after end function
    try {
      // if (flag) {
      let res = await axios[props.action](
        `http://localhost:8000/api/${props.endPoint}`,
        {
          name: name,
          email: email,
          password: password,
          // password_confirmation: passwordR,
        }
      );
      const token = res.data.token.accessToken;
      const userDetails = res.data.user;

      console.log(token);
      console.log(userDetails);

      userNow.setAuth({ token, userDetails });

      //.then((serthen) => console.log(serthen)); //what habend about send data
      // if (res.status === 200) {
      //   props.hasLocalStorage && window.localStorage.setItem("email", email);
      //   window.location.pathname = `${props.navigate}`;
      //   console.log(window.localStorage.setItem("email"));
      // }

      // }
    } catch (error) {
      console.log(error);
      setEmailError(error.response.status);
    }
  }
  return (
    <div
      className="register"
      style={props.styleReagister ? styleReagister : {}}
    >
      <form style={props.form ? form : {}} onSubmit={Submit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* {name === "" && accept && (
          <p className="error">User Name is Required</p>
        )} */}

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Email..."
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* {accept && emailError === 400 && (
          <p className="error">Email Is already benn token</p>
        )} */}

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* {password.length < 8 && accept && (
          <p className="error">Password must be than 8 Char</p>
        )} */}

        <label htmlFor="repeat">Repeat Password:</label>
        <input
          id="repeat"
          type="password"
          placeholder="Repeat Password..."
          value={passwordR}
          onChange={(e) => setPasswordR(e.target.value)}
        />
        {/* {passwordR !== password && accept && (
          <p className="error">Password Dose Not Match</p>
        )} */}

        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={props.button === "Update" ? buttonstyle : {}}
          >
            {props.button}
          </button>
        </div>
      </form>
    </div>
  );
}
