import './App.css';
import DataTable from './components/DataTable';
import Layout from './components/Layout';
import MiniDrawer from './components/MiniDrawer';
import AppRouter from './routers/AppRouter';

function App() {
  return (
    // <div className='grid place-content-center'>
    <div>
      {/* <h1 className="text-3xl text-center text-blue-400">Data </h1>
      <div className='w-screen h-10 bg-lime-300'>
        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center float-right">
          <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
          <span>Download</span>
        </button>
      </div>
      <DataTable /> */}
      {/* <Layout /> */}
      <AppRouter/>
    </div>
  );
}

export default App;
