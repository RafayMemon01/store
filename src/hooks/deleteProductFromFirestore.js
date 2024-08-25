import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // Import your Firestore setup

const deleteProductFromFirestore = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
    console.log(`Product with ID ${productId} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting product: ', error);
    throw new Error('Failed to delete product. Please try again.');
  }
};

export default deleteProductFromFirestore;
