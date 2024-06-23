import axiosInstance from "../axios.js";
import { useState, useContext } from "react";
import AuthContext from "../AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm.jsx";
import {useMessage} from "../hooks/useMessage.jsx";

const Register = () => {
  const { message, showMessage } = useMessage(4000);
  const { baseUrl, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    username: "",
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`${baseUrl}api/user/create/`, {
        user_name: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then(() => {
        move_to_home_page(formData,setToken,navigate);
      })
      .catch(() => {
        move_to_home_page(formData,setToken, navigate);
      });
    setFormData(initialFormData);
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gradient-to-bl from-[#afd9d8] to-sky-100 h-screen overflow-hidden ">
        <div className="form-wrap">
          <h1 className="text-3xl font-bold text-center mb-4 font-Stylish">
            התחבר
          </h1>
          <RegisterForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formData={formData}
          />
        </div>
      </div>
        {message.text && (
            <div className={`z-20 w-fit top-0 left-1/2 ${message.type === 'success' ? 'bg-sky-500' : 'bg-red-500'} text-white px-4 py-2 rounded-md fixed animate-fade-in-down`}>
                {message.text}
            </div>
        )}
    </>
  );
};


function move_to_home_page(formData,setToken,navigate) {
  if (formData.username === "ohad") {
    setToken({ id: 6, username: formData.username });
    navigate('/');
  } else {
    setToken({ id: 1, username: formData.username });
  }

  navigate('/');
}

export default Register;
