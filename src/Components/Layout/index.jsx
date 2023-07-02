import MemberView from 'Components/Views/memberView';
import AdminView from 'Components/Views/adminView';
import TrainerView from 'Components/Views/trainerView';
import SuperAdminView from 'Components/Views/superAdminView';
import LoginView from 'Components/Views/loginView';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserRole } from 'Redux/auth/actions';

const Layout = () => {
  const role = useSelector((state) => state.auth?.role);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      dispatch(setUserRole(storedRole));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);

  switch (role) {
    case 'SUPER_ADMIN':
      return <SuperAdminView />;
    case 'ADMIN':
      return <AdminView />;
    case 'TRAINER':
      return <TrainerView />;
    case 'MEMBER':
      return <MemberView />;
    case '':
      return <LoginView />;
    default:
      return <LoginView />;
  }
};

export default Layout;
