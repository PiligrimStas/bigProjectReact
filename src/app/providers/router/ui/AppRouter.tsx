import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/route.config';
import { PageLoader } from 'widgets/PageLoader/PageLoader';

const AppRouter = () => (
    // suspense работает одникого когда мы оборачиваем все роуты и если будем обрачивать каждый элемент
    // каждого роута
    <Suspense fallback={<PageLoader />}>
        <Routes>
            {Object.values(routeConfig).map(({ path, element }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        // <Suspense fallback={<PageLoader />}>
                        <div className="page-wraper">{element}</div>
                        // </Suspense>
                    }
                />
            ))}
        </Routes>
    </Suspense>
);

export default AppRouter;
