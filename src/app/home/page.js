'use client';
import React, { useEffect, useState } from 'react'
import supabase from "../../config/SupabaseClient";
import Link from 'next/link';
import RealtimeSmoothies from '../realtime-smoothies';

const Home = () => {
    const [smoothies, setSmoothies] = useState(null);
    useEffect(() => {
        const fetchSmoothies = async () => {
          const { data, error } = await supabase
            .from('smoothies')
            .select()
            .order('created_at', {ascending: false})
          if (error) {
            setSmoothies(null)
          }
          if (data) {
            setSmoothies(data)
          }
        }
    
        fetchSmoothies()
    
      }, [])
      console.log("smoothi",smoothies);
  return (
    <div>
         {smoothies !==null &&
         <RealtimeSmoothies item={smoothies}/>
         }    
      {/* {data?.map((item)=>(

        // <Link href={`smoothie/${item?.id}`} key={item?.id}>
        //   <h2>{item?.title}</h2>
        //   <span>{item?.method}</span>
        //   <h6>{item?.rating}</h6>
        //   </Link>
      ))} */}
    </div>
  )
}

export default Home