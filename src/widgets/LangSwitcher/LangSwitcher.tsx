import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  // Вызывам хук useTranslation с пустым параметром. Без этого аргумента при вызове t('Перевод') ключ "Перевод"
  // будет искться по умолчанию в файле public/locales/translation.json. Этот необязательный параметр
  // предстваляет из себя строку с именем файла без расширения где находятся переводы для конекретной
  // страницы. Например мы исползуем этот парамер на страницу AboutPage

  const { t, i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      className={classNames(cls.LangSwitcher, {}, [className])}
      theme={ThemeButton.CLEAR}
      onClick={toggle}>
      {t('Язык')}
    </Button>
  );
};
