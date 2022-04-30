import Customer from '../../model/customer/Customer';
import bcript from 'bcryptjs';
import jwt from 'jsonwebtoken';


const changePassword = async (customer) => {
    const { token, newpassword, Email} = customer;
    try {
        const vali = jwt.verify(token, process.env.JWT_SECRET);
        const customerExist = await Customer.findOne({...vali, vali:Email});
        if (customerExist.sendRecovery !== token){
            throw new Error("no estas autorizado");
        }
        const hash = await bcript.hash(newpassword, 10);
        await Customer.findOneAndUpdate(customerExist, {sendRecovery: null, password:hash });
        return {message: 'password changed'};
    } catch (error) {
        console.log(error);
    }

}

export default changePassword;