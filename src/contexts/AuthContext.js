import {createContext, useEffect, useState, useContext} from 'react';
import {Auth, Hub} from 'aws-amplify';
import {DataStore} from 'aws-amplify';
import '@azure/core-asynciterator-polyfill'
import {Customer} from '../models';

const AuthContext = createContext();
//customer -- user
// authUser -- same user that is coming from the backend and is stored in the context

const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [dbUser,setDbUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  //user that is coming from the backend and is stored in the context

  const completeOnboarding = () => {
    setOnboardingComplete(true);
  };
/*
  useEffect(() => {
    Auth.currentAuthenticatedUser({bypassCache: true})
      .then(setAuthUser)
      .catch(error => {
        console.log('Error with auth:', error);
      });
  }, []);

  */
 
  const fetchAuthUser = async () => {
    try {
  
      const fetchedUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      
      setAuthUser(fetchedUser);
      setIsAuthenticated(true);
      fetchCustomer();
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
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
          setAuthUser(null);
          setIsAuthenticated(false);
          break;
      }
    }
    
    );
    return () => {
      authListener();
    }
  }, [authUser]);
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
        dbUser,
        fetchAuthUser,
        setDbUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
}; //so we can use it in other components