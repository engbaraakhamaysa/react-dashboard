import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [accept, setAccept] = useState(false);

  const context = useContext(User);
  const token = context.auth.token;

  const nav = useNavigate();

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      let res = await axios.post(
        `http://localhost:8000/api/product/create`,

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
      <div>
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
              onChange={(e) => setImage(e.target.files.item(0))}
            />

            <div className="register button" style={{ textAlign: "center" }}>
              <button type="submit">Create Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
