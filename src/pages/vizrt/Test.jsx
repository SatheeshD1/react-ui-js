import React, { useState } from 'react';
import PartyCircle from './PartyCircle'; // Assuming PartyCircle.js in the same directory

function Test() {
  const [partyRowsCount, setPartyRowsCount] = useState(4); // Default to 4 rows as in the image
  const [fixedSeatsTop, setFixedSeatsTop] = useState('00'); // State for the editable yellow fixed seats
  const [isFixedSeatsTopEditing, setIsFixedSeatsTopEditing] = useState(false); // State for editing mode

  const [partyData, setPartyData] = useState(
    Array(partyRowsCount).fill(null).map((_, rowIndex) => ({
      id: rowIndex,
      parties: [
        { name: 'LDF', seats: '00', color: 'red-500' },
        { name: 'UDF', seats: '00', color: 'blue-500' },
        { name: 'NDA', seats: '00', color: 'orange-500' },
        { name: 'OTH', seats: '00', color: 'purple-500' },
      ],
    }))
  );

  const handlePartyRowsChange = (e) => {
    const newCount = parseInt(e.target.value, 10);
    if (!isNaN(newCount) && newCount >= 0) {
      setPartyRowsCount(newCount);
      // Adjust partyData array based on newCount
      setPartyData(prevData => {
        const newData = [...prevData];
        if (newCount > prevData.length) {
          // Add new rows
          for (let i = prevData.length; i < newCount; i++) {
            newData.push({
              id: i,
              parties: [
                { name: 'LDF', seats: '00', color: 'red-500' },
                { name: 'UDF', seats: '00', color: 'blue-500' },
                { name: 'NDA', seats: '00', color: 'orange-500' },
                { name: 'OTH', seats: '00', color: 'purple-500' },
              ],
            });
          }
        } else if (newCount < prevData.length) {
          // Remove excess rows
          newData.splice(newCount);
        }
        return newData;
      });
    }
  };

  const updatePartyInfo = (rowIndex, partyIndex, field, value) => {
    setPartyData(prevData => {
      const newData = [...prevData];
      newData[rowIndex].parties[partyIndex][field] = value;
      return newData;
    });
  };

  const handleFixedSeatsTopChange = (e) => {
    setFixedSeatsTop(e.target.value);
  };

  const handleFixedSeatsTopBlur = () => {
    setIsFixedSeatsTopEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      {/* Header for PARTY ROWS */}
      <div className="flex items-center space-x-2 mb-8 bg-pink-600 p-2 rounded-md">
        <h1 className="text-white text-lg font-bold">PARTY ROWS</h1>
        <input
          type="number"
          value={partyRowsCount}
          onChange={handlePartyRowsChange}
          className="w-16 p-1 text-center rounded bg-white text-pink-600 font-semibold"
          min="0"
        />
      </div>

      <div className="flex flex-col space-y-6">
        {/* Fixed Seats Circle */}
        <div className="flex items-center space-x-8">
          <div className="relative w-40 h-40 bg-blue-700 rounded-full flex flex-col justify-center items-center shadow-lg">
            <span className="text-white text-sm absolute top-4">FIXED</span>
            <span className="text-white text-sm absolute top-8">SEATS</span>
            <div className="flex flex-col items-center mt-4">
              {isFixedSeatsTopEditing ? (
                <input
                  type="text" // Use text type to allow '00' formatting, and handle numeric validation if needed
                  value={fixedSeatsTop}
                  onChange={handleFixedSeatsTopChange}
                  onBlur={handleFixedSeatsTopBlur}
                  autoFocus
                  className="text-yellow-400 text-3xl font-bold text-center w-20 bg-transparent border-none focus:outline-none"
                />
              ) : (
                <span
                  className="text-yellow-400 text-3xl font-bold cursor-pointer"
                  onClick={() => setIsFixedSeatsTopEditing(true)}
                >
                  {fixedSeatsTop}
                </span>
              )}
              <div className="border-t border-gray-300 w-16 my-1"></div>
              <span className="text-white text-3xl font-bold">00</span> {/* This one remains static */}
            </div>
          </div>

          {/* Party Circles Row 0 (initial) */}
          <div className="flex space-x-8">
            {partyData && partyData[0].parties.map((party, partyIdx) => ( // Access the first row of partyData
              <PartyCircle
                key={partyIdx}
                name={party.name}
                seats={party.seats}
                color={party.color}
                onNameChange={(value) => updatePartyInfo(0, partyIdx, 'name', value)}
                onSeatsChange={(value) => updatePartyInfo(0, partyIdx, 'seats', value)}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Party Rows */}
        {partyRowsCount > 1 && (
          <div className="flex flex-col space-y-6">
            {partyData.slice(1).map((rowData, rowIndex) => (
              <div key={rowData.id} className="flex justify-center space-x-8">
                {rowData.parties.map((party, partyIdx) => (
                  <PartyCircle
                    key={partyIdx}
                    name={party.name}
                    seats={party.seats}
                    color={party.color}
                    onNameChange={(value) => updatePartyInfo(rowIndex + 1, partyIdx, 'name', value)}
                    onSeatsChange={(value) => updatePartyInfo(rowIndex + 1, partyIdx, 'seats', value)}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Test;

