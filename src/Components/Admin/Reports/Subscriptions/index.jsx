import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart } from '@mui/x-charts/LineChart';
import { format, parseISO, startOfMonth, subYears, isWithinInterval } from 'date-fns';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import Paper from '@mui/material/Paper';
import { Chip, Divider } from '@mui/material';

const ReportsSubscriptions = () => {
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const subscriptionDates = subscriptions.map((subscription) => parseISO(subscription.date));

  const currentDate = new Date();
  const lastYearDate = subYears(currentDate, 1);

  const filteredDates = subscriptionDates?.filter((date) =>
    isWithinInterval(date, { start: lastYearDate, end: currentDate })
  );

  const subscriptionsByMonth = {};

  filteredDates
    ?.sort((a, b) => a.getTime() - b.getTime())
    ?.forEach((date) => {
      const month = format(startOfMonth(date), 'MMM-yy');
      if (subscriptionsByMonth[month]) {
        subscriptionsByMonth[month] += 1;
      } else {
        subscriptionsByMonth[month] = 1;
      }
    });

  const months = Object.keys(subscriptionsByMonth);
  const subscriptionCounts = Object.values(subscriptionsByMonth);
  const subscriptionActive = subscriptions.filter((sub) => sub.isActive === true);
  const subscriptionsByClass = {};
  subscriptions?.forEach((subscription) => {
    if (subscription?.isActive) {
      const className = subscription?.classes;
      if (!subscriptionsByClass[className]) {
        subscriptionsByClass[className] = [];
      }
      subscriptionsByClass[className].push(subscription);
    }
  });

  const activityNames = [
    ...new Set(subscriptionActive.map((subscription) => subscription?.classes?.activity?.name))
  ];

  const activityCount = {};
  subscriptionActive.forEach((subscription) => {
    const activityName = subscription?.classes?.activity?.name;
    if (activityName) {
      if (activityCount[activityName]) {
        activityCount[activityName] += 1;
      } else {
        activityCount[activityName] = 1;
      }
    }
  });
  const data = activityNames?.map((name) => ({
    label: name,
    value: activityCount[name] || 0
  }));
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="center" gap="20px" marginTop="80px">
      {months.length > 0 && subscriptionCounts.length > 0 ? (
        <>
          <Paper elevation={7} direction="row" width="100%" textAlign="center">
            <Typography padding={2} variant={'h5'} textAlign="center">
              Class subscriptions
            </Typography>
            <Divider>
              <Chip label={`P/Month: ${(subscriptions.length / 12).toFixed(2)} `} />
            </Divider>
            <LineChart
              xAxis={[{ scaleType: 'band', data: months }]}
              series={[{ data: subscriptionCounts }]}
              width={800}
              height={300}
            />
          </Paper>
          <Paper elevation={7} direction="row" width="100%" textAlign="center">
            <Typography padding={2} variant={'h5'} textAlign="center">
              Active class subscriptions by activity
            </Typography>
            <Divider>
              <Chip label={`Total: ${subscriptionActive.length} `} />
            </Divider>
            <Box display="flex" padding={5} width={720} justifyContent="center">
              <PieChart
                series={[
                  {
                    data,
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

export default ReportsSubscriptions;
