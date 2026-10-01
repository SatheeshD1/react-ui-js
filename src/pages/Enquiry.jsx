import React from 'react';
import Accordion from '../components/common/Accordion';
import EmployeeSearchForm from './EmployeeSearchForm';
import DataTable from '../components/DataTable';

const Enquiry = () => {
  return (
    <React.Fragment>
      <Accordion
        title="Employee Search"
        content={<EmployeeSearchForm />}
      />
      <div className='h-[calc(100vh-350px)]'>
        <DataTable />
      </div>
    </React.Fragment>
  )
}

export default Enquiry