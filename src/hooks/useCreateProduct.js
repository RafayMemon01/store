import { useState } from "react";
import { addDoc, collection, updateDoc, arrayUnion, doc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useProductStore from "../Store/useProductStore"; 

function useCreateProduct() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);

  const { addProduct } = useProductStore(); 
  const handleCreateProduct = async (selectedFile, productName, productDescription, productPrice) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("No file selected");
    setIsLoading(true);

    const newProduct = {
      name: productName,
      description: productDescription,
      price: productPrice,
      createdAt: Date.now(),
    };

    try {
      const productDocRef = await addDoc(collection(db, "products"), newProduct);
      const imageRef = ref(storage, `product/${productDocRef.id}`);

      await uploadString(imageRef, selectedFile, "data_url");

      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(productDocRef, { imageURL: downloadURL });
      newProduct.imageURL = downloadURL;

      addProduct({ ...newProduct, id: productDocRef.id });

      showToast("Success", "Product created successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCreateProduct, isLoading };
}

export default useCreateProduct;
