import React from 'react';
import styles from '../reports.module.css';
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

  const dataActivity = Object.keys(activityCount)?.map((activity) => ({
    label: activity,
    value: activityCount[activity]
  }));

  const trainersCount = {};
  classes.forEach((item) => {
    const trainer = item?.trainer ? `${item?.trainer?.firstName}` : null;
    if (trainer) {
      if (trainersCount[trainer]) {
        trainersCount[trainer] += 1;
      } else {
        trainersCount[trainer] = 1;
      }
    }
  });

  const dataTrainers = Object.keys(trainersCount)?.map((trainer) => ({
    label: trainer,
    value: trainersCount[trainer]
  }));

  return (
    <div className={styles.container}>
      <Stack direction="row" width="100%" textAlign="center" paddingRight="30%" paddingTop="10%">
        <Box>
          <Typography padding="5%" fontWeight="bold">
            Total class activities
          </Typography>
          {Array.isArray(dataActivity) && dataActivity.length > 0 ? (
            <PieChart
              series={[
                {
                  data: dataActivity,
                  labelKey: 'label',
                  valueKey: 'value',
                  innerRadius: 60
                }
              ]}
              width={500}
              height={300}
            />
          ) : (
            <Typography fontWeight="bold">No data available for the chart</Typography>
          )}
        </Box>
        <Box>
          <Typography padding="5%" fontWeight="bold">
            Total class trainers
          </Typography>
          {Array.isArray(dataTrainers) && dataTrainers.length > 0 ? (
            <PieChart
              series={[
                {
                  data: dataTrainers,
                  labelKey: 'label',
                  valueKey: 'value',
                  innerRadius: 60
                }
              ]}
              width={500}
              height={300}
            />
          ) : (
            <Typography fontWeight="bold">No data available for the chart</Typography>
          )}
        </Box>
      </Stack>
    </div>
  );
};

export default ReportsTrainers;
