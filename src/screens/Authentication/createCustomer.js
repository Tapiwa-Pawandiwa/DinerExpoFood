import { DataStore } from "aws-amplify";
import { Customer } from "../../models";


export const createCustomer = async (name,familyName, username) => {
    try {
      const customer = await DataStore.save(
        new Customer({
          first_name: name,
          last_name: familyName,
          email: username,
        })
      );
      console.log(customer, "customer created");
    } catch (error) {
      console.log(error, "error creating customer");
    }
  };