import React from 'react';

import { faSignOut } from '@fortawesome/pro-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Spinning loading indicator.
 */
export const LoadingIcon: React.FC = () => <FontAwesomeIcon icon={faCircleNotch} spin />;
/**
 * Log out icon.
 */
export const LogOutIconAlt: React.FC = () => (
  <FontAwesomeIcon
    icon={faSignOut}
    transform={{ rotate: 180 }}
    size="lg"
    data-testid="logOutIconId"
  />
);
