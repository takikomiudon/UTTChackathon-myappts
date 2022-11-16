import { stringify } from 'querystring';
import { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header';

type Props = {
  nameid: string;
}

function Home(props:Props) {
  const [name,setName] = useState("")
  const fetchUsers = async ()=>{
    try {
      const res = await fetch ("http://localhost:8000/home?nameid=" + props.nameid,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      if (!res.ok){
        throw Error(`Failed to fetch users: ${res.status}`);
      }
      const user = await res.json();
      console.log(user,0)
      setName(user);
      console.log(name,1)
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchUsers()
  },[]);

  return (
    <div className="App">
      <Header/>
      <body>
        Welcome, {name}！！
      </body>
    </div>
  );
};

export default Home;