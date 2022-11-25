import { useState, useEffect } from 'react';
import '../../App.css';
import { Contribution, Contributed } from '../../type';
import { Link } from "react-router-dom";
import Header from '../Header';
import {useUserInfo} from "../../Context/UserContext";
import {url} from "../../type";

function ListPage() {
  const {userInfo, setUserInfo} = useUserInfo();
  const [contribution, setContribution] = useState<Contribution []>([]);
  const [contributed, setContributed] = useState<Contributed []>([]);

  const fetchUsers = async ()=>{
    try {
      const res = await fetch (url+"/allcontribution",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      if (!res.ok){
        throw Error(`Failed to fetch users: ${res.status}`);
      }
      const contribution = await res.json();
      setContribution(contribution);
    } catch(err) {
      console.error(err)
    }


    try {
      const res = await fetch (url+"/mycontribution?nameid=" + userInfo.nameId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      if (!res.ok){
        throw Error(`Failed to fetch users: ${res.status}`);
      }
      const contribution = await res.json();
      setContribution(contribution);
    } catch(err) {
      console.error(err)
    }

    try {
        const res = await fetch (url + "/mycontributed?nameid=" + userInfo.nameId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        if (!res.ok){
          throw Error(`Failed to fetch users: ${res.status}`);
        }
        const contributed = await res.json();
        setContributed(contributed);
      } catch(err) {
        console.error(err)
      }
  };
  
  const onDelete = async (id: string) =>{
    try{
      const response = await fetch(
        url+"/contributiondelete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id
          }),
        });
        
        if (!response.ok){
          throw Error(`Failed to delete contribution ${response.status}`);
        }

      } catch(err) {
        console.error(err);
    }
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  },[]);

  return (
    <div className="App">
      {/* <Header/> */}
      <body style={{flex:1, width: "100%", flexDirection: "column"}}>
        <h1>Your Contribution</h1>
        {contribution.map((c,index) =>
          <section key={index}>
            <p>FROM {c.Contributor}  {c.Point}Pt  Message:{c.Message}</p>
          </section>
        )}
        <h1>Your Contributed</h1>
        {contributed.map((c,index) =>

          <section key={index}>
            <p>
              TO {c.Contributor}  {c.Point}Pt  Message:{c.Message}
              <Link to='/update'>
              <button onClick={() => setUserInfo({...userInfo, contributionId: c.Id})}>Update</button>
              </Link>
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault()
                onDelete(c.Id)
              }}>
                Delete
              </button>
            </p>
          </section>
        )}
      </body>

    </div>
  );
}

export default ListPage;