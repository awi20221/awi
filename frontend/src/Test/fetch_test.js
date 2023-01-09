import React, {useState, useEffect} from "react";
import axios from "axios";

function CurrenciesFetch() {
    const [posts, setPosts] = useState([])

    useEffect(() =>{
      axios.get("http://localhost:3001/api/currencies")
        .then(res => {
          console.log(res);
          setPosts(res.data)
        } )
        .catch(err =>{
          console.log(err);
        })
    })

    return(
      <div>
        <ul>
          {posts.map(post=> (<li key={post.id}>{post.currency}</li>
            ))}
        </ul>
      </div>
    )
}
export default CurrenciesFetch
