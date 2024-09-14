import { Route, Routes, Link } from 'react-router-dom';
import { Counter } from './components/conter';
// импортируем как обычный файл без использования css modules
import './index.scss';
import { AboutPageAsync } from './components/AboutPage/AboutPage.async';
import { MainPageAsync } from './components/MainPage/MainPage.async';
import { Suspense } from 'react';

const App = () => {
  return (
    <div className="app">
      <Link to="/">Главная</Link>
      <Link to="/about">О нас</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={'/about'} element={<AboutPageAsync />} />
          <Route path={'/'} element={<MainPageAsync />} />
        </Routes>
      </Suspense>
      <Counter />
    </div>
  );
};

export default App;
