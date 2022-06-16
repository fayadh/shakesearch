/* eslint-disable max-lines-per-function */
import { useHistory } from 'react-router';

import { TVoidFunction } from '@common/types';
import { Routes, routes } from '@layouts/Pages/Routes/utils';

//FIX _id is not supposed to be optional; types start to break if it's not
type TVoidFunctionWithId = (_id?: string) => void;

type TGoTo =
  | Record<Routes, TVoidFunction>
  | Record<Routes, TVoidFunctionWithId>;

interface IUseRouter {
  goto: TGoTo;
}

const useRouter = (): IUseRouter => {
  const { push } = useHistory();

  const createGoToFunctions = () => {

    return Object.keys(routes).reduce((goTo, name) => {
      const { [name as Routes]: config } = routes;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      goTo[name as Routes] = (...args: any) => push(config.getPath(...args));

      return goTo;
    }, {} as TGoTo);
  };

  return {
    goto: createGoToFunctions(),
  };
};

export default useRouter;
