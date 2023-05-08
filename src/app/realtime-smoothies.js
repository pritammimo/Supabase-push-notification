'use client';
import supabase from "../config/SupabaseClient";
import Link from "next/link";
import { useState,useEffect } from "react";

const RealtimeSmoothies = ({item}) => {
    const [smoothie, setsmoothie] = useState(item);
    useEffect(() => {
    const channel=supabase.channel('realtime smoothie').on("postgres_changes",{
            event:"INSERT",schema:"public",table:"smoothies"
        },(payload)=>{
            setsmoothie([...smoothie,payload.new])
        }).subscribe()
     return ()=>{
      supabase.removeChannel(channel)
     }
    }, [supabase,smoothie,setsmoothie]);
  return (
    <div>{console.log(item)}
    {smoothie?.map((single)=>(
          <Link href={`smoothie/${single?.id}`} key={single?.id}>
 <h2>{single?.title}</h2>
 <span>{single?.method}</span>
 <h6>{single?.rating}</h6>
 </Link>
    ))}
    </div>

  )
}

export default RealtimeSmoothies