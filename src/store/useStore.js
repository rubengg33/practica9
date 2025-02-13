import {create} from "zustand";

const useStore = create((set) => ({
  likes: {}, // Guardará los likes por curso
  setLike: (courseId, likes) => set((state) => ({
    likes: { ...state.likes, [courseId]: likes }
  }))
}));

export default useStore;
