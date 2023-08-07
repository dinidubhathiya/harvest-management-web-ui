import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import DataView from './DataView';

const processOrchardData= (data) => {
    const varietyData = data.reduce(function (r, a) {
        r[a.orchard.name] = r[a.orchard.name] || {
            cost: 0,
            binCount: 0
        };
        r[a.orchard.name].binCount += a.binCount;
        r[a.orchard.name].cost += a.hourlyWageRate * a.hoursWorked;
        return r;
    }, Object.create(null));
    return varietyData;
}

const processVarietyData = (data) => {
    const varietyData = data.reduce(function (r, a) {
        r[a.variety] = r[a.variety] || {
            cost: 0,
            binCount: 0
        };
        r[a.variety].binCount += a.binCount;
        r[a.variety].cost += a.hourlyWageRate * a.hoursWorked;
        return r;
    }, Object.create(null));
    return varietyData;
}

function CustomTabPanel(props) {
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
                    {children}
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default ({data}) => {
    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }
    return (
        <div>
            <Typography variant='h5'>PERCENTAGE</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="VARIETIES" {...a11yProps(0)} />
                    <Tab label="ORCHARDS" {...a11yProps(1)} />

                </Tabs>
            </Box>
            <CustomTabPanel value={tabValue} index={0}>
                <DataView data={processVarietyData(data)}/>
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
                <DataView data={processOrchardData(data)}/>
            </CustomTabPanel>

        </div>
    )
}