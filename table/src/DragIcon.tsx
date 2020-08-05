import React from 'react';

const DragIcon = () => (
  <svg
    className={'icon drag'}
    width={24}
    height={24}
    viewBox={'0 0 24 24'}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMax meet"
    style={{ fill: 'currentcolor', transform: 'rotate(90deg)' }}
  >
    <defs>
      <path d="M0 0h24v24H0V0z" id="a"></path>
    </defs>
    <clipPath id="b">
      <use overflow="visible" href="#a"></use>
    </clipPath>
    <path clipPath="url(#b)" d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path>
  </svg>
);

export default DragIcon;
