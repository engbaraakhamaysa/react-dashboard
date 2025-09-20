import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./Components/Form";

export default function UpdateUser() {
  const [name, setName] = useState("baraa");
  const [email, setEmail] = useState("baraa@gmail");

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

  return <Form button="Updata" name={name} email={email} />;
}
