import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(
    ({ className, value, onChange, readonly }: CurrencySelectProps) => {
        const { t } = useTranslation('profile');

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Currency);
            },
            [onChange],
        );

        return (
            <ListBox
                className={className}
                onChange={onChangeHandler}
                label={t('Выберите валюту')}
                value={value as Currency}
                defaultValue={t('Выберите валюту')}
                items={options}
                readonly={readonly}
                direction="top right"
            />

            // теперь вместо нашего селекта мы использгуем компонен из сторонней библиотеки

            // <Select
            //     className={classNames('', {}, [className])}
            //     label={t('Выберите валюту')}
            //     options={options}
            //     value={value}
            //     onChange={onChangeHandler}
            //     readonly={readonly}
            // />
        );
    },
);
