import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { StoreProvider } from 'app/providers/StoreProvider';
import App from './app/App';
// import { BrowserRouter } from 'react-router-dom';
// ThemeProvider так жи мог быть импортирован из './app/providers/ThemeProvider/ui/ThemeProvider'
// но это было бы неправильно так как сейчас мы его импортируем из index.tsx файла который и является public api он регулирует то что мы отдаём наружу
import { ThemeProvider } from './app/providers/ThemeProvider';
import 'shared/config/i18/i18';
// импорт понадобился после добавления portal так как модальное окно теперь рендерится
// пряму внутри body рядом с div id=root, а не внутри его. и css импорты в компоненте
// App стали для него недоступны
import 'app/styles/index.scss';

render(
    <div>
        <BrowserRouter>
            <StoreProvider>
                <ErrorBoundary>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ErrorBoundary>
            </StoreProvider>
        </BrowserRouter>
    </div>,
    document.getElementById('root'),
);
