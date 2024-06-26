import React from "react";
import ReactDOM from "react-dom/client";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./routes/Hero.jsx";
import HeroRecomend from "./routes/HeroRecomend.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import Profile from "./routes/Profile.jsx";
import "./index.css";
import { AuthContextProvider } from "./AuthContext.jsx";
import AuthContext from "./AuthContext.jsx";
import Product from "./routes/Product.jsx";
import Adoption from "./routes/Adoption.jsx";
import Chat from "./routes/Chat.jsx";

const App = () => {
  const { token } = React.useContext(AuthContext);
  if (!token) return <Navigate to="/login" />;
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path={"/"} element={<App />}>
      <Route path={"/profile"} element={<Profile />} />
      <Route path={"/adoption"} element={<Adoption />} />
      <Route path={"/"} element={<Hero />} index={true} />
      <Route path={"/recommendations"} element={<HeroRecomend />} />
      <Route path={"/:id"} element={<Product />} />
      <Route path={"/chat/:id"} element={<Chat />} /> 
    </Route>,
    <Route path={"/login"} element={<Login />} />,
    <Route path={"/register"} element={<Register />} />,
  ])
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
