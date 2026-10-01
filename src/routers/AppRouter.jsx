import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import MiniDrawer from '../components/MiniDrawer';
import Enquiry from '../pages/Enquiry';
import {PayNowButton} from '../components/PayNowButton';
import { v4 as uuidv4 } from 'uuid';
import Reports from '../pages/reports/Reports';
import ExcelDownloadComponent from '../components/ExcelDownloadComponent';
import Vizrt from '../pages/vizrt/Vizrt';
// import truecallerjs, { SearchData, Format } from "truecallerjs";

// async function performTruecallerSearch(){
//   const searchData = {
//     number: "9659363434",
//     countryCode: "IN",
//     installationId: "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
//   };

//   try {
//     const response = await truecallerjs.search(searchData);
//     console.log(response.json());

//     // Additional response methods:
//     // console.log(response.xml());
//     // console.log(response.yaml());
//     // console.log(response.text());

//     // Example of available data from the response:
//     console.log(response.getName()); // "Sumith Emmadi"
//     console.log(response.getAlternateName()); // "sumith"
//     console.log(response.getAddresses()); // {....}
//     console.log(response.getEmailId()); // example@domain.com
//     console.log(response.getCountryDetails()); // {...}
//   } catch (error) {
//     console.error("Error occurred:", error);
//   }
// }

const Tab2 = () => {
    return <React.Fragment>
        <button onClick={() => {
            alert("test");
            // performTruecallerSearch();
        }}>Tab2</button>
    </React.Fragment>;
}

const Tab3 = () => {
    return <React.Fragment>
        <h1>Tab3</h1>
    </React.Fragment>;
}


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MiniDrawer />} >
                    <Route path="dashboard" element={<Layout/>} >
                        <Route index path="tab-1" element={<PayNowButton idempotencyKey={uuidv4()} />} />
                        <Route path="tab-2" element={<Tab2 />} />
                        <Route path="tab-3" element={<Tab3 />} />
                    </Route>
                    <Route path="search" element={<Enquiry/>} />
                    <Route path="reports" element={<Reports/>} >
                        <Route path="reports" element={<ExcelDownloadComponent />} />
                        <Route path="templates" element={<Tab2 />} />
                        <Route path="schedules" element={<Tab3 />} />
                    </Route>
                    <Route path="vizrt" element={<Vizrt/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter