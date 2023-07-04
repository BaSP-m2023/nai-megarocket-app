import {
  getAuthPending,
  getAuthSuccess,
  getAuthError,
  loginPending,
  loginSuccess,
  loginError,
  logoutPending,
  logoutSuccess,
  logoutError,
  signUpPending,
  signUpSuccess,
  signUpError
} from './actions';

import { firebaseApp } from 'Helper/firebase';

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const firebaseResponse = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      const token = await firebaseResponse.user.getIdToken();
      const {
        claims: { role }
      } = await firebaseResponse.user.getIdTokenResult();
      return dispatch(loginSuccess({ role, token }));
    } catch (error) {
      return dispatch(loginError(error.toString()));
    }
  };
};

export const getAuth = (token) => {
  return async (dispatch) => {
    dispatch(getAuthPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      });
      const data = await response.json();
      return dispatch(getAuthSuccess(data.data));
    } catch (error) {
      return dispatch(getAuthError(error.toString()));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutPending());
    try {
      await firebaseApp.auth().signOut();
      return dispatch(logoutSuccess());
    } catch (error) {
      return dispatch(logoutError(error.toString()));
    }
  };
};

export const signUp = (newMember) => {
  return async (dispatch) => {
    dispatch(signUpPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token')
        },
        body: JSON.stringify(newMember)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(signUpSuccess());
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(signUpError(error));
      throw error;
    }
  };
};

// export const register = (userData) => {
//   return async (dispatch) => {
//     dispatch(registerPending());
//     try {
//       const {
//         firstName,
//         lastName,
//         dni,
//         phone,
//         email,
//         password,
//         city,
//         birthDay,
//         postalCode,
//         isActive
//       } = userData;

//       const membership = userData.membership || 'OnlyClasses';

//       const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//       const user = userCredential.user;
//       await user.getIdToken();
//       await clientAuth.createUserWithEmailAndPassword(getAdminAuth(), user.uid, { role: 'member' });

//       const userDataFirestore = {
//         firebaseUid: user.uid,
//         firstName,
//         lastName,
//         dni,
//         phone,
//         email,
//         password,
//         city,
//         birthDay,
//         postalCode,
//         isActive,
//         membership
//       };

//       await firestore.collection('users').doc(user.uid).set(userDataFirestore);

//       return dispatch(registerSuccess());
//     } catch (error) {
//       return dispatch(registerError(error.toString()));
//     }
//   };
// };
