import React, { useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setData,setStreamData } from '../actions/actions';

const countryCodes = [
  { code: '', name: 'Select Code' },
  { code: 'US', name: 'US' },
  { code: 'CA', name: 'CA' },
  { code: 'GB', name: 'GB' },
  { code: 'AU', name: 'AU' },
  { code: 'DE', name: 'DE' },
  { code: 'IN', name: 'IN' },
  { code: 'JP', name: 'JP' },
];

const EmployeeSearchForm = () => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useState({
    empId: '',
    firstName: '',
    lastName: '',
    ctryCd: '',
  });

  const SEARCH_DATA = gql`
  query SEARCH_DATA($employee: EmployeeInput!) {
    search(employee: $employee) {
      empId
      firstName
      lastName
      ctryCd
    }
  }
`;

  const [
    search,
    { loading, error, data }
  ] = useLazyQuery(SEARCH_DATA);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('Searching with:', searchParams);
    const variables = {
      "employee": searchParams
    };
    const result = await search({ variables });
    console.log("result", result.data.search);
    dispatch(setData(result.data.search));
    // Add your search logic here, e.g., an API call.
  };

  const handleSearchStream = async (e) => {
    e.preventDefault();
    console.log('Searching with:', searchParams);

    const variables = {
        "employee": searchParams
    };

    // The subscription query string
    const query = `
        subscription SEARCH_STREAM($employee: EmployeeInput!) {
            searchStream(employee: $employee) {
                empId
                firstName
                lastName
                ctryCd
            }
        }
    `;

    fetch('http://localhost:8080/graphql', { // Use the correct SSE endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream', // Crucial header for SSE
        },
        body: JSON.stringify({ query, variables }), // Send query and variables at the top level
    })
    .then(response => {
        // ... (rest of your stream handling logic)
        // Note: The SSE parsing logic may need adjustment based on how Spring formats the events.
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');

        function readStream() {
            reader.read().then(({ done, value }) => {
                if (done) {
                    console.log('Stream complete.');
                    return;
                }
                const chunk = decoder.decode(value, { stream: true });
                chunk.split('\n\n').forEach(event => {
                    if (event.trim()) {
                        try {
                            const eventData = JSON.parse(event.split('data:')[1]);
                            console.log('Received event:', eventData.data.searchStream);
                            dispatch(setStreamData(eventData.data.searchStream));
                        } catch (e) {
                            console.error('Failed to parse SSE event:', e);
                        }
                    }
                });
                readStream();
            });
        }
        readStream();
    }).catch(error => console.error('Error:', error));
  };

  return (
    <form
      className="mx-auto"
      onSubmit={handleSearchStream}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Employee ID (Number Search) */}
        <div className="flex flex-col">
          <label htmlFor="empId" className="text-sm font-medium text-gray-700 mb-1">
            Employee ID
          </label>
          <input
            type="number"
            id="empId"
            name="empId"
            value={searchParams.empId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter numeric ID"
          />
        </div>

        {/* First Name */}
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={searchParams.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter first name"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={searchParams.lastName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter last name"
          />
        </div>

        {/* Country Code (Dropdown) */}
        <div className="flex flex-col">
          <label htmlFor="ctryCd" className="text-sm font-medium text-gray-700 mb-1">
            Country Code
          </label>
          <select
            id="ctryCd"
            name="ctryCd"
            value={searchParams.ctryCd}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default EmployeeSearchForm;
