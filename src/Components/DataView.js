import React from 'react';
import { Grid, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';


export default ({ data = {} }) => {

    
    const costChartData = [];
    const quntityChartData = [];
    let totalBins = 0;
    let totalCost = 0;

    for (const [key, value] of Object.entries(data)) {
        costChartData.push({ id: key, value: value.cost, label: key });
        quntityChartData.push({ id: key, value: value.binCount, label: key });
        totalBins += value.binCount;
        totalCost += value.cost;
    }


    return (
        <Grid container spacing={2}>

            <Grid item xs={6}>
                <PieChart
                    series={[
                        {

                            data: quntityChartData,
                        },
                    ]}
                    width={400}
                    height={400}
                    legend={{ hidden: true }}
                    title='sd'
                />
                <Typography align='justify' variant="subtitle1" >
                    Production
                </Typography>

                <Typography variant="span" >
                    TOTAL: {totalBins} bins
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <PieChart
                    series={[
                        {
                            data: costChartData,
                        },
                    ]}
                    width={400}
                    height={400}
                    legend={{
                        directon: "row",
                        position: {
                            vertical: "top",
                            horizontal: "right"
                        }
                    }}
                    sx={{
                        "--ChartsLegend-rootOffsetX": "-200px",
                        "--ChartsLegend-rootOffsetY": "20px",
                    }}
                />
                <Typography align='justify' variant="subtitle1" >
                    Cost
                </Typography>

                <Typography variant="span" >
                    TOTAL: $ {totalCost}
                </Typography>
            </Grid>

        </Grid>
    )
}
