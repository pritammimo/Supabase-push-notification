import React from 'react'
import supabase from "../config/SupabaseClient";
import Link from 'next/link';
import RealtimeSmoothies from './realtime-smoothies';
export const revalidate=2
export async function getdata() {
  const { data, error } = await supabase
  .from('smoothies')
  .select()
  .order("created_at", {ascending: false})
  return {
    data
  };
}
const Home = async() => {
  const {data}=await getdata();
  console.log(data);
  return (
    <div>
              <RealtimeSmoothies item={data}/>
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