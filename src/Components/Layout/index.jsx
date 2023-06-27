import MemberView from 'Components/Views/memberView';
import AdminView from 'Components/Views/adminView';
import SuperAdminView from 'Components/Views/superAdminView';

const Layout = () => {
  const role = sessionStorage.getItem('role');

  switch (role) {
    case 'SUPER_ADMIN':
      return <SuperAdminView />;
    case 'ADMIN':
      return <AdminView />;
    case 'MEMBER':
      return <MemberView />;
    default:
      return <MemberView />;
  }
};

export default Layout;
