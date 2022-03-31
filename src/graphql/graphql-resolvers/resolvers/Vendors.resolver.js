import Vendors from '../../../model/vendors/Vendors';

const VendorsResolver = {

    DVendors: async () => await Vendors.find(),

    createVendors: async ({vendors}) => {

        if(!vendors){
            throw new Error(`no esta llegado la data`);
        }

        try {
            const newVendors = new Vendors(vendors);
            return await newVendors.save();
        } catch (error) {
            console.log(error);
        }
    },

    updateVendors: async ({vendors}) => {
        if(!vendors._id){
            throw new Error(`needed ID to update`);
        }

        const currentVendors = await Vendors.findOne({
            _id: vendors._id,
        });

        if (!currentVendors){
            throw new Error(`Vendors doesn't exist`);
        }

        try {
            return await Vendors.findByIdAndUpdate({_id: vendors._id}, vendors, {new:true,});
        } catch (error) {
            console.log(error);
        }
    },

    deleteVendors: async ({ vendors }) => {
        if(!vendors._id){
            throw new Error(`needed ID to remove`);
        }

        const currentVendors = await Vendors.findOne({
            _id: vendors._id,
        });

        if (!currentVendors){
            throw new Error(`Vendors doesn't exist`);
        }

        try {
            await Vendors.findByIdAndRemove({_id: vendors._id}, vendors);
            return `VENDORS WITH ID ${vendors._id} REMOVE`;
        } catch (error) {
            console.log(error);
        }
    },
};

export default VendorsResolver;