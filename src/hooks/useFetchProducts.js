// src/hooks/useFetchProducts.js

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; 
import useProductStore from "../Store/useProductStore"; 

const useFetchProducts = () => {
  const setProducts = useProductStore((state) => state.setProducts); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        console.log("Fetched Products:", productsData);
        
        setProducts(productsData); 
      } catch (err) {
        setError(err);
        console.error("Error fetching products:", err); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [setProducts]);
   

  return { loading, error };
};

export default useFetchProducts;
