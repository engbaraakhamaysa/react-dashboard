import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [runUseEffect, setRenUseEffect] = useState(0);

  const context = useContext(User);
  const token = context.auth.token;
  console.log(token);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product/allproducts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [runUseEffect]);

  async function deleteProduct(id) {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/product/deleteproduct/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setRenUseEffect((prv) => prv + 1);
      }
    } catch (err) {
      console.log("Error", err);
    }
  }

  const showProducts = products.map((product, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{product.title}</td>
      <td>{product.description}</td>
      <td>
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
        )}
      </td>
      <td>
        <Link to={`${product._id}`}>
          <i
            className="fa-solid fa-pen-to-square"
            style={{ color: "#74afb9", fontSize: "20px", paddingRight: "40px" }}
          ></i>
        </Link>
        <i
          onClick={() => deleteProduct(product._id)}
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
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showProducts}</tbody>
      </table>
    </div>
  );
}
