import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { UserResponse } from '../../type';
import {useUserInfo} from "../../Context/UserContext";
import {useState} from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import {url} from "../../type";

type Props = {
  users: UserResponse[]
  setUsers: React.Dispatch<React.SetStateAction<UserResponse[]>>
};

export default function SelectLabels(props:Props) {
  const {userInfo, setUserInfo} = useUserInfo();
  const [idInput, setIdInput] = useState("")

  const handleChange = (event: SelectChangeEvent) => {
    setIdInput(event.target.value)
    console.log(event.target.value)
  }

  const fetchName = async ()=>{
    try {
      const res = await fetch (url+"/home?nameid=" + idInput,
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
      setUserInfo({...userInfo, name: user, nameId: idInput});
      localStorage.setItem('name', user)
      localStorage.setItem('nameId', idInput)
    } catch(err) {
      console.error(err)
    }
  };

  const handleLogin = () => {
    fetchName()
    setIdInput("")
  }

  const fetchUsers = async ()=>{
    try {
      const res = await fetch (url+"/login",
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
      props.setUsers(users);
    } catch(err) {
      console.error(err)
    }
  };

  React.useEffect(() => {
      fetchUsers()
      fetchName()
  },[]);

  return (
    idInput=="" ?
      <div className='App'>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={idInput}
              label="User"
              onChange={handleChange}
            >
              {props.users.map((user,index) => (
                <MenuItem
                  key={index}
                  value={user.NameId}
                >
                  {user.Name} ID:{user.NameId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      </div>
    :
    <div className='App'>
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">User</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={idInput}
          label="User"
          onChange={handleChange}
        >
          {props.users.map((user,index) => (
            <MenuItem
              key={index}
              value={user.NameId}
            >
              {user.Name} ID:{user.NameId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
    <div>
      <Link to='/home'>
        <Button variant="contained" startIcon={<LoginOutlinedIcon/>} onClick={handleLogin}>
          Login
        </Button>
      </Link>
    </div>
  </div>
  );
}
