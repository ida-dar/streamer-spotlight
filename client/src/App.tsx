import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// redux
import { fetchStreamers } from './redux/streamers/streamersRedux';
import { useAppDispatch } from './redux/reduxUtils/hooks';

import { routes, singleViewRoutes } from './utils/routes';

// routes
import MainLayout from './components/layout/MainLayout/MainLayout';
import Home from './components/views/Home/Home';
import StreamerRecords from './components/views/StreamersView/StreamersView';
import StreamerDetails from './components/views/StreamerDetails/StreamerDetails';

interface RoutesInterface {
  path: string;
  element: JSX.Element;
}

const routing: RoutesInterface[] = [
  {
    path: routes.HOME.link,
    element: <Home />,
  },
  {
    path: routes.STREAMER_RECORDS.link,
    element: <StreamerRecords />,
  },
  {
    path: singleViewRoutes.STREAMER_DETAILS.link,
    element: <StreamerDetails />,
  },
];

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStreamers());
  }, [dispatch]);

  useEffect(() => {
    // update streamers every 20 minutes
    setInterval(() => {
      dispatch(fetchStreamers());
    }, 60 * 20 * 1000);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {routing.map((route) => (
            <Route key={route.path} path={`${process.env.PUBLIC_URL}${route.path}`} element={route.element} />
          ))}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
