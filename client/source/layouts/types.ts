import { RouteProps } from 'react-router-dom';

import { FeatureFlag } from '@common/constants/featureFlag';

export interface IAuthRouteProps extends RouteProps {
  featureFlag?: FeatureFlag;
  // Indicates if the user is authenticated into the application or not
  isAuthenticated: boolean;
}
