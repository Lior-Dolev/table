import React from 'react';

const items = [
  'Virtualized - Infinite scroll x',
  'Sort columns',
  'Single row selection',
  'Multiple rows selection',
  'Inline edit cell',
  'Resize columns',
  '100% height and width',
  'Scroll y',
];

type RequirementsProps = {
  missingRequirements?: number[];
  pluginRequirements?: number[];
};

const Requirements = ({
  missingRequirements = [],
  pluginRequirements = [],
}: RequirementsProps) => (
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
        {pluginRequirements.includes(i) && <strong> - needed to write</strong>}
      </label>
    ))}
  </div>
);

export default Requirements;
