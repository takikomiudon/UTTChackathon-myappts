import { useState } from 'react';
import '../App.css';
import Header from './Header';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import {useUserInfo} from "../Context/UserContext";
import {url} from "../type";

const UserUpdate = () => {
  const {userInfo} = useUserInfo();
  const [name,setName] = useState("")
  const onSubmit = async (name:string) => {
    if (name.length > 50 || name.length==0){
      alert("Please enter a name between 1 and 50 characters")
      return 
    }
    
    try{
      const response = await fetch(
        url+"/userupdate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nameid: userInfo.nameId,
            name: name
          }),
        });
        
        if (!response.ok){
          throw Error(`Failed to create user ${response.status}`);
        }

        setName("");
      } catch(err) {
        console.error(err);
    }
  };

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    alert(`${name} was registered.`)
    e.preventDefault()
    onSubmit(name)
  }

  return (
    <div className="App">
      {/* <Header/> */}
      <body>
        <h1>
          User Update Page
        </h1>
        <form style={{ display: "flex", flexDirection: "column" }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <TextField 
              id="outlined-basic" 
              type="text" 
              label="New User's Name" 
              variant="outlined" 
              value={name}
              onChange={(e) => setName(e.target.value)} 
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Button variant="contained" endIcon={<PersonAddAltOutlinedIcon />} onClick={(e) => submit(e)}>
            Update
          </Button>
        </FormControl>
      </form>
      </body>
    </div>
  );
}

export default UserUpdate;