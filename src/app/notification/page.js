'use client';
import React, { useEffect, useState } from 'react'
import supabase from "../../config/SupabaseClient";

const Notification = () => {
    const [Notification, setNotification] = useState(null);
    useEffect(() => {
        const fetchNotification = async () => {
          const { data, error } = await supabase
          .from('notification')
            .select()
            .eq('user_id', 2)
            .order('created_at', {ascending: false})
          if (error) {
            setNotification(null)
          }
          if (data) {
            setNotification(data)
          }
        }
    
        fetchNotification()
    
      }, [])
      useEffect(() => {
        const channel=supabase.channel('realtime notification').on("postgres_changes",{
                event:"INSERT",schema:"public",table:"notification"
            },(payload)=>{
                console.log("pay",payload);
                setNotification([...Notification,payload.new])
            }).subscribe()
         return ()=>{
          supabase.removeChannel(channel)
         }
        }, [supabase,Notification,setNotification]);
        const handleNotification=async (id)=>{
            const { data, error } = await supabase
            .from('notification')
            .update({ isread:true })
            .eq('id', id)
            .select()
          if (error) {
            // setFormError('Please fill in all the fields correctly.')
          }
          if (data) {
            console.log("data",data);
            let existnotification=Notification?.filter((item)=>item?.id !==id)
            setNotification([...existnotification,data[0]])
            // setFormError(null)
            // navigate('/')
          }
        }
    //   console.log("smoothi",Notification);
  return (
    <div>
         {console.log("smoothi",Notification)}
      {Notification?.map((item)=>(

        <div key={item?.id} style={{backgroundColor:`${!item?.isread?"red":"blue"}`}}>
          <h2>{item?.title}</h2>
          <span onClick={()=>handleNotification(item?.id)}>{!item?.isread ? "not read yet":"Read"}</span>
          {/* <h6>{item?.rating}</h6> */}
          </div>
      ))}
    </div>
  )
}

export default Notification