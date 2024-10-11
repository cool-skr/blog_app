import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios';
const BlogList = () => {
    const [category, setCategory] = useState('All');
    const [blogs,setBlogs] = useState([]);
    const fetchBlogs = async ()=>{
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs);
        console.log(response.data.blogs);
    };
    useEffect(()=>{
        fetchBlogs();
    },[]);
    const handleCategory = (category) => {
        setCategory(category)
    }

    const getButtonClass = (buttonCategory) => {
        return category === buttonCategory
            ? 'bg-black text-white px-4 py-1 rounded-sm'
            : 'px-4 py-1 rounded-sm'
    }

    return (
        <div>
            <div className='flex justify-center gap-6 my-10 '>
                <button onClick={() => handleCategory('All')} className={getButtonClass('All')}>All</button>
                <button onClick={() => handleCategory('Technology')} className={getButtonClass('Technology')}>Technology</button>
                <button onClick={() => handleCategory('Startup')} className={getButtonClass('Startup')}>Startup</button>
                <button onClick={() => handleCategory('Lifestyle')} className={getButtonClass('Lifestyle')}>Life Style</button>
            </div>
            <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
                {blogs.filter((item)=> category === 'All' || item.category === category).map((item,index)=>{
                    return <BlogItem key={index} id={item._id} title={item.title} category={item.category} image={item.image} description={item.description} dat/>
                })}
            </div>
        </div>
    )
}

export default BlogList
