import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

const SingleComicLayout = lazy(() =>
  import('../pages/singleComicLayout/SingleComicLayout')
);
const SingleCharacterLayout = lazy(() =>
  import('../pages/singleCharacterLayout/SingleCharacterLayout')
);
const SinglePage = lazy(() => import('../pages/SinglePage'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const Page404 = lazy(() => import('../pages/404'));

const App = () => {
  return (
    <Router>
      <div className='app'>
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path='/' element={<MainPage />}></Route>
              <Route path='/comics' element={<ComicsPage />}></Route>
              <Route
                path='/comics/:id'
                element={<SinglePage Component={SingleComicLayout} dataType='comic' />}
              ></Route>
              <Route
                path='/characters/:id'
                element={
                  <SinglePage Component={SingleCharacterLayout} dataType='character' />
                }
              ></Route>
              <Route path='*' element={<Page404 />}></Route>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
