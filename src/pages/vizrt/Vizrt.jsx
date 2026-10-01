import React, { useState, useEffect } from 'react';
// import Party from './Party';
import PartyCircle from './PartyCircle';

const Vizrt = () => {
  const [isOnAir, setIsOnAir] = useState(false);
  const [bottomTally, setBottomTally] = useState('BOTTOM TALLY');
  const [xmlPath, setXmlPath] = useState('');
  const [header, setHeader] = useState('');
  const [fixedSeats, setFixedSeats] = useState('00');
  const [leadTotals, setLeadTotals] = useState('00');

  const [partyRowsCount, setPartyRowsCount] = useState(4); // Default to 4 rows as in the image
  const [fixedSeatsTop, setFixedSeatsTop] = useState('00'); // State for the editable yellow fixed seats
  const [isFixedSeatsTopEditing, setIsFixedSeatsTopEditing] = useState(false); // State for editing mode

  const [parties, setParties] = useState([
    { id: 1, votes: '00', status: 'NONE', color: 'red-500', name: 'PARTY' },
    { id: 2, votes: '00', status: 'NONE', color: 'blue-500', name: 'PARTY' },
    { id: 3, votes: '00', status: 'NONE', color: 'orange-500', name: 'PARTY' },
    { id: 4, votes: '00', status: 'NONE', color: 'purple-500', name: 'PARTY' }
  ]);

  const handleOnAirClick = () => {
    setIsOnAir(!isOnAir);
    createAndDownloadXml();
  };

  const updatePartyVotes = (id, newVotes) => {
    setParties(parties.map(party =>
      party.id === id ? { ...party, votes: parseInt(newVotes) || 0 } : party
    ));
  };

  const generateXmlString = () => {
    let xmlString = `<?xml version='1.0' encoding='UTF-8' standalone='no'?>
<APP>
`;
    parties.forEach(party => {
      xmlString += `  <EACH>
    <PARTY>${party.name}</PARTY>
    <SEATS>${party.votes}</SEATS>
    <STATUS>${party.status}</STATUS>
  </EACH>
`;
    });

    xmlString += `  <EACH>
    <HEADER>${header}</HEADER>
    <FIXED_TOTAL>${fixedSeatsTop}</FIXED_TOTAL>
    <LEAD_TOTAL>${leadTotals}</LEAD_TOTAL>
  </EACH>
</APP>`;
    return xmlString;
  };

  const createAndDownloadXml = async () => {
    const xmlString = generateXmlString();
    const blob = new Blob([xmlString], { type: 'text/xml' });

    try {
      const response = await fetch('http://localhost:3001/api/save-xml', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
        },
        body: JSON.stringify({ "xmlData": xmlString, "xmlPath": xmlPath })
      });

      // if (response.ok) {
      //   alert('File sent to server and saved successfully!');
      // } else {
      //   const errorText = await response.text();
      //   throw new Error(`Server responded with an error: ${errorText}`);
      // }
    } catch (error) {
      console.error('Failed to send XML to server:', error);
      alert('Failed to save file. Check console for details.');
    }
  };

  const handlePartyRowsChange = (e) => {
    if (parseInt(e.target.value) < parseInt(e.target.min) ||
      parseInt(e.target.value) > parseInt(e.target.max)) {
      return;
    }
    const newCount = parseInt(e.target.value, 10);
    if (!isNaN(newCount) && newCount >= 0) {
      setPartyRowsCount(newCount);
      // Adjust partyData array based on newCount
      setParties(prevData => {
        const newData = [...prevData];
        if (newCount > prevData.length) {
          // Add new rows
          for (let i = prevData.length; i < newCount; i++) {
            newData.push({
              id: i,
              name: 'PARTY',
              votes: '00',
              status: "NONE",
              color: 'red-500',
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

  const updatePartyInfo = (rowIndex, field, value) => {
    setParties(prevData => {
      const newData = [...prevData];
      newData[rowIndex][field] = value;

      const maxVotes = Math.max(...newData.map(party => Number(party.votes)));
      if (maxVotes <= 0) {
        return newData.map(party => ({ ...party, status: "TRIAL" }));
      }
      const updatedParties = newData.map(party => {
        const votesAsNumber = Number(party.votes);
        if (votesAsNumber === maxVotes) {
          return { ...party, status: "LEAD" };
        } else {
          return { ...party, status: "TRIAL" };
        }
      });
      return updatedParties;
    });
  };

  useEffect(() => {
    let sum = parties.reduce((accumulator, currentValue) => {
      return accumulator + Number(currentValue.votes);
    }, 0);
    if (sum === 0) {
      sum = "00";
    }
    setLeadTotals(sum);
  }, [parties]);


  const handleFixedSeatsTopChange = (e) => {
    setFixedSeatsTop(e.target.value);
  };

  const handleFixedSeatsTopBlur = () => {
    setIsFixedSeatsTopEditing(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full"></div>
              </div>
              <div className="absolute -top-2 -right-1 w-4 h-4 bg-orange-500 transform rotate-45"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                <span className="text-orange-500">The </span>
                <span className="text-cyan-400">VizRt Time</span>
              </h1>
              <p className="text-orange-500 text-sm font-medium">Online News & Sports Graphics Solutions</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-700">Sibi Raj</h2>
            <p className="text-blue-600 text-sm">International VizRt Graphics Designer & Animator & Scripter</p>
            <p className="text-orange-500 font-semibold">+91 9047991333</p>
            <p className="text-orange-500">rajvizrt@gmail.com</p>
            <p className="text-blue-600">India</p>
          </div>

          {/* ON AIR Button */}
          <div className="text-center">
            <button
              onClick={handleOnAirClick}
              className={`w-32 h-32 rounded-full font-bold text-xl transition-all duration-300 ${isOnAir
                ? 'bg-red-500 text-white shadow-lg shadow-red-300 animate-pulse'
                : 'bg-green-400 text-black shadow-lg hover:shadow-xl'
                }`}
            >
              <div className="text-xl mb-1">
                {isOnAir ? 'OFF' : 'ON'}
              </div>
              <div className="text-4xl font-black">
                {isOnAir ? 'AIR' : 'AIR'}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Configuration Section */}
      <div className="bg-white rounded-lg shadow-lg p-10">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="space-y-4 pl-24 pr-24">
            <div className="flex items-center space-x-4">
              <label className="text-white font-bold text-lg w-32">TALLY TYPE</label>
              <input
                type="text"
                value={bottomTally}
                onChange={(e) => setBottomTally(e.target.value)}
                className="flex-1 p-2 border-hidden border-gray-300 rounded bg-blue-800 font-bold text-white max-w-fit text-2xl text-center"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-pink-600 font-bold text-lg w-32">XML PATH</label>
              <input
                type="text"
                value={xmlPath}
                onChange={(e) => setXmlPath(e.target.value)}
                className="flex-1 p-2 border-2 border-gray-300 rounded text-blue-600 font-mono"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-pink-600 font-bold text-lg w-32">HEADER</label>
              <input
                type="text"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                className="flex-1 p-2 border-2 border-gray-300 rounded text-blue-600 font-semibold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <Party /> */}


      <div className="p-8 flex flex-col items-center">
        {/* Header for PARTY ROWS */}
        <div className="flex items-center space-x-2 mb-8 bg-pink-600 p-2 rounded-md">
          <h1 className="text-white text-lg font-bold">PARTY ROWS</h1>
          <input
            type="number"
            value={partyRowsCount}
            onChange={handlePartyRowsChange}
            className="w-16 p-1 text-center rounded bg-white text-pink-600 font-semibold"
            min="0" max="5"
          />
        </div>

        <div className="flex flex-col space-y-6">
          {/* Fixed Seats Circle */}
          <div className="flex items-center space-x-8">
            <div className="relative w-40 h-40 bg-blue-700 rounded-full flex flex-col justify-center items-center shadow-lg">
              <span className="text-white text-4xl font-bold mt-4">{leadTotals}</span>
              <div className="border-t-4 border-white w-full my-1"></div>
              <span className="text-white font-bold">FIXED SEATS</span>
              {/* <span className="text-white absolute top-8 font-bold">SEATS</span> */}
              <div className="flex flex-col items-center">
                {isFixedSeatsTopEditing ? (
                  <input
                    type="text" // Use text type to allow '00' formatting, and handle numeric validation if needed
                    value={fixedSeatsTop}
                    onChange={handleFixedSeatsTopChange}
                    onBlur={handleFixedSeatsTopBlur}
                    autoFocus
                    className="text-yellow-300 text-4xl font-bold text-center w-20 bg-transparent border-none focus:outline-none"
                  />
                ) : (
                  <span
                    className="text-yellow-300 text-4xl font-bold cursor-pointer"
                    onClick={() => setIsFixedSeatsTopEditing(true)}
                  >
                    {fixedSeatsTop}
                  </span>
                )}

              </div>
            </div>

            {/* Party Circles Row 0 (initial) */}
            <div className="flex space-x-8">
              {parties && parties.map((party, partyIdx) => (
                <PartyCircle
                  key={party.id}
                  name={party.name}
                  seats={party.votes}
                  status={party.status}
                  color={party.color}
                  onNameChange={(value) => updatePartyInfo(partyIdx, 'name', value)}
                  onSeatsChange={(value) => updatePartyInfo(partyIdx, 'votes', value)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>




      {/* Status Display */}
      {isOnAir && (
        <>
          <div className="fixed top-4 right-4 z-50">
            <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold animate-pulse flex items-center space-x-2"
              style={{
                filter: 'drop-shadow(0 0 10px #ef4444) drop-shadow(0 0 20px #ef4444)',
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)'
              }}>
              <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
              <span>🔴 OFF AIR</span>
            </div>
          </div>

          {/* Success Message */}
          <div className="fixed bottom-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
            <div className="font-bold">✅ XML File Generated!</div>
            <div className="text-sm">📁 Saved as: {xmlPath}</div>
            <div className="text-xs opacity-90">📍 Location: {xmlPath || 'Downloads folder'}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Vizrt;