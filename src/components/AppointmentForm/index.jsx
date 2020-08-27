import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format, isBefore } from "date-fns";
import { isNotSunday, getIncludedTimes } from "../../utils/date-utils";
import {
    createAppoinment,
    getAppointment,
    editAppointment,
} from "../../services/appointments";
import { NotificationManager } from "react-notifications";
import "./index.css";

const AppointmentForm = ({ closeModal, setNewList, editId }) => {
    const TIME_INTERVAL = 15; // 15 minutes
    const START_HOUR = 9; // 9 am
    const END_HOUR = 17; // 5 pm
    const POST_DATE_FORMAT = "yyyy-MM-dd'T'H:mm";

    const formData = {
        name: "",
        from_date: null,
        to_date: null,
        comments: "",
    };

    const [appointmentData, setAppointmentData] = useState(formData);

    const {
        name,
        from_date: fromDate,
        to_date: toDate,
        comments,
    } = appointmentData;

    useEffect(() => {
        if (editId > 0) {
            const getAppointmentDetails = async () => {
                const response = await getAppointment(editId);
                const { data } = response;

                setAppointmentData({
                    name: data.name,
                    from_date: new Date(data.from_date),
                    to_date: new Date(data.to_date),
                    comments: data.comments,
                });
            };

            getAppointmentDetails();
        }
    }, [editId]);

    const handleDateChange = (fieldName) => (date) => {
        setAppointmentData({
            ...appointmentData,
            [fieldName]: date,
        });
    };

    const handleChange = (e) => {
        setAppointmentData({
            ...appointmentData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (name.trim() === "") {
            NotificationManager.error("Please enter patient's name", "Error");
        } else if (fromDate === null || toDate === null) {
            NotificationManager.error(
                "Please enter valid appointment dates",
                "Error"
            );
        } else if (isBefore(toDate, fromDate)) {
            NotificationManager.error("Invalid date range", "Error");
        } else {
            const formDataToSubmit = {
                name,
                from_date: format(fromDate, POST_DATE_FORMAT),
                to_date: format(toDate, POST_DATE_FORMAT),
                comments,
            };
            let response;

            if (editId > 0) {
                try {
                    response = await editAppointment(editId, formDataToSubmit);
                    NotificationManager.success(
                        "Appointment edited",
                        "Success"
                    );

                    let { data } = response;
                    let { appointments } = data;

                    setNewList(appointments);
                } catch ({ response }) {
                    let message = response.data.error;
                    NotificationManager.error(message, "Error");
                } finally {
                    closeModal();
                }
            } else {
                try {
                    response = await createAppoinment(formDataToSubmit);
                    NotificationManager.success(
                        "Appointment created",
                        "Success"
                    );

                    let { data } = response;
                    let { appointments } = data;

                    setNewList(appointments);
                } catch ({ response }) {
                    let message = response.data.error;
                    NotificationManager.error(message, "Error");
                } finally {
                    closeModal();
                }
            }
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="form-group">
                <div className="form-label">Patient's Name</div>
                <div className="form-element">
                    <input
                        type="text"
                        className="form-input"
                        value={name}
                        onChange={handleChange}
                        name="name"
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="form-label">From</div>
                <div className="form-element">
                    <DatePicker
                        selected={fromDate}
                        onChange={handleDateChange("from_date")}
                        selectsStart
                        startDate={fromDate}
                        endDate={toDate}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeIntervals={TIME_INTERVAL}
                        filterDate={isNotSunday}
                        includeTimes={getIncludedTimes(
                            TIME_INTERVAL,
                            START_HOUR,
                            END_HOUR
                        )}
                        className="form-dp"
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="form-label">To</div>
                <div className="form-element">
                    <DatePicker
                        selected={toDate}
                        onChange={handleDateChange("to_date")}
                        selectsEnd
                        startDate={fromDate}
                        endDate={toDate}
                        minDate={fromDate}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeIntervals={TIME_INTERVAL}
                        filterDate={isNotSunday}
                        includeTimes={getIncludedTimes(
                            TIME_INTERVAL,
                            START_HOUR,
                            END_HOUR
                        )}
                        className="form-dp"
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="form-label">Comments</div>
                <div className="form-element">
                    <textarea
                        onChange={handleChange}
                        value={comments}
                        name="comments"
                    ></textarea>
                </div>
            </div>

            <div className="form-group btn-holder">
                <button id="submit" className="form-btn">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default AppointmentForm;
