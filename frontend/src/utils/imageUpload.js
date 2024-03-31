import axios from "axios";
import "dotenv/config";

export const imageUpload = async (images) => {
  const formData = new FormData();
  formData.append("file", images);

  formData.append("upload_preset", process.env.API_CLOUDINARY_UPLOAD_PRESET);
  formData.append("cloud_name", process.env.API_CLOUDINARY_CLOUD_NAME);
  const res = await axios.post(process.env.API_CLOUDINARY_URL, formData)

  const data = await res.json();

  return { pubic_id: data.public_id, url: data.secure_url };
}