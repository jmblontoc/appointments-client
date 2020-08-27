import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./index.css";
import { format, isBefore } from "date-fns";
import { getAppointments } from "../../services/appointments";
import { NotificationManager } from "react-notifications";

const AppointmentsFilter = ({ listHandler }) => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const handleChange = (setter) => (date) => {
        setter(date);
    };

    const handleFilterClick = async () => {
        const dateFormat = "yyyy-M-d";

        console.log({ startDate, endDate });

        if (!startDate || !endDate) {
            NotificationManager.error(
                "Please provide a start and end date",
                "Error"
            );
        } else if (isBefore(endDate, startDate)) {
            NotificationManager.error("Invalid date range", "Error");
        } else {
            const data = {
                start_date: format(startDate, dateFormat),
                end_date: format(endDate, dateFormat),
            };

            let { data: appointments } = await getAppointments(data);
            listHandler(appointments);
        }
    };

    const handleClearFilterClick = async () => {
        let { data: appointments } = await getAppointments();
        setStartDate(null);
        setEndDate(null);
        listHandler(appointments);
    };

    return (
        <div className="filter-container">
            <div>Filter by date</div>
            <DatePicker
                className="filter-dp"
                selected={startDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                onChange={handleChange(setStartDate)}
            />
            <DatePicker
                className="filter-dp"
                selected={endDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                onChange={handleChange(setEndDate)}
            />
            <button className="filter-btn" onClick={handleFilterClick}>
                Filter
            </button>
            <button className="filter-btn" onClick={handleClearFilterClick}>
                Clear
            </button>
        </div>
    );
};

export default AppointmentsFilter;
