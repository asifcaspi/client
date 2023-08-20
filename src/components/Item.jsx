import { useState, useRef, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AiOutlineCiCircle } from "react-icons/ai";
import { useMessage } from "../hooks/useMessage.jsx";
import error_img from "../assets/404_Error-rafiki.svg";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext.jsx";
import axiosInstance from "../axios.js";
import LikeButton from "./LikeButton.jsx";

const Item = ({ post, isUser }) => {
  const navigate = useNavigate();
  const { baseUrl, token } = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false);
  const [liked, setLiked] = useState(
    post.liked_by.findIndex((user) => user.id == token.id) !== -1
  );
  const [adopting, setAdopting] = useState(false);
  const inputRef = useRef(null);
  const { message, showMessage } = useMessage(4000);

  const animalPronounce = post.sex === "male" ? "בן" : "בת";

  const handelLikeClick = () => {
    axiosInstance
      .patch(
        baseUrl +
          `animals/${post.id}/${!liked ? "liked_by" : "unlike_by"}/${token.id}/`
      )
      .catch((err) => {
        if (err.response === undefined) {
          showMessage({
            text: "something went wrong try again later",
            type: "error",
          });
        } else {
          showMessage({ text: err.response.data.message, type: "error" });
        }
      })
      .finally(() => {
        setAdopting(false);
      });

    setLiked(!liked);
  };

  const goToChat = () => {
    navigate(`/chat/${post.uploaded_by?.id}`);
  };

  return (
    <>
      {message.text && (
        <div
          className={`z-20 w-fit top-0 left-1/2 ${
            message.type === "success" ? "bg-sky-500" : "bg-red-500"
          } text-white px-4 py-2 rounded-md fixed animate-fade-in-down`}
        >
          {message.text}
        </div>
      )}
      <li
        dir="rtl"
        className="flex flex-col gap-2 rounded p-6 border shadow justify-between "
      >
        <figure
          dir="rtl"
          className="card-wrap groupe relative"
          data-category={post.category_name}
        >
          <img
            src={post.image}
            alt={post.name}
            className="w-full h-64 object-cover rounded hover:opacity-95 transition cursor-pointer hover:scale-105"
            loading="lazy"
            onClick={() => navigate(`${post.id}`)}
            onLoad={() => setLoaded(true)}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = error_img;
            }}
            width="300"
            height="600"
          />
          <figcaption className="text-center text-sky-700 text-md mt-2">
            {post.name}
          </figcaption>
          {!loaded && <Skeleton className="skeleton" inline={true} />}
        </figure>

        {!isUser ? (
          <>
            <p className="text-gray-700 px-2 mt-2 text-sm line-clamp-2 text-right">
              {animalPronounce} {post.age} חודשים
            </p>

            <p className="text-gray-700 px-2 mt-1 text-sm line-clamp-2 text-right">
              תיאור {post.description}
            </p>
            <a
              href="http://localhost:5173/profile"
              className="text-gray-700  px-2 mt-1 text-sm line-clamp-2 text-right"
            >
              פורסם על ידי {post.uploaded_by?.user_name}
            </a>
          </>
        ) : (
          <p className="text-gray-700 px-2 mt-2 text-sm line-clamp-2 text-right">
            בגיל {post.age}
          </p>
        )}

        <div className="flex justify-between items-end mt-4">
          {!isUser && <LikeButton isActive={liked} onClick={handelLikeClick} />}

          <button className="active-btn" onClick={goToChat}>
            {adopting ? <AiOutlineCiCircle className="animate-spin" /> : "צאט"}
          </button>
        </div>
      </li>
    </>
  );
};

export default Item;
