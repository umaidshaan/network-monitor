import LineChart from "@/Components/Charts/LineChart.jsx";
import { AppDataContext } from "@/Contexts/AppData";
import { Box } from '@mui/material';
import React, { useContext } from 'react'

const Line = () => {
    // const { data } = useContext(AppDataContext);
  return (
      <div>
          {/* <Header title='Line Chart' subtitle='Simple Line Chart' /> */}
          <Box height='75vh'>
              <LineChart />
          </Box>
      </div>
  );
}

export default Line;
