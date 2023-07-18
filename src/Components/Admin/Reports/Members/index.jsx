import React from 'react';
import { useSelector } from 'react-redux';
import { format, parseISO, startOfMonth, subYears, isWithinInterval } from 'date-fns';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Chip, Divider } from '@mui/material';
import { LineChart, PieChart } from '@mui/x-charts';

const ReportsMembers = () => {
  const members = useSelector((state) => state.members?.data.data);
  const membersDates = members?.map((member) =>
    member?.createdAt ? parseISO(member.createdAt) : null
  );

  const currentDate = new Date();
  const lastYearDate = subYears(currentDate, 1);
  const activeMembers = members.filter((member) => member.isActive === true);
  const filteredDates = membersDates?.filter((date) =>
    isWithinInterval(date, { start: lastYearDate, end: currentDate })
  );

  const membersByMonth = {};

  filteredDates
    ?.sort((a, b) => a.getTime() - b.getTime())
    ?.forEach((date) => {
      if (date) {
        const month = format(startOfMonth(date), 'MMM-yy');
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

  if (activeMembers) {
    activeMembers?.forEach((item) => {
      const memberMembership = item?.membership;
      memberCount[memberMembership] = (memberCount[memberMembership] || 0) + 1;
    });
  }

  const membershipsCount = Object.entries(memberCount)?.map(([label, value]) => ({
    label,
    value
  }));

  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="center" gap="20px" marginTop="80px">
      {membersCounts?.length > 0 ? (
        <>
          <Paper elevation={7} padding={5} direction="row">
            <Box width={780}>
              <Typography padding={2} variant={'h5'} textAlign="center">
                Registered Members
              </Typography>
              <Divider>
                <Chip label={`P/Month: ${(members.length / 12).toFixed(2)}`} />
              </Divider>
              <LineChart
                xAxis={[{ scaleType: 'band', data: months }]}
                series={[
                  {
                    data: membersCounts
                  }
                ]}
                height={300}
              />
            </Box>
          </Paper>
          <Paper elevation={7} direction="row" width="100%">
            <Typography padding={2} textAlign="center" variant={'h5'}>
              Active memberships
            </Typography>
            <Divider>
              <Chip label={`Total: ${activeMembers.length}`} />
            </Divider>

            <Box width={700} display="flex" padding={5} justifyContent="center">
              <PieChart
                series={[
                  {
                    data: membershipsCount,
                    labelKey: 'label',
                    valueKey: 'value',
                    innerRadius: 70
                  }
                ]}
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

export default ReportsMembers;
