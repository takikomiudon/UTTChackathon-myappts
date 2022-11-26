import { useState, useEffect } from 'react';
import '../../App.css';
import { Contribution, Contributed } from '../../type';
import { Link } from "react-router-dom";
import Header from '../Header';
import {useUserInfo} from "../../Context/UserContext";
import {url} from "../../type";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function ListPage() {
  const {userInfo, setUserInfo} = useUserInfo();
  const [contribution, setContribution] = useState<Contribution []>([]);
  const [contributed, setContributed] = useState<Contributed []>([]);

  const fetchUsers = async ()=>{
    try {
      const res = await fetch (url+"/allcontribution",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      if (!res.ok){
        throw Error(`Failed to fetch users: ${res.status}`);
      }
      const contribution = await res.json();
      setContribution(contribution);
    } catch(err) {
      console.error(err)
    }


    try {
      const res = await fetch (url+"/mycontribution?nameid=" + userInfo.nameId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      if (!res.ok){
        throw Error(`Failed to fetch users: ${res.status}`);
      }
      const contribution = await res.json();
      setContribution(contribution);
    } catch(err) {
      console.error(err)
    }

    try {
        const res = await fetch (url + "/mycontributed?nameid=" + userInfo.nameId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        if (!res.ok){
          throw Error(`Failed to fetch users: ${res.status}`);
        }
        const contributed = await res.json();
        setContributed(contributed);
      } catch(err) {
        console.error(err)
      }
  };
  
  const onDelete = async (id: string) =>{
    try{
      const response = await fetch(
        url+"/contributiondelete",
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
          throw Error(`Failed to delete contribution ${response.status}`);
        }

      } catch(err) {
        console.error(err);
    }
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  },[]);

  return (
    <div className="App">
      {/* <Header/> */}
      <body style={{display:'flex', flexDirection: "row"}}>
        <div style={{flex:1}}>
          <h1>Your Contribution</h1>
          {/* {contribution.map((c,index) =>
            <section key={index}>
              <p>FROM {c.Contributor}  {c.Point}Pt  Message:{c.Message}</p>
            </section>
          )} */}
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>FROM</TableCell>
                  <TableCell align="right">POINT</TableCell>
                  <TableCell align="left">MESSAGE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contribution.map((c,index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{c.Contributor}</TableCell>
                    <TableCell align="right">{c.Point}</TableCell>
                    <TableCell align="left">{c.Message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        
        <div style={{flex:1}}>

        <h1>Your Contributed</h1>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>TO</TableCell>
                  <TableCell align="right">POINT</TableCell>
                  <TableCell align="left">MESSAGE</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contributed.map((c,index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{c.Contributor}</TableCell>
                    <TableCell align="right">{c.Point}</TableCell>
                    <TableCell align="left">{c.Message}</TableCell>
                    <TableCell align="right">
                      <Link to='/update'>
                        <button onClick={() => setUserInfo({...userInfo, contributionId: c.Id})}>
                          Update
                        </button>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        e.preventDefault()
                        onDelete(c.Id)
                      }}>
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        {/* {contributed.map((c,index) =>
          <section key={index}>
            <p>
              TO {c.Contributor}  {c.Point}Pt  Message:{c.Message}
              <Link to='/update'>
              <button onClick={() => setUserInfo({...userInfo, contributionId: c.Id})}>Update</button>
              </Link>
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault()
                onDelete(c.Id)
              }}>
                Delete
              </button>
            </p>
          </section>
        )} */}
        
        </div>
      </body>

    </div>
  );
}

export default ListPage;