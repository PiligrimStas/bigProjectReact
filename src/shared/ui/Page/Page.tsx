import { memo, MutableRefObject, ReactNode, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
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

    useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

    return (
        <section ref={wrapperRef} className={classNames(cls.page, {}, [className])}>
            <div>{children}</div>
            {/* следующий див ничего не содержит он нужен только как тригер. После того как страница бедет проскролена до него будет выслонена загрузка очередной порции данных */}
            <div ref={triggerRef} />
        </section>
    );
});
