import { Avatar } from "@mui/material";
import React, {useState} from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import image from "./demo.jpg";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ShortCaption from "./ShortCaption";
import { useSelector, useDispatch } from "react-redux";
import {addComment} from "../../redux/actions/postAction"
import "./post.css";

const Posts = (props) => {
  let caption = props.post.caption
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const submitComment = async (postId, e) => {
    e.preventDefault();
    console.log(postId, comment);
    await dispatch(addComment(postId, comment))
    setComment("");
  }

  // console.log(props.post.caption)

  return (
    <>
      <section className="bg-white rounded-md my-6 p-3">
        <div className="border-b-2">Post Title</div>
        <div className="mt-2">
          <div className="upper flex justify-between items-center">
            <div className="flex items-center justify-center ml-2">
              <Avatar className="z-0" />
              <div className="ml-2">
                <div className="font-semibold">Latest Marathi</div>
                <div className="date">5 March at 13:03</div>
              </div>
            </div>
            <div className="mr-2">
              <MoreHorizIcon />
            </div>
          </div>
          <div className="w-[90%] ml-12 mt-2">
            
            {caption?.length > 200 ? <ShortCaption caption={caption} />: (<div>{caption}</div>)}
          </div>
          <div className="flex justify-center items-center h-[310px] mt-2">
            <img src={image} className="h-[300px] w-full" alt="" />
          </div>
        </div>
        <div className="commentBox">
          <div className="flex justify-between border-b-2 border-gray-300">
            <div className="flex">
              <ThumbUpAltIcon />
              <div className="ml-1">{props.post.likes.length}</div>
            </div>
            <div className="flex">
              <p className="mr-2">{props.post.comments.length} comments</p>
              <p>123 shares</p>
            </div>
          </div>
          <div className="commentButtons flex justify-center mt-2">
            <div className="flex flex-initial w-1/3 justify-center items-center ml-2 cursor-pointer rounded-md p-2 hover:bg-gray-300">
              <ThumbUpOutlinedIcon
                sx={{ width: 30, height: 30 }}
                className="mr-1"
              />{" "}
              <p className="text-lg font-semibold">Like</p>
            </div>
            <div className="flex flex-initial w-1/3 justify-center items-center cursor-pointer rounded-md p-2 hover:bg-gray-300">
              <ChatBubbleOutlineOutlinedIcon
                sx={{ width: 30, height: 30 }}
                className="mr-1"
              />{" "}
              <p className="text-lg font-semibold">Comment</p>
            </div>
            <div className="flex flex-initial w-1/3 justify-center items-center mr-2 cursor-pointer rounded-md p-2 hover:bg-gray-300">
              <ShareOutlinedIcon
                sx={{ width: 30, height: 30 }}
                className="mr-1"
              />{" "}
              <p className="text-lg font-semibold">Share</p>
            </div>
          </div>
        </div>
        <form onSubmit={(e)=>submitComment(props.post._id, e)} className="flex items-center mt-2">
          <Avatar className="z-0 mr-3" />
          <input type="text" placeholder="Add a comment" value={comment} onChange={(e)=>setComment(e.target.value)} className="bg-gray-200 h-8 rounded-md w-[100%] pl-4" />
        </form>
        <div className="comments">
          {props.post.comments.map((item)=>{
            return (
            <div className='flex items-center justify-start mt-4'>
              <Avatar sx={{width: 30, height: 30}} className="z-0 mr-3" />
              <p className="bg-gray-200 p-3 rounded-lg">{item.comment}</p>
            </div>)

          })}

        </div>
      </section>
    </>
  );
};

export default Posts;
