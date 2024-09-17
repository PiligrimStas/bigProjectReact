import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  // В хук useTranslation передаём необязательный перамерт 'about' который указывает на имя файла public/locales/about.json
  // Без этого аргумента при вызове t('О сайте') ключ "O сайте" искался бы по умолчанию в файле public/locales/translation.json
  // Можно было бы рсположить этот ключ и там но если предствить что у нас на каждой странице требется много перевода и
  // и все эти перевод храняться в одном файле json на сервере, то получается каждый запрос на перевод
  // с любой из страниц тянул бы один общий файл с переводами для всех страниц. Поэтому мы создаем один json файл на одну страницу,
  // и теперь вызов  t('О сайте') будет загружать с сервера файл about.json c переводами только для этой страницы
  const { t } = useTranslation('about');

  return <div>{t('О сайте')}</div>;
};

export default AboutPage;
