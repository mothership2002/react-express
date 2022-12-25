import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Board from '../page/Board';
import Post from '../page/Post';

export const router = createBrowserRouter(
    [
      {
        path : '/',
        element : <Board/>,
      },
      {
        path: 'post',
        children: [
          {
            path: ':no',
            element: <Post/>,
          }
        ],
      },
    ]
  );

  