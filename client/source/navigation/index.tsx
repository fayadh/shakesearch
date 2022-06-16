import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';

import { BreadCrumbs } from './BreadCrumbs';
import { useStyles } from './styles';

interface INavigation {
  children: React.ReactNode;
}

export const Navigation = ({ children }: INavigation) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        open
        anchor="left"
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        Hey there
      </Drawer>

      <main className={classes.content}>
        <BreadCrumbs className={classes.breadCrumbs} />
        {children}
      </main>
    </div>
  );
};
