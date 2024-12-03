import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { HStack } from 'shared/ui/Stack';
import { Page } from 'widgets/Page/Page';

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
        <Page>
            <Input onChange={onChange} value={value} placeholder={t('Введите username')} />
            {t('Главная страница')}
            <div>
                <HStack>
                    <div>asdfasdf</div>
                    <ListBox
                        defaultValue="выберите значение"
                        onChange={(value: string) => {}}
                        value={' '}
                        items={[
                            { value: '1', content: '1234' },
                            { value: '1', content: '1234', disabled: true },
                            { value: '1', content: '1234' },
                        ]}
                    />
                </HStack>
                <div>asdfasdf</div>
                <div>asdfasdf</div>
                <div>asdfasdf</div>
                <div>asdfasdf</div>
                <div>asdfasdf</div>
                <div>asdfasdf</div>
            </div>
        </Page>
    );
};

export default MainPage;
