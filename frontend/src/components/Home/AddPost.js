import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useSelector, useDispatch } from "react-redux";
import {sendPost} from "../../redux/actions/postAction"

const AddPost = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts);

//   console.log(post);

  const [caption, setcaption] = useState("");
  
  const submitPost = async (e) => {
    e.preventDefault();
    console.log(caption);
    await dispatch(sendPost(caption));
    setcaption("")
  };

  return (
    <>
      <div
        style={{ padding: "1rem", paddingTop: "2rem" }}
        className="flex flex-col bg-white p-4 rounded-md"
      >
        <form
          onSubmit={(e) => submitPost(e)}
          className="top flex items-center justify-center"
        >
          <Avatar />
          <input
            type="text"
            style={{ backgroundColor: "#d3d2d28f", height: "2rem" }}
            className="rounded-md bg-black w-full ml-2 h-4 pl-4"
            value={caption}
            placeholder="What's on your mind ?"
            onChange={(e) => {
              setcaption(e.target.value);
            }}
          />
        </form>
        <div className="flex justify-center items-center mt-2 bg-white">
          <div
            style={{ padding: "0.5rem 0px" }}
            className="flex items-center justify-center flex-initial w-1/3 hover:bg-gray-300 cursor-pointer rounded-md"
          >
            <InsertPhotoIcon />
            <p>Live Video</p>
          </div>
          <div
            style={{ padding: "0.5rem 0px" }}
            className="flex items-center justify-center flex-initial w-1/3 hover:bg-gray-300 cursor-pointer rounded-md"
          >
            <InsertPhotoIcon />
            <p>Photo/Video</p>
          </div>
          <div
            style={{ padding: "0.5rem 0px" }}
            className="flex items-center justify-center flex-initial w-1/3 hover:bg-gray-300 cursor-pointer rounded-md"
          >
            <InsertPhotoIcon />
            <p>Feeling/Activity</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
