import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Header from '../Header'
import Typography from '@mui/material/Typography';
import AllTime from './AllTime';
import Annual from './Annual';
import Weekly from './Weekly';
import Monthly from './Monthly';
import Daily from './Daily'

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Ranking() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Header/>
      <p>POINT RANKING</p>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="All-Time" />
          <Tab label="Annual" />
          <Tab label="Monthly"/>
          <Tab label="Weekly" />
          <Tab label="Daily"/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AllTime/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Annual/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Monthly/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Weekly/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Daily/>
      </TabPanel>
    </div>
  );
}