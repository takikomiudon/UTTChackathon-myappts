import { useState, useEffect, useContext } from 'react';
import '../App.css';
import Header from './Header';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import {UserContext} from "../Context/UserContext";

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
      setName(user);
    } catch(err) {
      console.error(err)
    }
  }

  const onDelete = async (id: string) =>{
    try{
      const response = await fetch(
        "http://localhost:8000/userdelete",
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
          throw Error(`Failed to delete user ${response.status}`);
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
      <Header/>
      <body>
        Welcome, {name}！！
      </body>
      <Link to="/userupdate" style={{ textDecoration: 'none' }}>
        <Button variant="contained" startIcon={<ManageAccountsOutlinedIcon/>}>
          Change User Name
        </Button>
      </Link>
      <Button variant="contained" startIcon={<PersonRemoveOutlinedIcon/>} 
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault()
                alert(`${name} was deleted`)
                onDelete(props.nameid)
              }}>
        Delete User
      </Button>
    </div>
  );
};

export default Home;