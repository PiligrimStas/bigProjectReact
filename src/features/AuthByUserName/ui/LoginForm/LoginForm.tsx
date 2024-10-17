import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions, loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName';
import { getLoginUsername } from '../../model/selectors/getLoadingUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginisLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError.ts/getLoginError';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
}

const initialReducer: ReducerList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

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
        <DynamicModuleLoader reducers={initialReducer} removeAfterUnmount={true}>
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
        </DynamicModuleLoader>
    );
});

export default LoginForm;
