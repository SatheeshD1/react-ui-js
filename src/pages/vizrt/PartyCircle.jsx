import React, { useState } from 'react';

const PartyCircle = ({ name, seats, status, color, onNameChange, onSeatsChange }) => {
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isSeatsEditing, setIsSeatsEditing] = useState(false);

  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };

  const handleSeatsChange = (e) => {
    onSeatsChange(e.target.value);
  };

  const handleNameBlur = () => {
    setIsNameEditing(false);
  };

  const handleSeatsBlur = () => {
    setIsSeatsEditing(false);
  };

  return (
    <div className={`w-40 h-40 bg-white rounded-full flex flex-col justify-center items-center shadow-lg border-2 border-${color}`}>
      {isNameEditing ? (
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          autoFocus
          className={`text-${color} text-2xl font-bold text-center w-24`}
        />
      ) : (
        <span
          className={`text-${color} text-2xl font-bold cursor-pointer`}
          onClick={() => setIsNameEditing(true)}
        >
          {name}
        </span>
      )}
      {isSeatsEditing ? (
        <input
          type="text"
          value={seats}
          onChange={handleSeatsChange}
          onBlur={handleSeatsBlur}
          autoFocus
          className={`text-${color} text-4xl font-bold text-center w-24 mt-2`}
        />
      ) : (
        <span
          className={`text-${color} text-6xl font-bold cursor-pointer`}
          onClick={() => setIsSeatsEditing(true)}
        >
          {seats}
        </span>
      )}
      <span className={`text-xl font-bold text-${(status==="NONE")?"blue-800":(status==="LEAD") ? "green-500":"red-500"} mt-1`}>{status}</span>
    </div>
  );
};

export default PartyCircle;
