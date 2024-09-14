import React from "react";
import { useState } from "react";

const Create = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [location, setLocation] = useState("");
  return (
    <div className="my-auto flex w-full justify-center">
      <div className="flex w-full flex-col items-center text-center">
        <div className="text-3xl font-semibold">Dont see your class ? </div>

        <div className="text-3xl font-normal">Create class here </div>
        <div className="mt-4 flex w-full justify-center gap-10">
          <div>Enter Course Name__</div>
          <div>Enter Course Code__</div>
          <div>Enter Description __ (Optional)</div>
          <div>Enter Credits __ </div>
        </div>
        <div className="my-10 flex">
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
          {/* <button type="button" onClick={handleSubmit}>
        Add Information
      </button> */}
        </div>
      </div>
    </div>
  );
};

export default Create;
