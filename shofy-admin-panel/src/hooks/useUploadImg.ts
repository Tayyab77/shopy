import { useUploadImageMutation } from "@/redux/cloudinary/cloudinaryApi";


//The useUploadImage custom hook provides a function to handle image uploads by 
//interacting with a Cloudinary API mutation (useUploadImageMutation) from Redux.
//The hook uses useUploadImageMutation from the cloudinaryApi Redux slice.

const useUploadImage = () => {
  //uploadData: The response from the upload request.
  const [uploadImage, { data: uploadData, isError, isLoading, error }] =
    useUploadImageMutation();

  //handleImageUpload is triggered when a file is selected via the file input element.
  //It checks if a file is selected, creates a FormData object, appends the selected file, 
  //and then triggers the uploadImage mutation to upload the image.
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      uploadImage(formData);
    }
  };
  
  //In this case, the return statement is returning an object with several properties. 
// handleImageUpload: A function (likely used to handle image upload events).
// uploadData: Likely the data related to the image upload, such as the URL or file information.
// isError: A boolean or state indicating whether an error occurred during the upload process.
// isLoading: A boolean or state indicating whether the upload is in progress.
// error: The actual error message or object, if an error occurred.
  return {
    handleImageUpload,
    uploadData,
    isError,
    isLoading,
    error,
  };
};

export default useUploadImage;
