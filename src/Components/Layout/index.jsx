import MemberView from 'Components/Views/memberView';
import AdminView from 'Components/Views/adminView';
import SuperAdminView from 'Components/Views/superAdminView';
import LoginView from 'Components/Views/loginView';
// import { useEffect } from 'react';
// import { tokenListener } from 'Helper/firebase';
import { useSelector } from 'react-redux';

const Layout = () => {
  const auth = useSelector((state) => state.auth);
  const role = sessionStorage.getItem('role');

  if (auth?.isAuthPending) {
    <div>Loading...</div>;
  }

  switch (role) {
    case 'SUPER_ADMIN':
      return <SuperAdminView />;
    case 'ADMIN':
      return <AdminView />;
    case 'MEMBER':
      return <MemberView />;
    default:
      return <LoginView />;
  }
};

export default Layout;
