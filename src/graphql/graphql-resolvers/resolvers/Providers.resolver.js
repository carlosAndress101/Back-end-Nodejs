import Provider from "../../../model/providers/provider";

const providerResolver = {
  Providers: async () => await Provider.find(),

  createProvider: async ({ provider }) => {
    if (!provider) {
      throw new Error("Provider are not arriving");
    }

    try {
      const newProvider = new Provider(provider);
      return await newProvider.save();
    } catch (error) {
      console.log(error);
    }
  },

  updateProvider: async ({ provider }) => {
    if (!provider.code) {
      throw new Error("needed id to update");
    }

    const currentProvider = await Provider.findOne({
      code: provider.code,
    });

    if (!currentProvider) {
      throw new Error("Provider dosen't exist");
    }

    try {
      return await Provider.findByIdAndUpdate(
        { code: provider.code },
        provider,
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  },

  deleteProvider: async ({ provider }) => {
    if (!provider.code) {
      throw new Error("needed code to delete");
    }

    const currentProvider = Provider.findOne({ code: provider.code });

    if (!currentProvider) {
      throw new Error("provider dosen't exist");
    }

    try {
      await Provider.findByIdAndRemove({ code: provider.code }, provider);
      return `Provider whith code ${provider.code} delete`;
    } catch (error) {
      console.log(error);
    }
  },
};
export default providerResolver;
