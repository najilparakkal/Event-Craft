import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './app/store.ts'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import SocketProvider from './API/services/outer/SocketProvider.tsx';

Modal.setAppElement('#root');
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>

      <SocketProvider>
        <ToastContainer />
          <App />
      </SocketProvider>

    </Provider>
  </BrowserRouter>

  // </React.StrictMode>,
)
