import create from 'zustand';
import { db, storage } from '../firebase/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const useCarouselStore = create((set) => ({
  images: [],
  loading: true,
  error: null,
  fetchImages: async () => {
    set({ loading: true });
    try {
      const querySnapshot = await getDocs(collection(db, 'carouselImages'));
      const imagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      set({ images: imagesData, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
  addImage: async (file) => {
    try {
      const storageRef = ref(storage, `carousel/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      const docRef = await addDoc(collection(db, 'carouselImages'), { imageUrl });
      const newImage = { id: docRef.id, imageUrl };
      set((state) => ({
        images: [...state.images, newImage]
      }));
    } catch (err) {
      set({ error: err });
    }
  },
  deleteImage: async (id, imageUrl) => {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      await deleteDoc(doc(db, 'carouselImages', id));
      set((state) => ({
        images: state.images.filter(image => image.id !== id)
      }));
    } catch (err) {
      set({ error: err });
    }
  },
}));

export default useCarouselStore;
