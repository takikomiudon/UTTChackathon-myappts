import { useState, useEffect } from 'react';
import '../App.css';
import { User } from '../type'
import Header from './Header';

const RankingPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async ()=>{
    try {
      const res = await fetch ("http://localhost:8000/pointranking",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      if (!res.ok){
        throw Error(`Failed to fetch users: ${res.status}`);
      }

      const users = await res.json();
      setUsers(users);
    } catch(err) {
      console.error(err)
    }
  };

  useEffect(() => {
    fetchUsers()
  },[]);

  return (
    <div className="App">
      <Header/>
      <body>
        <p>
          POINT RANKING
        </p>
        {users.map((users,index) =>
        <section key={index}>
          <h2>{index+1}位  {users.Name}  {users.Point}POINT</h2>
        </section>
        )}
      </body>
    </div>
  );
}

export default RankingPage;