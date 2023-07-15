import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import AdminView from 'Components/Views/adminView';
import MemberView from 'Components/Views/memberView';
import SuperAdminView from 'Components/Views/superAdminView';
import TrainerView from 'Components/Views/trainerView';
import Container from 'Components/Shared/Container';
import LandingView from 'Components/Views/landingView';

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
      return <LandingView />;
  }
};

export default Layout;
