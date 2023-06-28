import MemberView from 'Components/Views/memberView';
import AdminView from 'Components/Views/adminView';
import SuperAdminView from 'Components/Views/superAdminView';
import LoginView from 'Components/Views/loginView';
import { useSelector } from 'react-redux';

const Layout = () => {
  const role = useSelector((state) => state.auth?.role);

  switch (role) {
    case 'SUPER_ADMIN':
      return <SuperAdminView />;
    case 'ADMIN':
      return <AdminView />;
    case 'MEMBER':
      return <MemberView />;
    case '':
      return <LoginView />;
    default:
      return <LoginView />;
  }
};

export default Layout;
