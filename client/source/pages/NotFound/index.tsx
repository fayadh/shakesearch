import React from 'react';

import { useLocation } from 'react-router';

import { useStyles } from './styles';

interface IMessage {
  icon: {
    images: string[];
    label: string;
  };
  text: string;
}

const messages: IMessage[] = [
  {
    icon: {
      images: ['🤷🏻‍♂️', '🤷🏼‍♂️', '🤷🏽‍♂️', '🤷🏾‍♂️', '🤷🏿‍♂️', '🤷🏻‍♀️', '🤷🏼‍♀️', '🤷🏽‍♀️', '🤷🏾‍♀️', '🤷🏿‍♀️'],
      label: 'shrug',
    },
    text: "can't find this page",
  },
  {
    icon: {
      images: ['🛩'],
      label: 'shrug',
    },
    text: "can't find the runway",
  },
  {
    icon: {
      images: ['🤦🏻‍♂️', '🤦🏼‍♂️', '🤦🏽‍♂️', '🤦🏾‍♂️', '🤦🏿‍♂️', '🤦🏻‍♀️', '🤦🏼‍♀️', '🤦🏽‍♀️', '🤦🏾‍♀️', '🤦🏿‍♀️'],
      label: 'face-palm',
    },
    text: 'they broke up with you over text',
  },
];

const sample = function <T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
};

export const NotFound: React.FC = () => {
  // triggers a message reload between different pages that are not found
  useLocation();

  const classes = useStyles();
  const message = sample(messages);

  return (
    <h1 className={classes.root}>
      <div>
        <div className={classes.icon}>
          <span role="img" aria-label={message.icon.label}>
            {sample(message.icon.images)}
          </span>
        </div>

        <div>
          <span className={classes.bud}>Sorry bud</span>, {message.text}.
        </div>

        <div className={classes.statusCode}>404</div>
      </div>
    </h1>
  );
};
