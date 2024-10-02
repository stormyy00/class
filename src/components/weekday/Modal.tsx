import React from "react";

const Modal = ({ event, setEvent }) => {
  return (
    <div className="modal fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="modal-content w-full max-w-lg rounded-lg bg-white p-5 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">{event.title}</h2>

        <div>
          <p>
            <strong>Course Name:</strong> {event.title}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Start Time:</strong>{" "}
            {new Date(event.start).toLocaleString()}
          </p>
          <p>
            <strong>End Time:</strong> {new Date(event.end).toLocaleString()}
          </p>
        </div>

        <div className="mt-4 flex justify-end">
          <button onClick={() => setEvent(null)} className="btn btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
