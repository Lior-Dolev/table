import React from 'react';

type SortIconProps = {
  isDown?: boolean;
};

const upStyle = {};
const downStyle = {
  transform: 'rotate(180deg)',
};

const SortIcon = ({ isDown }: SortIconProps) => (
  <svg
    className={'icon sort'}
    width={18}
    height={18}
    viewBox={'0 0 24 24'}
    xmlns="http://www.w3.org/2000/svg"
    style={isDown ? upStyle : downStyle}
  >
    <path d={'M7 14l5-5 5 5z'} />
    <path d={'M0 0h24v24H0z'} fill={'none'} />
  </svg>
);

export default SortIcon;
