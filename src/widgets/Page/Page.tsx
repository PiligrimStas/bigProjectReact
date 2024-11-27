import { memo, MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { uiActions } from 'features/UI';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useSelector } from 'react-redux';
import { getUIScrollByPath } from 'features/UI/selectors/scrollSaveSelectors';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPostion = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname));

    useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPostion;
    });

    // пользовательский хук useThrottlle нужен что бы не было очень частых диспатчей во время скроллинга
    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            uiActions.setScrollPosition({ position: e.currentTarget.scrollTop, path: pathname }),
        );
    }, 500);

    return (
        <section
            ref={wrapperRef}
            className={classNames(cls.page, {}, [className])}
            onScroll={onScroll}
        >
            <div>{children}</div>
            {/* следующий див ничего не содержит он нужен только как тригер. После того как страница бедет проскролена до него будет выслонена загрузка очередной порции данных */}
            {onScrollEnd ? <div ref={triggerRef} className={cls.trigger} /> : null}
        </section>
    );
});
