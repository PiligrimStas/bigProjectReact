import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { Country } from '../../model/types/country';
import { ListBox } from 'shared/ui/ListBox/ListBox';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    { value: Country.Georgia, content: Country.Georgia },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = memo(
    ({ className, value, onChange, readonly }: CountrySelectProps) => {
        const { t } = useTranslation('profile');

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Country);
            },
            [onChange],
        );

        return (
            <ListBox
                onChange={onChangeHandler}
                value={value as Country}
                defaultValue={t('Укажите страну')}
                label={t('Укажите страну')}
                items={options}
                readonly={readonly}
                direction="top"
            />

            // вместо нашего кастомного селекта добавлям listbox из сторонней библиотеки

            // <Select
            //     className={classNames('', {}, [className])}
            //     label={t('Выберите страну')}
            //     options={options}
            //     value={value}
            //     onChange={onChangeHandler}
            //     readonly={readonly}
            // />
        );
    },
);
