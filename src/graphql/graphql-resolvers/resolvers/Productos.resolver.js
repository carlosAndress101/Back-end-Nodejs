import Productos from "../../../model/productos/Productos";

const productoResolver = {
  /**GET PRODUCTOS */
  Products: async () => await Productos.find(),

  /**PRODUCT */
  createProducts: async ({ producto }) => {
    if (!producto) {
      throw new Error("Products are not arriving");
    }
    try {
      const newProductos = new Productos(producto);
      return await newProductos.save();
    } catch (error) {
      console.log(`Problema al crear producto revisar - ${error}`);
    }
  },

  updateProducts: async ({ producto }) => {
    if (!producto._id) {
      throw new Error("needed id to update");
    }

    const currentProducto = await Productos.findOne({
      _id: producto._id,
    });

    if (!currentProducto) {
      throw new Error("product doesn's exist");
    }

    try {
      return await Productos.findByIdAndUpdate(
        { _id: producto._id },
        producto,
        {
          new: true,
        }
      );
    } catch (error) {
      console.log(`Problemas para actualizar provider revisar - ${error}`);
    }
  },

  deleteProducts: async ({ producto }) => {
    if (!producto._id) {
      throw new Error("needed id to delete");
    }

    const currentProducto = await Productos.findOne({
      _id: producto._id,
    });

    if (!currentProducto) {
      throw new Error("products doesn's exist");
    }

    try {
      await Productos.findByIdAndRemove({ _id: producto._id }, producto);
      return `Products whith ID ${producto._id} delete`;
    } catch (error) {
      console.log(`Problemas para eliminar provider revisar - ${error}`);
    }
  },
};
export default productoResolver;
