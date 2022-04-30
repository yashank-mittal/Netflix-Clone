import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './featured.scss'

export default function Featured({type}) {
    const [ content , setContent ] = useState({});

    useEffect(()=>{
        const getRandomContent = async ()=>{
            try{
                const res = await axios.get(`/movies/random?type=${type}` , {
                    headers: {
                      token:
                        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTQyYTUwM2JmODk5YTUxZjhiNTU1MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTIyMzA0MiwiZXhwIjoxNjUxMzA5NDQyfQ.igWFxfcgmNfuDtT0FRZttW-DVGN1WLPOd9j53DUQJ08`
                    },
                  })
                setContent(res.data[0]);
            }catch(e){
                console.log(e);
            }
        }
        getRandomContent();
    },[type])
  return (
    <div className='featured'>
        {type && (
            <div className='category'>
                <span>{type === "movies" ? "Movies" : "Series"}</span>
                <select name="genre" id="genre">
                    <option>Genre</option>
                    <option value="adventure">Adventure</option>
                    <option value="comedy">Comedy</option>
                    <option value="crime">Crime</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="historical">Historical</option>
                    <option value="horror">Horror</option>
                    <option value="romance">Romance</option>
                    <option value="sci-fi">Sci-fi</option>
                    <option value="thriller">Thriller</option>
                    <option value="western">Western</option>
                    <option value="animation">Animation</option>
                    <option value="drama">Drama</option>
                    <option value="documentary">Documentary</option>
                </select>
            </div>
        )}
        <img src={content.img}
            alt="" 
        />
        <div className='info'>
            <img src={content.titleimg} alt=''/>
            <span className="desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et doloribus eveniet, repellat voluptas recusandae, veritatis corrupti mollitia cumque enim, tenetur reprehenderit veniam? Temporibus, commodi? Dolorem quas reiciendis illo saepe rerum!
            </span>
            <div className="buttons">
                <button className="play">
                    <PlayArrow />
                    <span>Play</span>
                </button>
                <button className="more">
                    <InfoOutlined />
                    <span>Info</span>
                </button>
            </div>
        </div>
    </div>
  )
}
