import React, { useState } from "react";

const CustomDatePicker = () => {
    const [value, setValue] = useState(new Date());

    const onChange = (value: any) => {
        setValue(value)
    }

    return (
        <div>
            
        </div>
    );
}


export default CustomDatePicker;