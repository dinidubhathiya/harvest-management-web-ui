import logo from './Hectre_Logo.png';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Grid, Container } from '@mui/material';
import DataTabs from './Components/DataTabs';
import { getHarvestRecords } from './Services/HarvestService'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Filters from './Components/Filters';

const defaultFilters = {
  orchardIds: [],
  start: null,
  end: null
}

function App() {

  const [filters, setFilters] = useState(defaultFilters);
  const [harvestData, setHarvestData] = useState([]);

  const getData = async () => {
    const apiRep = await getHarvestRecords(filters);

    if (apiRep.ok) {
      const harvestData = await apiRep.json();

      setHarvestData(harvestData);
    }
  }

  useEffect(() => {getData();}, [filters]);


  return (
    <Grid container spacing={4} mt={2} className='page-body page' >
      <Grid item xs={12}>
        <Container maxWidth="lg"  >
          <img src={logo} alt="logo" />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="lg" >
          <Filters filters={filters} setFilters={setFilters} />
        </Container>
      </Grid>
      <Grid item xs={12}>
      <Container maxWidth="lg" >
        <DataTabs data={harvestData} />
        </Container>
      </Grid>

    </Grid>
  );
}

export default App;

