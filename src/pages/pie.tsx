import PieChart from "@/Components/Charts/PieChart.jsx";
import { Box } from '@mui/material';
import React from 'react'

const Pie = () => {
  return (
      <div>
          {/* <Header title='Pie Chart' subtitle='Simple Pie Chart' /> */}
          <Box height='75vh'>
              <PieChart />
          </Box>
      </div>
  );
}

export default Pie;
