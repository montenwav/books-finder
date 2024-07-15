import './css/index.css';
import './css/BookPage.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Main from './pages/Main.tsx';
import BookPage from './pages/BookPage.tsx';

import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './Reducer.tsx';
import { getKey } from './getKey.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'books/works/:bookPage',
        element: <BookPage />,
        loader: getKey,
      },
      {
        path: '/',
        element: <Main />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
