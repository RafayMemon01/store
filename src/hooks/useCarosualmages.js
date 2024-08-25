import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
const useCarouselImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "carouselImages"));
        const imagesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setImages(imagesData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const addImage = async (file) => {
    try {
      const storageRef = ref(storage, `carousel/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      const docRef = await addDoc(collection(db, "carouselImages"), { imageUrl });
      return docRef.id;
    } catch (err) {
      setError(err);
    }
  };

  const deleteImage = async (id, imageUrl) => {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      await deleteDoc(doc(db, "carouselImages", id));
    } catch (err) {
      setError(err);
    }
  };

  return { images, loading, error, addImage, deleteImage };
};

export default useCarouselImages;
