import React from "react";
import Modal from "react-modal";
import AppointmentForm from "../AppointmentForm";
import "./index.css";

const CreateAppointmentModal = (props) => {
    const { isOpen, onRequestClose, listSetter, editId } = props;

    const getHeader = () => {
        if (editId > 0) {
            return "Edit Appointment";
        } else {
            return "Create an Appointment";
        }
    };

    const modalStyles = {
        content: {
            width: "50%",
            position: "fixed",
            margin: "auto",
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={modalStyles}
        >
            <div className="modal-header">{getHeader()}</div>
            <AppointmentForm
                closeModal={onRequestClose}
                setNewList={listSetter}
                editId={editId}
            />
        </Modal>
    );
};

export default CreateAppointmentModal;
