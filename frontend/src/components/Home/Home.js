import React, {useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import AddPost from "./AddPost";
import Posts from "./Posts";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/userAction";
import { getPost } from "../../redux/actions/postAction";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state)=>state.user)
  // const posts = useSelector((state) => state.posts)
  const posts = [
      {
        "image": {
          "public_id": "public_id",
          "url": "url"
        },
        "_id": "637fa32e127859b15eb1a886",
        "caption": "fsdfsdf",
        "owner": {
          "_id": "637fa325127859b15eb1a87d",
          "name": "PushkarGramopadhye ",
          "email": "gramopadhye387@gmail.com",
          "posts": [
            "637fa32e127859b15eb1a886",
            "637fa32f127859b15eb1a88b",
            "637fa333127859b15eb1a890"
          ],
          "followers": [
            "637f9b687e78993e79e4e83f"
          ],
          "following": [
            "637f9b687e78993e79e4e83f"
          ],
          "__v": 3
        },
        "likes": [],
        "createdAt": "2022-11-24T17:00:30.810Z",
        "comments": [],
        "__v": 0
      },
      {
        "image": {
          "public_id": "public_id",
          "url": "url"
        },
        "_id": "637fa32f127859b15eb1a88b",
        "caption": "",
        "owner": {
          "_id": "637fa325127859b15eb1a87d",
          "name": "PushkarGramopadhye ",
          "email": "gramopadhye387@gmail.com",
          "posts": [
            "637fa32e127859b15eb1a886",
            "637fa32f127859b15eb1a88b",
            "637fa333127859b15eb1a890"
          ],
          "followers": [
            "637f9b687e78993e79e4e83f"
          ],
          "following": [
            "637f9b687e78993e79e4e83f"
          ],
          "__v": 3
        },
        "likes": [],
        "createdAt": "2022-11-24T17:00:31.263Z",
        "comments": [],
        "__v": 0
      },
      {
        "image": {
          "public_id": "public_id",
          "url": "url"
        },
        "_id": "637fa333127859b15eb1a890",
        "caption": "post 1",
        "owner": {
          "_id": "637fa325127859b15eb1a87d",
          "name": "PushkarGramopadhye ",
          "email": "gramopadhye387@gmail.com",
          "posts": [
            "637fa32e127859b15eb1a886",
            "637fa32f127859b15eb1a88b",
            "637fa333127859b15eb1a890"
          ],
          "followers": [
            "637f9b687e78993e79e4e83f"
          ],
          "following": [
            "637f9b687e78993e79e4e83f"
          ],
          "__v": 3
        },
        "likes": [],
        "createdAt": "2022-11-24T17:00:35.129Z",
        "comments": [],
        "__v": 0
      }
    ]

  const comments = useSelector((state) => state.comments)

  useEffect(async ()=>{
    await dispatch(loadUser());
    await dispatch(getPost());
  }, [comments])

  useEffect(() => {
    console.log(user)
    if(!user.loading) {
      if(user.error) {
        navigate("/login", {replace: true})
      }
    }
    console.log(posts.post?.posts)
    console.log(posts)
  }, [user.loading, posts.loading])
  

  return (
    <>
      <Navbar show="home"/>
      <div className=' overflow-hidden flex justify-around w-full pt-20'>
        <div className='md:block h-[90.7vh] hidden'>
          
        </div>
        <div className='w-[600px]'>
          <AddPost />
          {!posts.loading && posts.post?.posts?.map((item)=>{
            return <Posts key={item._id} post={item}/>
          })}
        </div>
        <div className='md:block h-[90.7vh] hidden'>
          
        </div>
    </div>
    </>
  );
};

export default Home;
