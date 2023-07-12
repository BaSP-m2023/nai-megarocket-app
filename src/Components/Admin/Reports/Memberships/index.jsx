// import styles from './memberships.module.css';
import { useSelector } from 'react-redux';
import styles from './memberships.module.css';
import { PieChart } from '@mui/x-charts/PieChart';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ClipLoader from 'react-spinners/ClipLoader';

const ReportsMemberships = () => {
  const members = useSelector((state) => state.members.data.data);
  const loading = useSelector((state) => state.members.loading);

  const memberCount = {};
  //const palette = ['#0f232e', '#a8a5a5', '#e7ad4a'];

  if (members) {
    members?.forEach((item) => {
      const memberMembership = item.membership;
      memberCount[memberMembership] = (memberCount[memberMembership] || 0) + 1;
    });
  }

  const data = Object.entries(memberCount).map(([label, value]) => ({
    label,
    value
  }));

  console.log(data);

  return loading ? (
    <ClipLoader />
  ) : (
    <div className={styles.container}>
      <Stack direction="row" width="100%" textAlign="center" margin="1%" height="100%">
        <Box>
          <Typography padding="5%">Memberships</Typography>
          <PieChart
            //colors={palette}
            series={[
              {
                data,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30 },
                cornerRadius: 5
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

export default ReportsMemberships;
