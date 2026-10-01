import React, { useEffect, useState } from 'react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useQuery, gql } from '@apollo/client';
import { useSelector } from 'react-redux';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const DataTable = () => {

    const searchData = useSelector((state) => state.search.data);

    useEffect(() => {
        console.table(searchData);
    }, [searchData])
    

    const GET_DATA = gql`query GET_DATA {
            getLimited(limit: 100) {
                empId
                firstName
                lastName
                ctryCd
            }
         }`

    const { loading, error, data } = useQuery(GET_DATA);

    console.log(data?.getLimited);

    const [rowData, setRowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    const [colDefs, setColDefs] = useState([
        { field: "empId" },
        { field: "firstName" },
        { field: "lastName" },
        { field: "ctryCd" }
    ]);

    useEffect(() => {
            setRowData(data?.getLimited);
    }, [data])


    if (loading) return <p>Loading...</p>;
    return (
        <div className='h-full'>
            <AgGridReact
                rowData={searchData.length>0?searchData:rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}

export default DataTable