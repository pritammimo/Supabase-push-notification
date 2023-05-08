import supabase from '@/config/SupabaseClient';
import React from 'react'
import RealtimeSmoothie from './realtime-smoothie';
export const revalidate=0
export const dynamic="force-dynamic"
export async function getdata(id) {
    const { data, error } = await supabase
    .from('smoothies')
    .select()
    .eq('id', id)
    .single()
    return {
      data,
    };
  }
const page = async(context) => {
    const { data } = await getdata(context.params.slug);
    console.log("single",data);
  return (
    <RealtimeSmoothie item={data}/>
  )
}

export default page