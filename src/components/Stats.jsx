import React, { useEffect, useState } from 'react';
import { FaAmazonPay, FaApplePay } from 'react-icons/fa';

const Stats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([{
      id: 1,
      icon: <FaAmazonPay size={50} />,
      title: "Inward",
      value: 500000,
      flow: "increase",
      flowValue: "7.4%"
    },
    {
      id: 2,
      icon: <FaApplePay size={50} />,
      title: "Outward",
      value: 45005,
      flow: "decrease",
      flowValue: "3.4%"
    }
  ]);
  }, []);

  const colors = {
  decrease: "text-[#ef4444]",
  increase: "text-[#16a34a]",
};


  return (
    <React.Fragment>
    <div className="flex">
      {data.map(data => {
        return <div key={data.id} class='grid grid-flow-col grid-rows-2 gap-3 rounded-lg overflow-hidden shadow-lg w-1/2 mr-2'>
          <div class='row-span-2 flex items-center m-2'>
            <div className="bg-purple-600 p-2 rounded-md">
              {data.icon}
            </div>
          </div>
          <div class="col-span-2 text-[#737373] place-content-end font-bold font-sans">{data.title}</div>
          <div class="col-span-2 row-span-1 text-[#d4d4d4] grid grid-flow-col grid-rows-1 gap-4">
            <div class='row-span-1 text-2xl font-bold text-gray-800 mb-2'>
              {data.value}
            </div>
            <div class={`col-span-2 ${colors[data.flow]} font-bold place-content-center`}>
              {`${(data.flow === "increase") ? '↑' : '↓'} ${data.flowValue}`}
            </div>
          </div>
        </div>
      })}
    </div>
    </React.Fragment>
  )
}

export default Stats