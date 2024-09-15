import { render } from 'react-dom';
import App from './app/App';
// import { BrowserRouter } from 'react-router-dom';
// ThemeProvider так жи мог быть импортирован из './app/providers/ThemeProvider/ui/ThemeProvider'
// но это было бы неправильно так как сейчас мы его импортируем из index.tsx файла который и является public api он регулирует то что мы отдаём наружу
import { ThemeProvider } from './app/providers/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
// import { ThemeProvider } from './app/providers/ThemeProvider';

render(
  <div>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </div>,
  document.getElementById('root'),
);
