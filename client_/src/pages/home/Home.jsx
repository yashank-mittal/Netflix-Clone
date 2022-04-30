import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../featured/Featured';
import List from '../../list/List';
import axios from 'axios';
import './home.scss'

const Home = ({type}) => {
  const [lists , setLists] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(()=>{
    const getRandomLists = async ()=>{
      try{
        const res = await axios.get(
          `list${type ? "?type=" + type : ""}${category ? "&category=" + category : ""}`,
          {
            headers: {
              token:
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTQyYTUwM2JmODk5YTUxZjhiNTU1MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTIyMzA0MiwiZXhwIjoxNjUxMzA5NDQyfQ.igWFxfcgmNfuDtT0FRZttW-DVGN1WLPOd9j53DUQJ08`
            },
          }
        );
        // console.log(res);
        setLists(res.data)
      }catch(e){
        console.log(e)
      }
    };
    getRandomLists();
  },[type,category]);

  return (
    <div className='home'>
        <Navbar />
        <Featured type={type} />
        {
          lists.map((list) => (
            <List list={list} />
          ))
        }
    </div>
  )
}

export default Home