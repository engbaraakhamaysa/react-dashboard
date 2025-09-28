import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function UpdateProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [accept, setAccept] = useState(false);

  const context = useContext(User);
  const token = context.auth.token;

  const nav = useNavigate();
  const id = window.location.pathname.split("/").slice(-1)[0];

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/getbyid/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setPreview(res.data.image);
      })
      .catch((err) => console.log(err));
  }, [id, token]);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("image", image);

      let res = await axios.post(
        `http://localhost:8000/api/product/update/${id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(res);
      nav("/dashboard/products");
    } catch (error) {
      console.log(error);
      setAccept(true);
    }
  }

  return (
    <div>
      <form onSubmit={Submit}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {title.length < 1 && accept && (
          <p className="error">Title must be more than 2 char</p>
        )}

        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          placeholder="Description..."
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="image">Image:</label>
        <input
          id="image"
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {preview && (
          <div style={{ marginTop: "10px" }}>
            <p>Preview:</p>
            <img
              src={preview}
              alt="preview"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
          </div>
        )}

        <div className="register button" style={{ textAlign: "center" }}>
          <button type="submit">Update Product</button>
        </div>
      </form>
    </div>
  );
}
