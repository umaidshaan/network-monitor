import BarChart from '@/Components/Charts/BarChart.jsx';
import DateCalendarValue from "@/Components/DatePicker";
import { AppDataContext } from '@/Contexts/AppData';
import { Box } from '@mui/material';
import React, { useContext } from 'react'

export interface BarData {
    class: "AD";
    CS19: 137;
    CS20: 96;
    CS21: 72;
    CS22: 140;
}

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
