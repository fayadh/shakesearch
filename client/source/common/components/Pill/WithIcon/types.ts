import { SvgIconProps } from '@mui/material';

export interface IPillWithIconProps {
  className?: string;
  iconClassName?: string;
  iconContainerClassName?: string;
  iconComponent?: React.FC<SvgIconProps>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  selectionText?: string;
}
