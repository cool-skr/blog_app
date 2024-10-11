const { NextResponse } = require("next/server")
import { ConnectDb } from "@/lib/congif/db";
import BlogModel from "@/lib/models/BlogModel";
import {writeFile} from 'fs/promises';
const fs= require('fs') 

//API ENDPOINT TO GET ALL BLOGS
export async function GET(request) {
    await ConnectDb(); // Ensure DB connection
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
        const blog = await BlogModel.findById(blogId); 
        console.log(blog);
        return NextResponse.json(blog);
    }
    const blogs = await BlogModel.find({});
    return NextResponse.json({
        blogs
    });
}

// API ENDPOINT FOR UPLOADING
export async function POST(request) {
    await ConnectDb(); // Ensure DB connection

    const formData = await request.formData();
    const timestamp = Date.now();
    
    const image = formData.get('image');
    const imageByteData= await image.arrayBuffer();
    const buffer=Buffer.from(imageByteData);

    const path=`./public/${timestamp}_${image.name}`
    await writeFile(path,buffer);

    const imgUrl =  `/${timestamp}_${image.name}`;
    const blogData ={
        title:`${formData.get('title')}`,
        description:`${formData.get('description')}`,
        category:`${formData.get('category')}`,
        author:`${formData.get('author')}`,
        image:`${imgUrl}`,
        authorImg :`${formData.get('authorImg')}`,
    }
    await BlogModel.create(blogData);
    console.log("Blog Saved")
    return NextResponse.json({
        success:true,
        msg:"Blog Added"
    })

}

// Creating API ENDPOINT For Blog Deletion

export async function DELETE(request){
    await ConnectDb(); // Ensure DB connection
    const id = await request.nextUrl.searchParams.get('id')
    const blog = await BlogModel.findById(id);
    fs.unlink(`./public${blog.image}`,()=>{});
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({
        msg:"Blog Deleted"
    })

}