import React from 'react';

const items = [
  'Virtualized - Infinite scroll',
  'Sort columns',
  'Single row selection',
  'Multiple rows selection',
  'Inline edit cell',
  'Resize columns',
  '100% height and width - scroll x + y',
];

type RequirementsProps = {
  missingRequirements?: number[];
};

const Requirements = ({ missingRequirements = [] }: RequirementsProps) => (
  <div className={'requirements'}>
    <h3 className={'header'}>Requirements:</h3>
    {items.map((item, i) => (
      <label key={i}>
        <input
          type={'checkbox'}
          readOnly
          checked={!missingRequirements.includes(i)}
        />
        {item}
      </label>
    ))}
  </div>
);

export default Requirements;
