
import { Search } from '@pages/Search';

import { TRoutes } from './types';

export enum Routes {
    search = 'search',
}

export const routes: TRoutes = {
    search: {
        name: 'Search',
        path: '/',
        getPath: () => '/',
        component: Search,
    },
};