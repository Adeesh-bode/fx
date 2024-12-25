import RightSwipe from '@/components/molecule/Page/Products/FashionMate/RightSwipe'
import React from 'react'

import axios from 'axios'

interface User {
  weight: number,
  height: number,
  size_top: string,
  size_bottom: string,
  style_preference: string,
  preferred_colors: string,
}

export interface MatchedUser extends User {
  id: number
}

const RightSwipePage = async () => {
  let data : MatchedUser[];
  try{
    const response = await axios.post('http://localhost:8000/match', {
        "Size_Top": "L",
        "Size_Bottom": "L",
        "Age": 23,
        "Weight": 80,
        "Height": 172,
        "Style_Preference": "Casual",
        "Preferred_Colors": "Black"
    } )
    data=response.data.matches
    // data = response.data
    console.log(data)
  }catch(err){
    console.log(err)
  }
  return (
    <>
    <RightSwipe matches={data} />
    </>
  )
}

export default RightSwipePage