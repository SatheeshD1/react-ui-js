import React from 'react';
import Accordion from '../../components/common/Accordion';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { NavLink, Outlet } from 'react-router-dom';

const Tab1 = () => {
    return <React.Fragment>
        <h1>Report Detail</h1>
    </React.Fragment>;
}

const TabList = [{
    tab: "My Reports", path: "reports"
},
{
    tab: "My Templates", path: "templates"
},
{
    tab: "My Schedules", path: "schedules"
}];

const Reports = () => {
    const [value, setValue] = React.useState('My Reports');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className='shadow-lg bg-[#9333ea] rounded-lg text-[#fafafa]'>
            {/* <Accordion
        title="Report Details"
        content={<Tab1/>}
      />
      <Accordion
        title="Report Fields"
        content={<Tab1/>}
      />
      <Accordion
        title="Report Filters"
        content={<Tab1/>}
      /> */}
            <Tabs
                value={value}
                onChange={handleChange}
                // textColor="white"
                sx={{
                    "& .MuiTab-root": {
                        color: "white" // Color for unselected tabs
                    },
                    "& .MuiButtonBase-root-MuiTab-root.Mui-selected": {
                        color: "white"
                    }
                }}
                // indicatorColor="white"
                TabIndicatorProps={{
                    sx: {
                        backgroundColor: 'white'
                    }
                }}
                aria-label="secondary tabs example"
            >
                {
                    TabList.map(data => {
                        return <Tab value={data.tab} label={data.tab} component={NavLink} to={data.path}> </Tab>
                    })
                }
            </Tabs>
            <div className='shadow-lg bg-white h-screen'>
                <Outlet />
            </div>
        </div>
    )
}

export default Reports