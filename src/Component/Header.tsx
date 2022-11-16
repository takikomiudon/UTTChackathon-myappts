import '../App.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Link } from "react-router-dom";

const Header = () => {

  return (
      <div className="App-header">
        UTokyo Tech Club 大感謝祭
        <Stack direction="row" spacing={8}>
            {/* <Link to="/home" style={{ textDecoration: 'none' }}><Button variant="outlined" startIcon={<HomeOutlinedIcon/>}>Home</Button></Link> */}
            <Link to="/ranking" style={{ textDecoration: 'none' }}><Button href="/ranking" variant="outlined" startIcon={<WorkspacePremiumOutlinedIcon/>}>Ranking</Button></Link>
            <Link to="/list" style={{ textDecoration: 'none' }}><Button href="/list" variant="outlined" startIcon={<FormatListBulletedOutlinedIcon/>}>List</Button></Link>
            <Link to="/post" style={{ textDecoration: 'none' }}><Button href="/post" variant="outlined" startIcon={<ForwardToInboxOutlinedIcon/>}>Post</Button></Link>
            <Link to="/register" style={{ textDecoration: 'none' }}><Button href="/register" variant="outlined" startIcon={<PersonAddAltOutlinedIcon/>}>Register</Button></Link>
            <Link to="/login" style={{ textDecoration: 'none' }}><Button href="/login" variant="outlined" startIcon={<LoginOutlinedIcon/>}>Login</Button></Link>
        </Stack>
      </div>
  );
}

export default Header;