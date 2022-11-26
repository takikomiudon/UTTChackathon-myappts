import { useState } from 'react';
import '../../App.css';
import { UserResponse } from '../../type'
import SelectLabels from './SelectLabels';
import Header from '../Header';
import daikansha from '../../daikansha.png'

const Login = () => {
  const [users,setUsers] = useState<UserResponse[]>([]);

  return (
    <div className="App">
      {/* <Header/> */}
      <body>
        <h1>
          Login Page
        </h1>
        <SelectLabels users={users} setUsers={setUsers}/>
      </body>
      <img src={daikansha} alt='いや本当マジでありがとう' width='100%'/>
    </div>
  );
}

export default Login; 