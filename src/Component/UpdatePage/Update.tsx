import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { UserResponse } from '../../type'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import {useUserInfo} from "../../Context/UserContext";
import {url} from "../../type";

type Props = {
  onSubmit: (nameid: string, contributorId: string, point: number, message: string) => void
};

const Form = (props: Props) => {
  const {userInfo,setUserInfo} = useUserInfo();

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    props.onSubmit(userInfo.nameId, userInfo.contributorId, userInfo.point, userInfo.message)
  }
  
  const [users,setUsers] = React.useState<UserResponse[]>([]);

  const handleUser = (event: SelectChangeEvent) => {
    setUserInfo({...userInfo, contributorId: event.target.value});
  };

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
      setUsers(users);
    } catch(err) {
      console.error(err)
    }
  };

  React.useEffect(() => {
    fetchUsers()
  },[]);

  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">User</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={userInfo.contributorId}
            label="User"
            onChange={handleUser}
          >
            {users.map((user,index) => (
              <MenuItem
                key={index}
                value={user.NameId}
              >
                {user.Name} ID:{user.NameId}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        <FormControl sx={{ m: 1, minWidth: 12 }}>
          <OutlinedInput
              id="outlined-number"
              type="number"
              value={userInfo.point}
              onChange={(e) => setUserInfo({...userInfo, point: Number(e.target.value)})}
              endAdornment={<InputAdornment position="end">Point</InputAdornment>}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <TextField 
              id="outlined-basic" 
              type="text" 
              label="Message" 
              variant="outlined" 
              value={userInfo.message}
              onChange={(e) => setUserInfo({...userInfo, message: e.target.value})} 
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Button variant="contained" endIcon={<SendIcon />} onClick={(e) => submit(e)}>
            Send
          </Button>
        </FormControl>
      </form>
  </div>
  );
};

export default Form;