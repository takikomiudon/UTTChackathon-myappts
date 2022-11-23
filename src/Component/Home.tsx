import { useState, useEffect, useContext } from 'react';
import '../App.css';
import Header from './Header';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import {useUserInfo} from "../Context/UserContext";
import {url} from "../type";

function Home() {
  const {userInfo, setUserInfo} = useUserInfo();

  const onDelete = async (id: string) =>{
    try{
      const response = await fetch(
        url+"/userdelete",
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
    setUserInfo({...userInfo, nameId: ""})
  }

  return (
    <div className="App">
      <Header/>
      <body>
        Welcome, {userInfo.name}！！
      </body>
      <Link to="/userupdate" style={{ textDecoration: 'none' }}>
        <Button variant="contained" startIcon={<ManageAccountsOutlinedIcon/>} href='/userupdate'>
          Change User Name
        </Button>
      </Link>
      <Button variant="contained" startIcon={<PersonRemoveOutlinedIcon/>} href='/login'
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault()
                alert(`${userInfo.name} was deleted`)
                onDelete(userInfo.nameId)
              }}>
        Delete User
      </Button>
    </div>
  );
};

export default Home;