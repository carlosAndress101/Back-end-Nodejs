import Client from "../../../model/client/Client";

const clientResolver = {
  Clients: async () => await Client.find(),

  createClient: async ({ client }) => {
    if (!client) {
      throw new Error("no esta llegando la data");
    }

    try {
      const newClient = new Client(client);
      return await newClient.save();
    } catch (error) {
      console.log(error);
    }
  },

  updateClient: async ({ client }) => {
    if (!client._id) {
      throw new Error("needed ID to update");
    }

    const currentClient = await Client.findOne({
      _id: client._id,
    });

    if (!currentClient) {
      throw new Error("Client doesn't exist");
    }

    try {
      return await Client.findByIdAndUpdate({ _id: client._id }, client, {
        new: true,
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteClient: async ({ client }) => {
    if (!client._id) {
      throw new Error("needed id to remove");
    }

    const currentClient = await Client.findOne({ _id: client._id });

    if (!currentClient) {
      throw new Error("User doesn't exist");
    }

    try {
      await Client.findByIdAndDelete({ _id: client._id }, client);
      return `CLIENT WITH ID ${client._id} DELETE`;
    } catch (error) {
      console.log(error);
    }
  },
};

export default clientResolver;
