import { useState, useEffect, useContext } from 'react';
import '../App.css';
import Header from './Header';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import {useUserInfo} from "../Context/UserContext";
import {url} from "../type";
import Typography from '@mui/material/Typography';

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
      {/* <Header/> */}
      <h1>
        Welcome, <strong>{userInfo.name}</strong>！！
      </h1>
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
      <h2>About This Site</h2>
      <h3>
        このサイトは<br/><h1>「Contribute」</h1><br/>を可視化するシステムです。
      </h3>
      <h3>
        レビューをしてくれた<br/>質問に答えてくれた<br/>友達をUTTCに紹介してくれた<br/>などの貢献をPOINTの付与とともに投稿して感謝を伝えましょう。
      </h3>
      <h3>
        100POINTごとに豪華な称号が手に入ります。
      </h3>
    </div>
  );
};

export default Home;