import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/allusers")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  function deleteUser(id) {
    axios.delete(`http://localhost:8000/api/deleteUser/${id}`);
  }

  const showUsers = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <i
          className="fa-solid fa-pen-to-square"
          style={{ color: "#74afb9", fontSize: "20px", paddingRight: "40px" }}
        ></i>
        <i
          onClick={() => deleteUser(user._id)}
          className="fa-solid fa-trash"
          style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
        ></i>
      </td>
    </tr>
  ));

  return (
    <div style={{ padding: "20px" }}>
      <table>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Eamil</th>
          <th>Action</th>
        </thead>
        {showUsers}
      </table>
    </div>
  );
}
