import Customer from '../../../model/customer/Customer';
import bcript from 'bcryptjs';
import helpers from '../../../Utils/index';
import nodemail from 'nodemailer'
import createSendMail from '../../../Utils/emails/sendRecovery';
import changePassword from '../../../Utils/emails/changePassword';
/**GET CUSTOMER */
const CustomerResolver = {
  customers: async () => await Customer.find(),

  /**LOGIN */
  authCustomer: async ({ customer }) => {
    const { Email, password } = customer;
    const customerExist = await Customer.findOne({ Email });

    if (!customerExist) {
      throw new Error('Customer does not exist ');
    }

    const isPasswordCorrect = await bcript.compare(
      password,
      customerExist.password,
    );

    if (!isPasswordCorrect) {
      throw new Error('Wrong password, try again!');
    }
    /**RETORNAR TOKEN */
    return {
      token: helpers.tokenHelpers.createToken(
        customerExist,
        process.env.JWT_SECRET,
        '7hr',
      ),
    };
  },

  sendRecovery: ({ customer }) => {
    createSendMail(customer)
    let Message = "Se envio"
    return Message;
  },

  // changepassword: ({customer}) =>{
  //   changePassword(customer);
  // },

  /* CUSTOMER*/
  createCustomer: async ({ customer }) => {

    const { Email, password, Name } = customer;
    const customerExist = await Customer.findOne({ Email, });

    if (customerExist) { throw new Error("Customer already exist "); }
    if (!customer) { throw new Error("no esta llegando la data"); }

    try {
      /**Encriptacion */
      const hash = await bcript.hash(password, 10);
      const newCustomer = new Customer({ ...customer, password: hash });
      const Mail = process.env.mail;
      const pass = process.env.pass
      let transporter = nodemail.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: Mail, // generated ethereal user
          pass: pass, // generated ethereal password
        },
      });
      await transporter.sendMail({
        from: `Soporte customers👻 <${Mail}>`, // sender address
        to: Email, // list of receivers
        subject: "Support Message ✔", // Subject line
        html: `<h1>Hello ${Name}</h1>
        <a href="https://ibb.co/ckZnzvN"><img src="https://i.ibb.co/jbQX75L/Welcome.jpg" alt="Welcome" border="0"></a>`, // html body
      });
      return await newCustomer.save();
    } catch (error) {
      console.log(error);
    }
  },

  updateCustomer: async ({ customer }) => {
    if (!customer._id) {
      throw new Error('needed ID to update');
    }

    const currentCustomer = await Customer.findOne({
      _id: customer._id,
    });

    if (!currentCustomer) {
      throw new Error('Client doesn\'t exist');
    }

    try {
      return await Customer.findByIdAndUpdate({ _id: customer._id }, customer, {
        new: true,
      });
    } catch (error) {
      console.log(`Problemas en el resolver updateCustomer revisa - ${error}`);
    }
  },

  deleteCustomer: async ({ customer }) => {
    if (!customer._id) {
      throw new Error('needed id to remove');
    }

    const currentCustomer = await Customer.findOne({ _id: customer._id });

    if (!currentCustomer) {
      throw new Error('User doesn\'t exist');
    }

    try {
      await Customer.findByIdAndDelete({ _id: customer._id }, customer);
      return `CUSTOMER WITH ID ${customer._id} DELETE`;
    } catch (error) {
      console.log(`Problemas en el resolver deleteCustomer revisa - ${error}`);
    }
  },
};

export default CustomerResolver;
