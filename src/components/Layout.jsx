import React from 'react';
import MyTerminal from './MyTerminal';
import { ReactTerminal } from 'react-terminal';
import DataTable from './DataTable';
import TabBar from './TabBar';
import StatsDashboard from './StatsDashboard';
import Stats from './Stats';

const Layout = () => {
  return (
    <div class='grid grid-rows-2 grid-cols-1 gap-4 h-screen md:grid-cols-2'>
      <div class='bg-[#f87171] p-2 rounded text-white rounded-lg overflow-hidden shadow-lg bg-white'>
        <Stats />
        {/* <StatsDashboard/>  */}
      </div>
      <div class='bg-[#fbbf24] p-2 rounded text-white rounded-lg overflow-hidden shadow-lg bg-white'>
        {/* <ReactTerminal/> */}
        <TabBar />
      </div>
      <div class='bg-[#a3e635] p-2 rounded text-white rounded-lg overflow-hidden shadow-lg bg-white'>
        <DataTable />
      </div>
      <div class='bg-[#f472b6] p-2 rounded text-white rounded-lg overflow-hidden shadow-lg bg-white bg-[linear-gradient(to_right,#5B86E5,#36D1DC)]'>
        {/* bg-[linear-gradient(to_right,#5B86E5,#36D1DC)] */}
        <MyTerminal />
      </div>
    </div>
  )
}

export default Layout