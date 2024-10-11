"use client";

import React, { useEffect, useState } from 'react'
import { assets} from '@/assets/assets'
import Image from 'next/image';
import Footer from '@/components/Footer';
import Link from 'next/link';
import axios from 'axios';
const page = ({params}) => {
    const [data, setData] = useState(null);
    const fetchBlogData = async () => {
        const response = await axios.get('/api/blog',{
            params:{id:params.id}
        });
        setData(response.data)
    }
    useEffect(()=>{
        fetchBlogData();
    },[])
  return ( data?<>
    <div className='bg-200 py-5 px-5 md:px-12 lg:px-28' style={{ backgroundColor: '#B7B7B7' }}>
        <div className='flex justify-between items-center'>
            <Link href={`/`}>
            <Image src={assets.logo} width={180} alt='logo' className='w-[130px] sm:w-auto'/>
            </Link>
            <button className='flex items-center gap-2 font-medium px-3 py-1 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>Get Started 
                <Image src={assets.arrow} alt=''/>
            </button>
        </div>
        <div className='text-center my-24'>
            <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                <Image src={data.authorImg} alt='author_image' width={60} height={60} className='mx-auto mt-6 border border-black rounded-full'/>
                <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
        </div>
    </div>
    <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        <Image  className='border-4 border-black' src={data.image} alt='blog_image' width={1280} height={720} />
        <div className='blog-content' dangerouslySetInnerHTML={{__html:data.description}}></div> 
        <div className='my-24'>
            <p className='text-black font font-semibold my-4'>Share this article on Social media</p>
            <div className='flex'>
                <Image src={assets.twitter_icon} width={50} alt='twitter icon'/>
                <Image src={assets.facebook_icon} width={50} alt='facebook icon'/>

            </div>
        </div>

    </div>
    <Footer/>
    </>:<></>
  )
}

export default page
