import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function WidgetSm() {
  const [ newUsers, setNewUsers ] = useState([]);

  useEffect(()=>{
    const getNewUsers = async ()=>{
      try{
        const res = await axios.get("/user?new=true",{
            
          headers: {
            token:
              `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTQyYTUwM2JmODk5YTUxZjhiNTU1MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTIyMzA0MiwiZXhwIjoxNjUxMzA5NDQyfQ.igWFxfcgmNfuDtT0FRZttW-DVGN1WLPOd9j53DUQJ08`
          },
      });
      setNewUsers(res.data);
      }catch(e){
        console.log(e)
      }
    };
    getNewUsers();
  },[])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
          <li className="widgetSmListItem">
            <img
              src={
                user.profilePic ||
                "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
