// импортируем как обычный файл без использования css modules
import './styles/index.scss';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useState } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';

const App = () => {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={classNames('app', {}, [theme])}>
            {/* компоненты использующие переводы i18 нужно оборачивать в Sespense поскольку мы будет подргуржать из сервер */}
            <Suspense fallback="">
                <Navbar />
                <button type="button" onClick={() => setIsOpen(true)}>
                    toggle
                </button>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur quo,
                    deserunt expedita tempore molestiae repellendus! Accusamus tenetur earum
                    veritatis enim facere ducimus neque ab perferendis sit ratione, sequi temporibus
                    architecto.
                </Modal>
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};

export default App;
