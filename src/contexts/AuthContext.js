import {createContext, useEffect, useState, useContext} from 'react';
import {Auth, Hub} from 'aws-amplify';
import {DataStore} from 'aws-amplify';
import '@azure/core-asynciterator-polyfill'
import {Customer} from '../models';

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  //user that is coming from the backend and is stored in the context

  const completeOnboarding = () => {
    setOnboardingComplete(true);
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser({bypassCache: true})
      .then(setAuthUser)
      .catch(error => {
        console.log('Error with auth:', error);
      });
  }, []);

  
  const fetchAuthUser = async () => {
    try {
      console.log('fetching auth user');
      const fetchedUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setIsAuthenticated(true);
      fetchCustomer();
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      console.log('error fetching auth user', err);
    }
  };


  const fetchCustomer = async () => {
    try {
      const customer = await DataStore.query(Customer, c => c.email.eq(authUser.attributes.email));
      setUser(customer);
    } catch (error) {
      console.log('Error fetching customer:', error);
    }
  };

  useEffect(() => {
    fetchAuthUser();
    const authListener = Hub.listen('auth', async data => {
      console.log('auth status changed', data);
      switch (data.payload.event) {
        case 'signIn':
          await fetchAuthUser();
          break;
        case 'signOut':
          setUser(null);
          setIsAuthenticated(false);
          break;
      }
    }
    
    );
    return () => {
      authListener();
    }
  }, [authUser]);

  // when app loads, check if user is logged in
  // if they are, set the user state
  // if they are not, set the user state to null
  useEffect(() => {
    fetchAuthUser();
  }, []);
  

  return (
    //we pass authUser and dbuser to the other components that will need it
    <AuthContext.Provider
      value={{
        authUser,
        isAuthenticated,
        user,
        setUser,
        completeOnboarding,
        onboardingComplete,
        setIsAuthenticated,
        setAuthUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
}; //so we can use it in other components
