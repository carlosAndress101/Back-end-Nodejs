import Provider from "../../../model/providers/provider";

const providerResolver = {
  /**GET PROVEDORES */
  Providers: async () => await Provider.find(),

  /**PROVIDER */
  createProvider: async ({ provider }) => {
    if (!provider) {
      throw new Error("Provider are not arriving");
    }

    try {
      const newProvider = new Provider(provider);
      return await newProvider.save();
    } catch (error) {
      console.log(`Problemas para crear provider revisar - ${error}`);
    }
  },

  updateProvider: async ({ provider }) => {
    if (!provider._id) {
      throw new Error("needed id to update");
    }

    const currentProvider = await Provider.findOne({
      _id: provider._id,
    });

    if (!currentProvider) {
      throw new Error("Provider dosen't exist");
    }

    try {
      return await Provider.findByIdAndUpdate(
        { _id: provider._id },
        provider,
        { new: true }
      );
    } catch (error) {
      console.log(`Problemas para actualizar provider revisar - ${error}`);
    }
  },

  deleteProvider: async ({ provider }) => {
    if (!provider._id) {
      throw new Error("needed code to delete");
    }

    const currentProvider = Provider.findOne({ _id: provider._id });

    if (!currentProvider) {
      throw new Error("provider dosen't exist");
    }

    try {
      await Provider.findByIdAndRemove({ _id: provider._id }, provider);
      return `Provider whith code ${provider._id} delete`;
    } catch (error) {
      console.log(`Problemas para eliminar provider revisar - ${error}`);
    }
  },
};
export default providerResolver;
