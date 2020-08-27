import React, { useState, useEffect } from "react";
import CreateAppointmentModal from "../../components/CreateAppointmentModal";
import {
    getAppointments,
    deleteAppointment,
} from "../../services/appointments";
import AppointmentListing from "../../components/AppointmentListing";
import "./index.css";
import AppointmentsFilter from "../../components/AppointmentsFilter";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";

const MainPage = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [appointmentList, setAppointmentList] = useState([]);
    const [editId, setEditId] = useState(0);

    const handleCreateButtonClick = () => {
        setIsOpenModal(true);
        setEditId(0);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    useEffect(() => {
        fetchAppointmentsData();
    }, []);

    const fetchAppointmentsData = async () => {
        let response = await getAppointments();
        let { data } = response;
        setAppointmentList(data);
    };

    const fetchAppointmentAction = async (id) => {
        setIsOpenModal(true);
        setEditId(id);
    };

    const deleteAppointmentAction = async (id) => {
        let response = await deleteAppointment(id);
        let { appointments } = response.data;
        NotificationManager.success("Appointment deleted", "Success");
        setAppointmentList(appointments);
    };

    const handlers = {
        editHandler: fetchAppointmentAction,
        deleteHandler: deleteAppointmentAction,
    };

    return (
        <div className="container">
            <div className="header">Appointments</div>
            <div className="actions">
                <div>
                    <button id="create-btn" onClick={handleCreateButtonClick}>
                        Create New Appointment
                    </button>
                </div>
                <AppointmentsFilter listHandler={setAppointmentList} />
            </div>
            <div className="appointments-container">
                <AppointmentListing
                    data={appointmentList}
                    handlers={handlers}
                />
            </div>

            <CreateAppointmentModal
                isOpen={isOpenModal}
                onRequestClose={handleCloseModal}
                listSetter={setAppointmentList}
                editId={editId}
            />

            <NotificationContainer />
        </div>
    );
};

export default MainPage;
