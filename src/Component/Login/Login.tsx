import { useState, useEffect } from 'react';
import '../../App.css';
import { UserResponse } from '../../type'
import SelectLabels from './SelectLabels';
import { Link } from "react-router-dom";
import Header from '../Header';
import Button from '@mui/material/Button';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

type Props = {
    NameId: string
    setNameId: React.Dispatch<React.SetStateAction<string>>
};

const Login = (props:Props) => {
  const [users,setUsers] = useState<UserResponse[]>([]);

  useEffect(() => {
    console.log("users",users)
  }, [users]);

  //TODO name無しでログインしようとした時にブロックする
  if (props.NameId == "") {
    return (
      <div className="App">
        <Header/>
        <body>
          <p>
            Login Page
          </p>
          <SelectLabels NameId={props.NameId} setNameId={props.setNameId} users={users} setUsers={setUsers}/>
        </body>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header/>
        <body>
          <p>
            Login Page
          </p>
          <SelectLabels NameId={props.NameId} setNameId={props.setNameId} users={users} setUsers={setUsers}/>
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <Button variant="contained" startIcon={<LoginOutlinedIcon/>}>
              Login
            </Button>
          </Link>
        </body>
      </div>
    );
  }
}

export default Login; 