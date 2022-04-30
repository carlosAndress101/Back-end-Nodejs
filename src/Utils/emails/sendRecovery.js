import Customer from '../../model/customer/Customer';
import nodemail from 'nodemailer';
import helpers from '../index'

const createSendMail = async (customer) => {

    const { Email } = customer;
    const Mail = process.env.mail;
    const pass = process.env.pass;
    const customerExist = await Customer.findOne({ Email });

    if (!customerExist) {
        throw new Error('no esta llegando la data');
    }

    /**RETORNAR TOKEN */
    const token = helpers.tokenHelpers.createToken(
        customerExist,
        process.env.JWT_SECRET,
        '20min',
    )

    const link = `http://myfrontend.com/recovery?token=${token}`

    const transporter = nodemail.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: Mail, // generated ethereal user
            pass: pass, // generated ethereal password
        },
    });
    return await transporter.sendMail({
        from: `Soporte customers recovery <${Mail}>`, // sender address
        to: Email, // list of receivers
        subject: "Support Message Recovery ✔", // Subject line
        html: `<b>Ingresa a este link =>${link}<b/>`
    });
}
export default createSendMail;