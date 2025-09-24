import { useContext, useEffect, useState } from "react";
import { User } from "../Context/UserContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import LoadingScreen from "../../../Components/Loading";
import Cookies from "universal-cookie";

export default function PersistLogin() {
  const [Loading, setLoading] = useState(true);
  const context = useContext(User);
  const token = context.auth.token;
  const cookie = new Cookies();

  useEffect(() => {
    async function refresh() {
      const getToken = cookie.get("Bearer");
      try {
        await axios
          .post(`http://localhost:8000/api/auth/refreshToken`, null, {
            headers: {
              Authorization: "Bearer " + getToken,
            },
          })
          .then((res) => {
            console.log(res);

            cookie.set("Bearer", res.data.token);
            context.setAuth((prev) => {
              return { token: res.data.token, userDetails: res.data.user };
            });
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    !token ? refresh() : setLoading(false);
  }, []);

  return Loading ? <LoadingScreen /> : <Outlet />;
}
