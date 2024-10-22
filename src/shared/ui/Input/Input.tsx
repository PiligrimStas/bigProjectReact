import React, { FC, InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

// type HTMLInput понадобился для того что бы мы в inputProps могли передопределить value и onChange так как
// TS ругался на запись interface inputProps extends InputHTMLAttributes<HTMLInputElement> потомучто в
// InputHTMLAttributes<HTMLInputElement> уже есть типы для onChange, value. в HTMLInput мы избавляемся от встроенных типов
// value и onchange
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    autofocus?: boolean;
}

export const Input: FC<InputProps> = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        ...otherProps
    } = props;

    const [isFocused, setIsFoucused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (autofocus) {
            setIsFoucused(true);
            ref.current!.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };

    const onBlur = () => {
        setIsFoucused(false);
    };

    const onFocus = () => {
        setIsFoucused(true);
    };

    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart);
    };

    return (
        <div className={classNames(cls.inputWrapper, {}, [className])}>
            {placeholder && <div className={cls.placeholder}>{`${placeholder}>`}</div>}
            <div className={cls.caretWrapper}>
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    className={cls.input}
                    {...otherProps}
                />
                {isFocused && (
                    <span className={cls.caret} style={{ left: `${caretPosition * 8}px` }} />
                )}
            </div>
        </div>
    );
});
