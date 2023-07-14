import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from 'Components/Shared/Container';

const ReportsTrainers = () => {
  const classes = useSelector((state) => state.classes.data.data);

  const activityCount = {};
  classes?.forEach((item) => {
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
  classes?.forEach((item) => {
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
    <Container>
      {dataTrainers.length > 0 && dataActivity.length > 0 ? (
        <Stack direction="row">
          <Box textAlign="center">
            <Typography padding="5%" fontWeight="bold">
              Total class activities
            </Typography>
            <PieChart
              series={[
                {
                  data: dataActivity,
                  labelKey: 'label',
                  valueKey: 'value',
                  innerRadius: 70
                }
              ]}
              width={500}
              height={300}
            />
          </Box>
          <Box textAlign="center">
            <Typography padding="5%" fontWeight="bold">
              Total class trainers
            </Typography>
            <PieChart
              series={[
                {
                  data: dataTrainers,
                  labelKey: 'label',
                  valueKey: 'value',
                  innerRadius: 70
                }
              ]}
              width={500}
              height={300}
            />
          </Box>
        </Stack>
      ) : (
        <Typography fontWeight="bold">No data available for the chart</Typography>
      )}
    </Container>
  );
};

export default ReportsTrainers;
