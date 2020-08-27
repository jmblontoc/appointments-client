import axios from "axios";

const API_URL = "http://localhost:8000/api/appointments/";

export const getAppointments = (params = {}) => {
    return axios.get(API_URL, { params });
};

export const createAppoinment = (formData) => {
    return axios.post(API_URL, formData);
};

export const getAppointment = (id) => {
    const endpoint = API_URL + id + "/";
    return axios.get(endpoint);
};

export const editAppointment = (id, formData) => {
    const endpoint = API_URL + id + "/";
    return axios.put(endpoint, formData);
};

export const deleteAppointment = (id) => {
    const endpoint = API_URL + id + "/";
    return axios.delete(endpoint);
};
