import React from 'react';
import { useAuth } from './AuthContext';

const UserContext = React.createContext();

const UserProvider = (props) => {
  return (
    <UserContext.Provider value={useAuth().data.user} {...props} />
  )
}

const useUser = () => React.useContext(UserContext);

const isLogged = () => {
  const { user } = useAuth().data;
  return Object.entries(user).length !== 0 // && user.constructor === Object
}

export {UserProvider, useUser, isLogged}
