import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function Products() {
  const [products, setproducts] = useState([]);
  const [runUseEffect, setRenUseEffect] = useState(0);

  const context = useContext(User);
  const token = context.auth.token;
  console.log(token);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product/allproducts", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setproducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [runUseEffect]);

  async function deleteUser(id) {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/product/deleteproduct/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setRenUseEffect((prv) => prv + 1);
      }
    } catch {
      console.log("Error");
    }
  }

  const showProducts = products.map((product, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{product.title}</td>
      <td>{product.description}</td>
      <td>
        <Link to={`${product._id}`}>
          <i
            className="fa-solid fa-pen-to-square"
            style={{ color: "#74afb9", fontSize: "20px", paddingRight: "40px" }}
          ></i>
        </Link>
        <i
          onClick={() => deleteUser(product._id)}
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
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showProducts}</tbody>
      </table>
    </div>
  );
}
