import Admin from '../../model/Admin/Admin';
import nodemail from 'nodemailer';
import helpers from '../index'

const createSendMail = async (admin) => {
    try {
        const { Email } = admin ;
        const adminExist = await Admin.findOne({Email});
        const Mail = process.env.mail;
        const pass = process.env.pass;
        

        if (!adminExist) {
            throw new Error('no existe esta direccion de correo');
        }

        /**RETORNAR TOKEN */
        const token = helpers.tokenHelpers.createToken(
            adminExist,
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
        return transporter.sendMail({
            from: `Soporte customers recovery <${Mail}>`,
            to: Email,
            subject: "Support Message Recovery ✔",
            html: `<b>Ingresa a este link =>${link}<b/>`
        });
    } catch (error) {
        console.log(error);
    }
}
export default createSendMail;