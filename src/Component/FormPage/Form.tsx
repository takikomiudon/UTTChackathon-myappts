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

type Props = {
  nameid: string
  contributorId: string
  setContributorId: React.Dispatch<React.SetStateAction<string>>
  point: number
  setPoint: React.Dispatch<React.SetStateAction<number>>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  onSubmit: (nameid: string, contributorId: string, point: number, message: string) => void
};

const Form = (props: Props) => {
  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    props.onSubmit(props.nameid, props.contributorId, props.point, props.message)
  }
  
  const [users,setUsers] = React.useState<UserResponse[]>([]);

  const handleUser = (event: SelectChangeEvent) => {
    props.setContributorId(event.target.value);
  };

  const fetchUsers = async ()=>{
    try {
      const res = await fetch ("http://localhost:8000/login",
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
    <div className="App">
      <form style={{ display: "flex", flexDirection: "column" }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">User</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={props.contributorId}
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
              value={props.point}
              onChange={(e) => props.setPoint(Number(e.target.value))}
              endAdornment={<InputAdornment position="end">Point</InputAdornment>}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <TextField 
              id="outlined-basic" 
              type="text" 
              label="Message" 
              variant="outlined" 
              value={props.message}
              onChange={(e) => props.setMessage(e.target.value)} 
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