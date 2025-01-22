import React, { useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useState } from "react";

export default function DatePickerComp({ dateObj, updateUser, setDatePicker }) {
  const [value, setValue] = useState(dayjs(dateObj));

  const handlPickerChange = (newValue) => {
    setValue(newValue);
    if (updateUser) {
      updateUser["createDate"] = dayjs(newValue.$d).format("YYYY-MM-DD");
    } else if (setDatePicker) {
      setDatePicker(dayjs(newValue.$d).format("YYYY-MM-DD"));
    }
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Created date:"
          defaultValue={value}
          onChange={(e, newValue) => handlPickerChange(e, newValue)}
          slotProps={{
            textField: {
              id: "standard-createDate",
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
}
