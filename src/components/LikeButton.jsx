import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const LikeButton = ({ isActive, onClick }) => {
  return (
    <button
      className={`${isActive ? "text-red-500" : "text-gray-500"}`}
      onClick={onClick}
    >
      {isActive ? (
        <AiFillHeart className={`transition-transform animate-pulse`} />
      ) : (
        <AiOutlineHeart />
      )}
    </button>
  );
};

export default LikeButton;
