import { BugButton } from 'app/providers/ErrorBoundary';
import { Counter } from 'entities/Counter';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';

const MainPage = () => {
    // В хук useTranslation передаём необязательный перамерт 'main' который указывает на имя файла public/locales/main.json
    // Без этого аргумента при вызове t('Главная страница') ключ "Главная страница" искался бы по умолчанию в файле public/locales/translation.json
    // Можно было бы рсположить этот ключ и там но если предствить что у нас на каждой странице требется много перевода и
    // и все эти перевод храняться в одном файле json на сервере, то получается каждый запрос на перевод
    // с любой из страниц тянул бы один общий файл с переводами для всех страниц. Поэтому мы создаем один json файл на одну страницу,
    // и теперь вызов  t('Главная страницы') будет загружать с сервера файл main.json c переводами только для этой страницы
    const { t } = useTranslation('main');
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };
    return (
        <div>
            <Input onChange={onChange} value={value} placeholder={t('Введите username')} />
            {/* <BugButton /> */}
            {t('Главная страница')}
            {/* <Counter /> */}
        </div>
    );
};

export default MainPage;
