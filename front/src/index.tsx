import ReactDOM from 'react-dom/client';
import './assets/css/board.module.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router';
import { router } from './router/router';
import './assets/css/bootstrap.css';
import { RecoilRoot } from 'recoil';
import {CookiesProvider} from 'react-cookie'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <CookiesProvider>
    <RecoilRoot>
      <RouterProvider router = {router}></RouterProvider>
    </RecoilRoot>
  </CookiesProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
