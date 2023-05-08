'use client';
import supabase from "../../../config/SupabaseClient";
import Link from "next/link";
import { useState,useEffect } from "react";

const RealtimeSmoothie = ({item}) => {
    const [smoothie, setsmoothie] = useState(item);
    useEffect(() => {
        const channel=supabase.channel('realtime smoothie').on("postgres_changes",{
                event:"UPDATE",schema:"public",table:"smoothies",
                filter:`id=eq.${smoothie.id}`
            },(payload)=>{
                setsmoothie(payload.new)
            }).subscribe()
         return ()=>{
          supabase.removeChannel(channel)
         }
        }, [supabase,smoothie,setsmoothie]);
  return (

          <div>
 <h2>{smoothie?.title}</h2>
 <span>{smoothie?.method}</span>
 <h6>{smoothie?.rating}</h6>
 <Link href="/home">home page</Link>
 </div>

  )
}

export default RealtimeSmoothie