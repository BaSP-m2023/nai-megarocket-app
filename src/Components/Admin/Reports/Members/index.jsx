import React from 'react';
import { useSelector } from 'react-redux';
import styles from './members.module.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { format, parseISO, startOfMonth } from 'date-fns';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

const ReportsMembers = () => {
  const members = useSelector((state) => state.members.data.data);

  const membersDates = members
    ?.filter((members) => members?.isActive)
    ?.map((member) => (member?.createdAt ? parseISO(member.createdAt) : null));

  const membersByMonth = {};
  console.log(membersDates);
  membersDates?.forEach((date) => {
    if (date) {
      const month = format(startOfMonth(date), 'MMMM yyyy');
      if (membersByMonth[month]) {
        membersByMonth[month] += 1;
      } else {
        membersByMonth[month] = 1;
      }
    }
  });

  const months = Object.keys(membersByMonth);
  const membersCounts = Object.values(membersByMonth);
  console.log(membersCounts);
  console.log(membersCounts);
  return (
    <div className={styles.container}>
      <Stack>
        <Box direction="row" width="100%" textAlign="center" padding="2%">
          <Typography padding="5%">Monthly member signups</Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: months }]}
            series={[{ data: membersCounts }]}
            width={500}
            height={300}
          />
          <LineChart
            xAxis={[{ scaleType: 'point', data: months }]}
            series={[
              {
                data: membersCounts,
                area: true
              }
            ]}
            width={500}
            height={300}
          />
        </Box>
      </Stack>
    </div>
  );
};

export default ReportsMembers;
