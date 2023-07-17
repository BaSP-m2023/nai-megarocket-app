import Layout from 'Components/Layout';
import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const SuperAdminAdmins = lazy(() => import('Components/SuperAdmin/Admins/index'));
const SuperAdminAdminsForm = lazy(() => import('Components/SuperAdmin/Admins/Form'));

const SuperAdminRoutes = () => {
  const routes = [{ name: 'Admins', link: '/super-admins/admins', icon: AdminPanelSettingsIcon }];
  const rol = 'super-admin';

  return (
    <Layout routes={routes} rol={rol}>
      <Suspense fallback={<ClipLoader />}>
        <Route exact path="/super-admins/admins" component={SuperAdminAdmins} />
        <Route exact path="/super-admins/admins/form" component={SuperAdminAdminsForm} />
        <Route path="/super-admins/admins/form/:id" component={SuperAdminAdminsForm} />
      </Suspense>
    </Layout>
  );
};

export default SuperAdminRoutes;
