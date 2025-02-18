import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './pages/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Router />
      <ToastContainer 
        position="bottom-right"
        autoClose={8000}
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
        style={{ width: "90%", maxWidth: "400px" }} 
      /> 
    </BrowserRouter>
  );
}

export default App;
