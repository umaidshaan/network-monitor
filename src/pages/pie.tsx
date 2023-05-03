import PieChart from "@/Components/Charts/PieChart.jsx";
import { AppDataContext } from "@/Contexts/AppData";
import { Box } from '@mui/material';
import React, { useContext } from 'react'

const Pie = () => {
    const { data } = useContext(AppDataContext);
  return (
      <div>
          {/* <Header title='Pie Chart' subtitle='Simple Pie Chart' /> */}
          <Box height='75vh'>
              <PieChart data={data} />
          </Box>
      </div>
  );
}

export default Pie;
