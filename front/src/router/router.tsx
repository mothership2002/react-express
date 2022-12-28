import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Board from '../page/Board';
import Content from '../page/Content';
// import Post from '../page/component/Post';
// import Reply from '../page/component/Reply';

export const router = createBrowserRouter(
    [
      {
        path : '/',
        element : <Board />,
      },
      {
        path: 'post',
        children: [
          {
            path: ':no',
            element: <Content/>,
          }
        ],
      },
    ]
  );

  