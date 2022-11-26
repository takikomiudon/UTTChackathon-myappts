import { MouseEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useUserInfo } from "../Context/UserContext";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import {url} from '../type';
import Divider from '@mui/material/Divider';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

const drawerWidth = 240;

const Theme = createTheme({
  palette: {
    primary: {
        main: '#282c34',
    },
    secondary: {
        main: '#ffffff'
    },
  },
});

const CustomizedDrawer = styled(Drawer)({
  '& .MuiDrawer-paper':{
    backgroundColor:'#323232'
  }
});

type Props = {
    component: JSX.Element
}

export default function Sidebar(props:Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {userInfo, setUserInfo} = useUserInfo();

  const onDelete = async (id: string) =>{
    try{
      const response = await fetch(
        url+"/userdelete",
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
          throw Error(`Failed to delete user ${response.status}`);
        }

      } catch(err) {
        console.error(err);
    }
    setUserInfo({...userInfo, nameId: ""})
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ThemeProvider theme={Theme}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color='primary'>
            <Toolbar>
                <h3>UTokyo Tech Club 大感謝祭</h3>
                <div style={{flexGrow: 1}}></div>
                <Button color='secondary' onClick={handleMenu}>{userInfo.name}</Button>
                <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                  <MenuItem
                    component={Link}
                    to="/userupdate"
                  >
                    <ListItemIcon>
                        <ManageAccountsOutlinedIcon/>
                      </ListItemIcon>
                      <ListItemText>Change Username</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      alert(`${userInfo.name} was deleted`)
                      onDelete(userInfo.nameId)
                  }}>
                    <ListItemIcon>
                      <PersonRemoveOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText>Delete User</ListItemText>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/login"
                    onClick={() => {
                      setUserInfo({...userInfo, nameId: ""})
                      localStorage.setItem("nameId","")
                      localStorage.setItem("name","")
                      }}
                  >
                    <ListItemIcon>
                      <LogoutOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
      </ThemeProvider>
      
      <CustomizedDrawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List sx={{display: 'flex', flexDirection: 'column' }}>
            {userInfo.nameId!='' ?
             [{title:'Home',link:'/home',color:'#007fff'},
              {title:'Ranking',link:'/ranking',color:'#ff007f'},
              {title:'List',link:'/list',color:'#00ff00'},
              {title:'Post',link:'/post',color:'#7f00ff'}
            ].map((text, index) => (
              <div>
              <ListItem key={text.title} disablePadding>
                <Link to={text.link} style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" sx={{width: drawerWidth*0.9, margin:1}}>
                    <ListItemIcon sx={{color:text.color}}>
                        {index === 0 ? <HomeOutlinedIcon /> :
                        index === 1 ? <WorkspacePremiumOutlinedIcon /> :
                        index === 2 ? <FormatListBulletedOutlinedIcon/> : 
                        <ForwardToInboxOutlinedIcon/>}
                    </ListItemIcon>
                    <ListItemText primary={text.title} sx={{color:text.color}}/>
                    </Button>
                </Link>
              </ListItem>
              </div>
            )
            ):null}
            <div style={{flexGrow: 5 }}></div>
            <Divider color='#01579b' flexItem></Divider>
            {userInfo.nameId!='' ? null:
                <ListItem
                component={Link}
                to='/register'
                style={{ textDecoration: 'none' }}
                disablePadding
              >
                  <Button variant="outlined" sx={{width: drawerWidth*0.9, margin:1}}>
                    <ListItemIcon sx={{color: '#ffff00'}}>
                      <PersonAddAltOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText sx={{color: '#ffff00'}}>
                      Register
                    </ListItemText>
                  </Button>
                </ListItem>
              }
              <ListItem
                component={Link}
                to='/login'
                style={{ textDecoration: 'none' }}
                onClick={
                  userInfo.nameId!='' ?
                  () => {
                    setUserInfo({...userInfo, nameId: ""})
                    localStorage.setItem("nameId","")
                    localStorage.setItem("name","")
                  }
                :()=>{}}
                disablePadding
              >
              <Button variant="outlined" sx={{width: drawerWidth*0.9, margin:1}}>
                <ListItemIcon sx={{color: '#ffa500'}}>
                  {userInfo.nameId!='' ? <LogoutOutlinedIcon/>: <LoginOutlinedIcon/>}
                </ListItemIcon>
                <ListItemText sx={{color: '#ffa500'}}>
                  {userInfo.nameId!='' ? 'Logout' : 'Login'}
                </ListItemText>
              </Button>
            </ListItem>
          </List>
        </Box>
      </CustomizedDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {props.component}
      </Box>
    </Box>
  );
}