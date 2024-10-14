import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions } from 'features/AuthByUserName/model/slice/loginSlice';
import { getLoginState } from 'features/AuthByUserName/model/selectors/selectLoginState/getLoginState';
import { loginByUserName } from 'features/AuthByUserName/model/services/loginByUserName/loginByUserName';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const {
        username, password, error, isLoading,
    } = useSelector(getLoginState);

    const onChangeUsername = useCallback(
        (value) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(() => {
        dispatch(loginByUserName({ username, password }));
    }, [dispatch, username, password]);

    return (
        <div className={classNames(cls.loginForm, {}, [className])}>
            <Text title={t('Форма авторизации')} />
            {error && (
                <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />
            )}
            <Input
                type="text"
                placeholder={t('Введите username')}
                className={cls.input}
                onChange={onChangeUsername}
                autofocus
                value={username}
            />
            <Input
                type="text"
                placeholder={t('Введите пароль')}
                className={cls.input}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t('Войти')}
            </Button>
        </div>
    );
});
