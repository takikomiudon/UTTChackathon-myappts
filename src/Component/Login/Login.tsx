import { useState } from 'react';
import '../../App.css';
import { UserResponse } from '../../type'
import SelectLabels from './SelectLabels';
import Header from '../Header';

const Login = () => {
  const [users,setUsers] = useState<UserResponse[]>([]);

  return (
    <div className="App">
      <Header/>
      <body>
        <p>
          Login Page
        </p>
        <SelectLabels users={users} setUsers={setUsers}/>
      </body>
    </div>
  );
}

export default Login; 