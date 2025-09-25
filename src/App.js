import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Website/Auth/SignUp";
import Login from "./Pages/Website/Auth/Login";
import Home from "./Pages/Website/Home";
import About from "./Pages/Website/About";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Dashboard/Users/Users";
import UpdateUser from "./Pages/Dashboard/Users/UpdateUser";
import CreatUser from "./Pages/Dashboard/Users/CreateUser";
import RequiredAuth from "./Pages/Website/Auth/RequireAuth";
import PersistLogin from "./Pages/Website/Auth/PresistLogin";
import Products from "./Pages/Dashboard/Products/Products";
import NewProducts from "./Pages/Dashboard/Products/NewProduct";
import UpdateProduct from "./Pages/Dashboard/Products/UpdateProduct";

export default function App() {
  return (
    <div>
      <Routes>
        {/*Public Routes */}
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />

        {/*Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequiredAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="user/create" element={<CreatUser />} />
              <Route path="products" element={<Products />} />
              <Route path="products/create" element={<NewProducts />} />
              <Route path="products/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
