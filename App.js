import React, { Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Body from './Src/Components/Body';
import Header from './Src/Components/Header';
import About from './Src/Components/About';
import Contact from './Src/Components/Contact';
import Error from './Src/Components/Error';
import Cart from './Src/Components/Cart';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import RestaurantMenu from './Src/Components/RestaurantMenu';
import { lazy } from 'react';
import userContext from './Src/Components/Utils/UserContext';
import { Provider } from 'react-redux';
import appStore from './Src/Components/Utils/appStore';
const Grocery = lazy(() => import('./Src/Components/Grocery'));

const AppLayout = () => {
  const [userName, setUserName] = useState();
  useEffect(() => {
    const data = {
      name: 'Varsha',
    };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <userContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className='app'>
          <Header />
          <Outlet />
        </div>
      </userContext.Provider>
    </Provider>
  );
};
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/grocery',
        element: (
          <Suspense>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: '/restaurants/:resId',
        element: <RestaurantMenu />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
