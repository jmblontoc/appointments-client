import React from "react";
import { formatDate } from "../../utils/date-utils";
import "./index.css";

const AppointmentListing = ({ data, handlers }) => {
    const { editHandler, deleteHandler } = handlers;

    const handleEditClick = (id) => () => {
        editHandler(id);
    };

    const handleDeleteClick = (id) => async () => {
        deleteHandler(id);
    };

    if (data.length === 0) {
        return <div className="empty-listing">There are no appointments</div>;
    } else {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Comments</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{formatDate(item.from_date)}</td>
                            <td>{formatDate(item.to_date)}</td>
                            <td className="td-comments" title={item.comments}>
                                {item.comments}
                            </td>
                            <td>
                                <button
                                    className="edit-btn table-btn"
                                    onClick={handleEditClick(item.id)}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    className="delete-btn table-btn"
                                    onClick={handleDeleteClick(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
};

export default AppointmentListing;
