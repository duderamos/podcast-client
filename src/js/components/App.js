import React, { Suspense } from 'react';
import { isLogged } from '../contexts/UserContext';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

const App = () => {
  return isLogged() ?
  (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthenticatedApp/>
    </Suspense>
  )
  :
  (
    <Suspense fallback={<div>Loading...</div>}>
      <UnauthenticatedApp/>
    </Suspense>
  )
}

export default App;
