import { useState, useEffect } from 'react';
import '../../App.css';
import { User, url } from '../../type'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Weekly = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async ()=>{
    try {
      const res = await fetch (url+"/weeklyranking",
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

  useEffect(() => {
    fetchUsers()
  },[]);

  return (
    <div className="App">
      <body>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>RANK</TableCell>
                <TableCell align="left">NAME</TableCell>
                <TableCell align="left">POINT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((users,index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row"><h1>{index+1}位</h1></TableCell>
                  <TableCell align="left"><h1>{users.Name}</h1></TableCell>
                  <TableCell align="left"><h1>{users.Point}</h1></TableCell>
                </TableRow>
              ))}
              </TableBody>
          </Table>
        </TableContainer>
        {/* {users.map((users,index) =>
        <section key={index}>
          <h2>{index+1}位  {users.Name}  {users.Point}POINT</h2>
        </section>
        )} */}
      </body>
    </div>
  );
}

export default Weekly;