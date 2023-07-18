import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Chip, Divider } from '@mui/material';

const ReportsTrainers = () => {
  const classes = useSelector((state) => state.classes.data.data);
  const trainers = useSelector((state) => state.trainers.data);
  const activeTrainers = trainers?.filter((trainer) => trainer.isActive === true);
  const validClasses = classes?.filter(
    (gymClass) => gymClass?.trainer !== null && gymClass?.activity !== null
  );
  const activityCount = {};
  validClasses?.forEach((item) => {
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
  validClasses?.forEach((item) => {
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
    <Stack direction="row" flexWrap="wrap" justifyContent="center" gap="20px" marginTop="80px">
      {dataTrainers.length > 0 && dataActivity.length > 0 ? (
        <>
          <Paper elevation={7} padding={5} direction="row">
            <Typography padding={2} variant={'h5'} textAlign="center">
              Active Classes
            </Typography>
            <Divider>
              <Chip label={`All: ${validClasses.length}`} />
            </Divider>
            <Box display="flex" padding={5} width={700} justifyContent="center">
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
          </Paper>
          <Paper elevation={7} padding={5} direction="row">
            <Typography padding={2} variant={'h5'} textAlign="center">
              Trainers Classes
            </Typography>
            <Divider>
              <Chip label={`Active trainers: ${activeTrainers.length}`} />
            </Divider>
            <Box display="flex" padding={5} width={700} justifyContent="center">
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
          </Paper>
        </>
      ) : (
        <Typography fontWeight="bold">No data available for the chart</Typography>
      )}
    </Stack>
  );
};

export default ReportsTrainers;
