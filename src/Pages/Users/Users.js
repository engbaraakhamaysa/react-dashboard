import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../Pages/Website/Context/UserContext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [runUseEffect, setRenUseEffect] = useState(0);

  const context = useContext(User);
  const token = context.auth.token;
  console.log(token);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/allusers", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, [runUseEffect]);

  async function deleteUser(id) {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/user/deleteUser/${id}`
      );
      if (res.status === 200) {
        setRenUseEffect((prv) => prv + 1);
      }
    } catch {
      console.log("Error");
    }
  }

  const showUsers = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Link to={`${user._id}`}>
          <i
            className="fa-solid fa-pen-to-square"
            style={{ color: "#74afb9", fontSize: "20px", paddingRight: "40px" }}
          ></i>
        </Link>
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
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Eamil</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
    </div>
  );
}
