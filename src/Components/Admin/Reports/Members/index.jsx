import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../reports.module.css';
import { format, parseISO, startOfMonth, subYears, isWithinInterval } from 'date-fns';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { LineChart, PieChart } from '@mui/x-charts';
import Container from 'Components/Shared/Container';

const ReportsMembers = () => {
  const members = useSelector((state) => state.members.data.data);

  const membersDates = members?.map((member) =>
    member?.createdAt ? parseISO(member.createdAt) : null
  );

  const currentDate = new Date();
  const lastYearDate = subYears(currentDate, 1);

  const filteredDates = membersDates?.filter((date) =>
    isWithinInterval(date, { start: lastYearDate, end: currentDate })
  );

  const membersByMonth = {};

  filteredDates
    ?.sort((a, b) => a.getTime() - b.getTime())
    ?.forEach((date) => {
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

  const memberCount = {};

  if (members) {
    members?.forEach((item) => {
      const memberMembership = item?.membership;
      memberCount[memberMembership] = (memberCount[memberMembership] || 0) + 1;
    });
  }

  const membershipsCount = Object.entries(memberCount)?.map(([label, value]) => ({
    label,
    value
  }));

  return (
    <Container>
      <div className={styles.container}>
        {membersCounts?.length > 0 ? (
          <Stack>
            <Box direction="row" width="100%" textAlign="center" padding="2%">
              <Typography fontWeight="bold">Number of registered members per month</Typography>
              <LineChart
                xAxis={[{ scaleType: 'band', data: months }]}
                series={[
                  {
                    data: membersCounts
                  }
                ]}
                width={800}
                height={300}
              />
            </Box>

            <Box direction="row" width="100%" textAlign="center">
              <Typography padding="5%" fontWeight="bold">
                Total memberships
              </Typography>
              <Box display="flex" justifyContent="center">
                <PieChart
                  series={[
                    {
                      data: membershipsCount,
                      labelKey: 'label',
                      valueKey: 'value',
                      innerRadius: 60
                    }
                  ]}
                  width={500}
                  height={300}
                />
              </Box>
            </Box>
          </Stack>
        ) : (
          <Typography fontWeight="bold">No data available for the chart</Typography>
        )}
      </div>
    </Container>
  );
};

export default ReportsMembers;
