import { useState } from 'react';
import '../App.css';
import Header from './Header';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

const Register = () => {
  const [name,setName] = useState("")
  const onSubmit = async (name:string) => {
    try{
      const response = await fetch(
        "http://localhost:8000/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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
    if (name.length > 50 || name.trim().length==0){
      alert("Please enter a name between 1 and 50 characters")
    } else {
      alert(`${name} was registered.`)
      e.preventDefault()
      onSubmit(name)
    }
  }

  return (
    <div className="App">
      <Header/>
      <body>
        <p>
          User Register Page
        </p>
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
            Register
          </Button>
        </FormControl>
      </form>
      </body>
    </div>
  );
}

export default Register;