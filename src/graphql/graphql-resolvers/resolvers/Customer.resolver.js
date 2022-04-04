import Customer from "../../../model/customer/Customer";
import bcript from 'bcryptjs'

const CustomerResolver = {
  Customers: async () => await Customer.find(),

  /*CUSTOMER*/
  createCustomer: async ({ customer }) => {

    /**Encriptacion */
    const { Email, password } = customer;

    const customerExist = await Customer.findOne({
      Email,
    });

    if (customerExist) {
      throw new Error("Customer already exist ");
    }

    if (!customer) {
      throw new Error("no esta llegando la data");
    }
    try {
      const hash = await bcript.hash(password, 10);
      const newCustomer = new Customer({...customer, password:hash});
      return await newCustomer.save();
    } catch (error) {
      console.log(error);
    }
  },

  updateCustomer: async ({ customer }) => {
    if (!customer._id) {
      throw new Error("needed ID to update");
    }

    const currentCustomer = await Customer.findOne({
      _id: customer._id,
    });

    if (!currentCustomer) {
      throw new Error("Client doesn't exist");
    }

    try {
      return await Customer.findByIdAndUpdate({ _id: customer._id }, customer, {
        new: true,
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteCustomer: async ({ customer }) => {
    if (!customer._id) {
      throw new Error("needed id to remove");
    }

    const currentCustomer = await Customer.findOne({ _id: customer._id });

    if (!currentCustomer) {
      throw new Error("User doesn't exist");
    }

    try {
      await Customer.findByIdAndDelete({ _id: customer._id }, customer);
      return `CUSTOMER WITH ID ${customer._id} DELETE`;
    } catch (error) {
      console.log(error);
    }
  },
};

export default CustomerResolver;
