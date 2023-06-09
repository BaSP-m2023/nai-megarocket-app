import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../reports.module.css';
import { LineChart } from '@mui/x-charts/LineChart';
import { format, parseISO, startOfMonth, subYears, isWithinInterval } from 'date-fns';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import Container from 'Components/Shared/Container';

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
      const month = format(startOfMonth(date), 'MMMM yyyy');
      if (subscriptionsByMonth[month]) {
        subscriptionsByMonth[month] += 1;
      } else {
        subscriptionsByMonth[month] = 1;
      }
    });

  const months = Object.keys(subscriptionsByMonth);
  const subscriptionCounts = Object.values(subscriptionsByMonth);

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
    ...new Set(subscriptions.map((subscription) => subscription?.classes?.activity?.name))
  ];

  const activityCount = {};
  subscriptions.forEach((subscription) => {
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
    <Container>
      <div className={styles.container}>
        {months.length > 0 && subscriptionCounts.length > 0 ? (
          <>
            <Stack>
              <Box direction="row" width="100%" textAlign="center">
                <Typography fontWeight="bold">Monthly class subscriptions</Typography>
                <LineChart
                  xAxis={[{ scaleType: 'band', data: months }]}
                  series={[{ data: subscriptionCounts }]}
                  width={800}
                  height={300}
                />
              </Box>
            </Stack>
            <Stack>
              <Box direction="row" width="100%" textAlign="center">
                <Typography padding="5%" fontWeight="bold">
                  Active class subscriptions by activity
                </Typography>
                <Box display="flex" justifyContent="center">
                  <PieChart
                    series={[
                      {
                        data,
                        labelKey: 'label',
                        valueKey: 'value',
                        innerRadius: 60
                      }
                    ]}
                    width={600}
                    height={300}
                  />
                </Box>
              </Box>
            </Stack>
          </>
        ) : (
          <Typography fontWeight="bold">No data available for the chart</Typography>
        )}
      </div>
    </Container>
  );
};

export default ReportsSubscriptions;
