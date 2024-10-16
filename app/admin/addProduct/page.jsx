"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from 'react-toastify';
import { assets } from "@/assets/assets";
const Page = () => {
  const [image, setImage] = useState(false);
  const [data,setData]= useState({
    title:"",
    description:"",
    author:"Alex Bennett",
    category:"Startup",
    authorImg:"/author_img.png",
  })
  const onChangeHandler = (event) => {
    const name= event.target.name;
    const value = event.target.value;   
    setData((data)=>({
        ...data,
        [name]:value
    

    }));
  }
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('title',data.title);
    formData.append('description',data.description);
    formData.append('author',data.author);
    formData.append('authorImg',data.authorImg);
    formData.append('category',data.category);
    formData.append('image',image);
    const response = await axios.post('/api/blog',formData);
    if(response.data.success){
        toast.success(response.data.msg)
        setImage(false);
        setData({
            title:"",
            description:"",
            author:"Alex Bennett",
            category:"Startup",
            authorImg:"/author_img.png",
        });
    } 
    else{
        toast.error("Error");
    }
  }
  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl">Upload Thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-4"
            src={!image?assets.upload_area:URL.createObjectURL(image)}
            width={160}
            height={70}
          />
        </label>
        <input
          onChange={(e) => {
            setImage(e.target.files[0])
          }}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-xl mt-4 ">Blog Title</p>
        <input name="title" onChange={onChangeHandler} value={data.title} className="w-full sm:w-[500px] mt-4 px-4 py-3 border border-black" type="text" placeholder="Type Here" required/>
        <p className="text-xl mt-4 ">Blog Description</p>
        <textarea name="description" onChange={onChangeHandler} value={data.description} className="w-full sm:w-[500px] mt-4 px-4 py-3 border border-black" type="text" placeholder="Write Content Here" rows={5} required/>
        <p className="text-xl mt-4 ">Blog Category</p>
        <select onChange={onChangeHandler} value={data.category} className="w-40 px-4 py-3 mt-4 text-gray-500 border border-black" name="category">
            <option value={"Startup"}>Startup</option>
            <option value={"Technology"}>Technology</option>
            <option value={"Lifestyle"}>Life Style</option>
        </select>
        <br/>
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">Add</button>
      </form>
    </>
  );
};

export default Page;
