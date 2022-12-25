import { createBrowserRouter } from 'react-router-dom';
import App from '../App'
import Board from '../page/Board';

export const router = createBrowserRouter(
    [
      {
        path : '/',
        element : <Board/>,
      },
    ]
  );

  