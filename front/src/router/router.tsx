import { createBrowserRouter } from 'react-router-dom';
import AccountAdd from '../page/component/AccountAdd';
import Content from '../page/Content';
import Main from '../page/Main';
// import Post from '../page/component/Post';
// import Reply from '../page/component/Reply';

export const router = createBrowserRouter(
    [
      {
        path : '/',
        element : <Main />,
      },
      // {
      //   path: 'post',
      //   children: [
      //     {
      //       path: ':no',
      //       element: <Content/>,
      //     }
      //   ],
      // },
      {
        path : 'account-add',
        element : <AccountAdd />,
      },
    ]
  );

  