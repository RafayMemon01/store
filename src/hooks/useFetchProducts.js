// src/hooks/useFetchProducts.js

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Import Firestore from your Firebase setup
import useProductStore from "../Store/useProductStore"; // Import Zustand store

const useFetchProducts = () => {
  const setProducts = useProductStore((state) => state.setProducts); // Zustand action to set products
  const [loading, setLoading] = useState(true); // Local state for loading
  const [error, setError] = useState(null); // Local state for errors

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "products")); // Fetching products from Firestore
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        console.log("Fetched Products:", productsData); // Add this line to log fetched products
        
        setProducts(productsData); // Update Zustand store with fetched products
      } catch (err) {
        setError(err);
        console.error("Error fetching products:", err); // Add this line to log errors
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [setProducts]);
   // Dependency on setProducts to ensure it is always the latest reference

  return { loading, error };
};

export default useFetchProducts;
