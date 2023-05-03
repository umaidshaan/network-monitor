import * as React from "react";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AppDataContext } from "@/Contexts/AppData";

export interface CustomDatePickerProps{

}

const CustomDatePicker = () => {
    const { setDate } = React.useContext(AppDataContext);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
                defaultValue={moment()}
                onChange={(e) => {
                    setDate(moment(e).format("YYYY-MM-DD"));
                }}
                maxDate={moment()}
            />
        </LocalizationProvider>
    );
}

export default CustomDatePicker;
