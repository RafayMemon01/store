import create from 'zustand';

const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => {
    console.log("Setting products in store:", products); // Add this line
    set({ products });
  },
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ),
    })),
  deleteProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
}));

export default useProductStore;