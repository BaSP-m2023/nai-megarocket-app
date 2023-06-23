import React, { useEffect } from 'react';
import VerticalBar from '../VerticalBar';
import styles from './memberships.module.css';
import { getMembers } from 'Redux/members/thunks';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

const ReportsMemberships = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.data.data);
  const loading = useSelector((state) => state.members.loading);

  useEffect(() => {
    dispatch(getMembers());
  }, []);

  if (loading) {
    return <ClipLoader />;
  }
  const memberCount = {};

  if (members) {
    members?.forEach((item) => {
      const memberMembership = item.membership;
      memberCount[memberMembership] = (memberCount[memberMembership] || 0) + 1;
    });
  }

  const uniqueMembers = members ? Array.from(new Set(members.map((item) => item.membership))) : [];

  return (
    <div className={styles.container}>
      {uniqueMembers.map((memberMembership, idx) => (
        <VerticalBar key={idx} name={memberMembership} value={memberCount[memberMembership] * 20} />
      ))}
    </div>
  );
};

export default ReportsMemberships;
