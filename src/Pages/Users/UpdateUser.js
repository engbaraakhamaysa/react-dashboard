import { useEffect, useState } from "react";
import Form from "../../Components/Form/Form";

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
  }, [id]);

  return (
    <>
      <h1>Update User</h1>
      <div>
        <Form
          button="Update"
          name={name}
          email={email}
          action={`put`}
          endPoint={`user/update/${id}`}
          navigate="/dashboard/users"
          hasLocalStorage={false}
          styleReagister={false}
          form={false}
          buttonstyle={true}
        />
      </div>
    </>
  );
}
