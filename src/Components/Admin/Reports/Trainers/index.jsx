import React from 'react';
import styles from './trainers.module.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const ReportsTrainers = () => {
  const classes = useSelector((state) => state.classes.data.data);

  const activityCount = {};
  classes.forEach((item) => {
    const activity = item?.activity?.name;
    if (activity) {
      if (activityCount[activity]) {
        activityCount[activity] += 1;
      } else {
        activityCount[activity] = 1;
      }
    }
  });

  const trainers = classes?.map((item) => {
    const firstName = item?.trainer?.firstName ?? 'Trainer not assigned';
    const lastName = item?.trainer?.lastName ?? '';
    return `${firstName} ${lastName}`;
  });

  const data1 = Object.keys(activityCount)?.map((activity) => ({
    label: activity,
    value: activityCount[activity]
  }));

  const data2 = trainers?.map((index) => ({
    label: `${index}`,
    value: 1
  }));

  console.log(data1);
  console.log(data2);

  return (
    <div className={styles.container}>
      <Stack>
        <Box direction="row" width="100%" textAlign="center" padding="2%">
          <Typography padding="5%">Classes with trainers</Typography>
          <PieChart
            series={[
              {
                innerRadius: 0,
                outerRadius: 80,
                data: data1
              },
              {
                innerRadius: 100,
                outerRadius: 120,
                data: data2
              }
            ]}
            width={500}
            height={300}
            legend={{ hidden: true }}
          />
        </Box>
      </Stack>
    </div>
  );
};

export default ReportsTrainers;
