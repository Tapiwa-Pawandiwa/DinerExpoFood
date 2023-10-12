import {createContext, useEffect, useState, useContext} from 'react';
import {Auth, Hub, DataStore} from 'aws-amplify';
import '@azure/core-asynciterator-polyfill'
import {Customer} from '../models';


/* 
  AuthContext is a React Context Provider that handles authentication throughout the whole app
  1. We store the current authenticated user in the authUser state
  2. We store the current user in the user state ( this is fetched through the fetchCustomer function)

  3.  a hub listener refers to an event listener that listens for authentication events emitted by the Amplify Hub. 
  

*/
const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [dbUser,setDbUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  //user that is coming from the backend and is stored in the context

  const completeOnboarding = () => {
    setOnboardingComplete(true);
    //console.log('Onboarding complete', onboardingComplete);
  };
/*
  useEffect(() => {
    Auth.currentAuthenticatedUser({bypassCache: true})
      .then(setAuthUser)
      .catch(error => {
        console.log('Error with auth:', error);
      });
    console.log('Auth user:', authUser);
  }, []);

*/
useEffect(() => {
  Auth.currentAuthenticatedUser({bypassCache: true})
    .then(fetchedUser => {
      setAuthUser(fetchedUser);
      setIsAuthenticated(true);
   
      fetchCustomer(); // You might want to fetch the customer here as well
    })
    .catch(error => {
      setIsAuthenticated(false); // Set this only if the authentication fails
      setAuthUser(null); // Clear authUser if authentication fails
      setUser(null); // Clear user if authentication fails
      console.log('Error with auth:', error);
    });
}, []);
 
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

/*
  const fetchCustomer = async () => {
    try {
      const customer = await DataStore.query(Customer, c => c.email.eq(authUser.attributes.email));
      setUser(customer);
      console.log('Customer & User:', customer)

    } catch (error) {
      console.log('Error fetching customer:', error);
    }

  };
  */

  const fetchCustomer = async () => {
    try {
      if (authUser && isAuthenticated) {
        const customer = await DataStore.query(Customer, c => c.email.eq(authUser.attributes.email));
        setUser(customer);
       // console.log('Customer & User:', customer);
      } else {
        setUser(null); // Reset user data if not authenticated
      }
    } catch (error) {
      console.log('Error fetching customer:', error);
    }
  };

  useEffect(() => {
    fetchAuthUser();
    const authListener = Hub.listen('auth', async data => {
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
 //so we can use it in other components