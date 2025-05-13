import axios from "axios";

const uploadToImgBB = async (file: File) => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const formData = new FormData();
  formData.append("image", file);

  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return {
      url: data.data.url as string,
      id: data.data.id,
    };
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    throw error;
  }
};

export default { uploadToImgBB };
