import React, { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, FormControl, InputLabel, MenuItem, Select, Checkbox, OutlinedInput, ListItemText } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { getAllOrchards } from '../Services/OrchardService';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default ({ filters, setFilters }) => {


    const [orchardOptions, setOrchardOptions] = useState([]);

    const updateFilter = (field, newVal) => {
        setFilters({ ...filters, [field]: newVal });
    }

    const handleOrchardChange = (event) => {
        const {
            target: { value },
        } = event;
        const newVal = typeof value === 'string' ? value.split(',') : value;
        updateFilter('orchardIds', newVal)
    };

    const fetchOrchardData = async () => {
        const apiRep = await getAllOrchards();
        if (apiRep.ok) {
            const orchardData = await apiRep.json();
            setOrchardOptions(orchardData);
        }
    }

    useEffect(() => { fetchOrchardData(); }, []);

    const { orchardIds, start, end } = filters;
    return (
        <Grid container spacing={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>

                <FormControl sx={{ m: 1, width: 200 }}>
                    <DatePicker value={start} onChange={(newVal) => updateFilter('start', newVal)} label="Start" />
                </FormControl>

                <FormControl sx={{ m: 1, width: 200 }}>
                    <DatePicker value={end} onChange={(newVal) => updateFilter('end', newVal)} label="End" />
                </FormControl>

            </LocalizationProvider>

            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-multiple-checkbox-label">Orchards</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={orchardIds}
                    onChange={handleOrchardChange}
                    input={<OutlinedInput label="Orchards" />}
                    renderValue={(selected) => selected.map(i => orchardOptions.find(j => j.id === i).name).join(', ')}
                    MenuProps={MenuProps}
                >
                    {orchardOptions.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            <Checkbox checked={orchardIds.indexOf(item.id) > -1} />
                            <ListItemText primary={item.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>



        </Grid>
    )
}