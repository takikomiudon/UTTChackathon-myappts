import { useState, useEffect } from 'react';
import '../../App.css';
import { User, url } from '../../type'

const Monthly = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async ()=>{
    try {
      const res = await fetch (url+"/monthlyranking",
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
      <body>
        {users.map((users,index) =>
        <section key={index}>
          <h2>{index+1}位  {users.Name}  {users.Point}POINT</h2>
        </section>
        )}
      </body>
    </div>
  );
}

export default Monthly;