import React from 'react';

type StatsProps = {
  size?: string;
  weeklyDownloads?: string;
  license?: string;
  stars?: string;
  forks?: string;
  usedBy?: string;
  contributors?: string;
};

const Stats = ({
  size = '-',
  weeklyDownloads = '-',
  license = '-',
  stars = '-',
  forks = '-',
  usedBy = '-',
  contributors = '-',
}: StatsProps) => (
  <>
    <p>
      {size} (Unpacked Size) | {weeklyDownloads} Weekly Downloads | {license}{' '}
      License{' '}
    </p>
    <p>
      {stars} stars | {forks} forks | Used by {usedBy} repos | {contributors}{' '}
      Contributors
    </p>
  </>
);

export default Stats;
