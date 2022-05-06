import Admin from '../../../model/Admin/Admin';
import bcript from 'bcryptjs';
import helpers from '../../../Utils/index';

/*GET ADMINISTRADOR*/
const adminResolver = {
    admins: async () => Admin.find(),

    /**LOGIN DE ADMIN*/
    authAdmin: async ({ admin }) => {
        const { _id, password } = admin;
        const adminExist = await Admin.findById({ _id });
        if (!adminExist) { throw new Error("administrador no existe"); }
        const isPasswordCorrectAdmin = await bcript.compare(password, adminExist.password,);
        if (!isPasswordCorrectAdmin) { throw new Error('Wrong password, try again!'); }

        return {
            token: helpers.tokenHelpers.createToken(
                adminExist,
                process.env.JWT_SECRET,
                '10hr',
            ),
        };
    },

    /**CREAR ADMINISTRADOR*/
    createAdmin: async ({ admin }) => {
        const { Email, password } = admin;
        const adminExist = await Admin.findOne({ Email });
        if (adminExist) { throw new Error("Admin already exist "); }
        if (!admin) { throw new Error('No esta llegando la data'); }

        try {
            const hash = await bcript.hash(password, 10);
            const newAdmin = new Admin({ ...admin, password: hash });
            return await newAdmin.save();
        } catch (error) {
            console.log(error)
        }
    },

    updateAdmin: async ({ admin }) => {
        if (!admin._id) {
            throw new Error('needed ID to update');
        }

        const currentAdmin = await Admin.findOne({ _id: admin._id, });

        if (!currentAdmin) {
            throw new Error('Admin doesnt exist');
        }

        try {
            return await Admin.findByIdAndUpdate({ _id: admin._id }, admin, { new: true, });
        } catch (error) {
            console.log(error)
        }
    },

    deleteAdmin: async ({admin}) =>{
        if (!admin._id) {
            throw new Error('needed id to remove');
        }

        const currentAdmin = await Admin.findOne({ _id: admin._id, });

        if (!currentAdmin) {
            throw new Error('Admin doesnt exist');
        }

        try {
            await Admin.findByIdAndDelete({_id: admin._id}, admin);
            return `ADMIN WITH ID ${admin._id} DELETE`;
        } catch (error) {
            console.log(error);
        }
    },
};

export default adminResolver;