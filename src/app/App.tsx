import { Route, Routes, Link } from 'react-router-dom';
// импортируем как обычный файл без использования css modules
import './styles/index.scss';
import { useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/classNames/classNames';
import { AppRouter } from 'app/providers/router';

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>TOGGLE THEME</button>
      <Link to="/">Главная</Link>
      <Link to="/about">О нас</Link>
      <AppRouter />
    </div>
  );
};

export default App;
