export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("file", image);

  // formData.append("upload_preset", process.env.REACT_APP_API_CLOUDINARY_UPLOAD_PRESET);
  // formData.append("cloud_name", process.env.REACT_APP_API_CLOUDINARY_CLOUD_NAME);
  // const res = await axios.post(process.env.REACT_APP_API_CLOUDINARY_URL, formData)
  formData.append("upload_preset", "tnqvinp5");
  formData.append("cloud_name", "dfdkmd9xz");
  const res = await fetch(`https://api.cloudinary.com/v1_1/dfdkmd9xz/image/upload`, {
    method: "POST",
    body: formData,
  })

  const data = await res.json();

  return { pubic_id: data.public_id, url: data.secure_url };
}