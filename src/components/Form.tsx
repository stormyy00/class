"use client";
import { useState } from "react";

const Form = ({ onSubmit }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    onSubmit({ startTime, endTime, dayOfWeek, location });
  };

  return (
    <div className="flex w-full  items-center bg-blue-100">
      <div>
        <input
          type="time"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>

      <input
        type="text"
        placeholder="Day of Week"
        value={dayOfWeek}
        onChange={(e) => setDayOfWeek(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <button type="button" onClick={handleSubmit}>
        Add Information
      </button>
    </div>
  );
};

export default Form;
