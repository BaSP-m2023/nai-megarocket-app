import MemberView from 'Components/Views/memberView';
import AdminView from 'Components/Views/adminView';
import TrainerView from 'Components/Views/trainerView';
import SuperAdminView from 'Components/Views/superAdminView';
import LoginView from 'Components/Views/loginView';
import { useSelector } from 'react-redux';
import Container from 'Components/Shared/Container';
import { ClipLoader } from 'react-spinners';

const Layout = () => {
  const auth = useSelector((state) => state.auth);
  const role = sessionStorage.getItem('role');
  if (auth?.isAuthPending || auth?.isLoading) {
    <Container>
      <ClipLoader />
    </Container>;
  }

  switch (role) {
    case 'SUPER_ADMIN':
      return <SuperAdminView />;
    case 'ADMIN':
      return <AdminView />;
    case 'TRAINER':
      return <TrainerView />;
    case 'MEMBER':
      return <MemberView />;
    default:
      return <LoginView />;
  }
};

export default Layout;
