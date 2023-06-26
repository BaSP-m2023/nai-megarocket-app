import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const SuperAdminAdmins = lazy(() => import('Components/SuperAdmin/Admins/index'));
const SuperAdminAdminsForm = lazy(() => import('Components/SuperAdmin/Admins/Form'));

const SuperAdminRoutes = () => {
  return (
    <Suspense fallback={<ClipLoader />}>
      <Route exact path="/super-admin/admins" component={SuperAdminAdmins} />
      <Route exact path="/super-admin/admins/form" component={SuperAdminAdminsForm} />
      <Route path="/super-admin/admins/form/:id" component={SuperAdminAdminsForm} />
    </Suspense>
  );
};

export default SuperAdminRoutes;
