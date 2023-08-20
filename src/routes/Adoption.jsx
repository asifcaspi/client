import axiosInstance from "../axios.js";
import { useState, useContext } from "react";
import AuthContext from "../AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../hooks/useMessage.jsx";
import AdoptionForm from "../components/AdoptionForm.jsx";

const Adoption = () => {
  const { message, showMessage } = useMessage(4000);
  const { baseUrl, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialFormData = Object.freeze({
    name: "",
    description: "",
    category_name: "",
    image: "",
    age: "",
    uploaded_by: token.id,
    sex: "male",
  });

  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`${baseUrl}animals`, formData)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        showMessage({
          text: "Invalid credentials or user exists please retry",
          type: "error",
        });
      });
    setFormData(initialFormData);
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gradient-to-bl from-[#afd9d8] to-sky-100 h-screen overflow-hidden ">
        <div className="form-wrap">
          <h1 className="text-3xl font-bold text-center mb-4 font-Stylish">
            טופס מסירה
          </h1>
          <AdoptionForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formData={formData}
          />
        </div>
      </div>
      {message.text && (
        <div
          className={`z-20 w-fit top-0 left-1/2 ${
            message.type === "success" ? "bg-sky-500" : "bg-red-500"
          } text-white px-4 py-2 rounded-md fixed animate-fade-in-down`}
        >
          {message.text}
        </div>
      )}
    </>
  );
};

export default Adoption;
