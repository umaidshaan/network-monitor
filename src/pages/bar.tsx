import BarChart from '@/Components/Charts/BarChart.jsx';
import DateCalendarValue from "@/Components/DatePicker";
import { AppDataContext } from '@/Contexts/AppData';
import { Box } from '@mui/material';
import React, { useContext } from 'react'


const Bar = () => {
    const { data } = useContext(AppDataContext);

    return (
        <div>
            <Box height='75vh'>
                <BarChart data={data} />
            </Box>
        </div>
    );
}

export default Bar;
