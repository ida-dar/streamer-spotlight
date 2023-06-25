import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { routes } from './utils/routes';

// routes
import MainLayout from './components/layout/MainLayout/MainLayout';
import Home from './components/views/Home/Home';
import SubmissionView from './components/views/SubmissionView/SubmissionView';
import StreamerRecord from './components/views/StreamerRecord/StreamerRecord';

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
    path: routes.SUBMISSION_FORM.link,
    element: <SubmissionView />,
  },
  {
    path: routes.STREAMER_RECORDS.link,
    element: <StreamerRecord />,
  },
];

const App = () => {
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
