import { create } from "zustand";

const useStore = create((set) => ({
    image_file: "",
    set_image_file: (file) => set({ image_file: file }),
}));

export default useStore;
