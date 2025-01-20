import React, { useEffect } from "react";
import Image from "next/image";
import useUploadImage from "@/hooks/useUploadImg";
import upload_default from "@assets/img/icons/upload.png";
import Loading from "../common/loading";
//Here we have api
import UploadImage from "../products/add-product/upload-image";

// IPropType defines the expected props, such as:
// setImage: Updates the image URL in the parent component.
// isSubmitted: Tracks if the form is submitted.
// Optional props like default_img (default image), image (current image URL), 
// and setIsSubmitted.
type IPropType = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  isSubmitted: boolean;
  default_img?: string;
  image?: string;
  setIsSubmitted?:React.Dispatch<React.SetStateAction<boolean>>
};

// This is a React component, GlobalImgUpload, which:
// Accepts props to manage image states (setImage, isSubmitted, default_img, image, 
// setIsSubmitted).
// Uses the custom hook useUploadImage to handle image upload logic (handleImageUpload), 
// upload data, errors, and loading state.
// Determines whether to show a default image (showDefaultImage) based on the absence of 
// upload data, loading, or errors, and the presence of a default_img.
// Simplifies image upload integration with real-time status updates.
// Helps render dynamic UI based on upload states and manages interactions for image uploads.
const GlobalImgUpload = ({setImage,isSubmitted,default_img,image,setIsSubmitted}: IPropType) => {
  const { handleImageUpload, uploadData, isError, isLoading } = useUploadImage();
  const showDefaultImage = !uploadData && !isLoading && !isError && default_img;

// This code dynamically decides what to render for upload_img based on the current upload 
// state: If isLoading, it displays a loading spinner using the Loading component.
// If an image upload is successful (uploadData?.data.url), it renders the UploadImage 
// component with the uploaded file's details.
// If there’s no upload and a default_img is provided, it displays the default image.
// If none of the above conditions are met, it falls back to a generic placeholder image 
// (upload_default).
// The logic prioritizes showing relevant feedback based on upload progress or results.
  const upload_img = isLoading ? (
    <Loading loading={isLoading} spinner="scale" />
  ) : uploadData?.data.url ? (
    <UploadImage
      file={{
        url: uploadData.data.url,
        id: uploadData.data.id,
      }}
      isCenter={true}
      setImgUrl={setImage}
    />
  ) : showDefaultImage ? (
    <Image src={default_img} alt="upload-img" width={100} height={91} />
  ) : (
    <Image src={upload_default} alt="upload-img" width={100} height={91} />
  );

  // set upload image
// This code contains two useEffect hooks managing state updates:
// The first hook sets isSubmitted to false whenever an image upload is in progress 
// (isLoading) and the setIsSubmitted function is available. The second hook updates the 
// image URL using uploadData once the upload is successful and no errors or loading states 
// are present. If the upload fails or isn’t performed, it defaults to using default_img 
// (if provided). Dependencies like isLoading, uploadData, and default_img ensure these 
// effects run at the right time. Together, they handle submission states and dynamically 
// manage the image URL for the component.
  useEffect(() => {
    if(isLoading && setIsSubmitted){
      setIsSubmitted(false)
    }
  }, [isLoading, setIsSubmitted]);

  useEffect(() => {
    if (uploadData && !isError && !isLoading) {
      setImage(uploadData.data.url);
    } else if (default_img) {
      setImage(default_img);
    }
  }, [default_img, uploadData, isError, isLoading, setImage]);
  

  // This code renders an image upload section with a label and input field. It displays a 
  // placeholder image or custom content based on whether the form is submitted (isSubmitted). 
  // The file input accepts specific image types (png, jpg, jpeg, webp). A label is styled as 
  // a button for user interaction, triggering the file upload. The layout is designed with 
  // margin spacing, center alignment, and hover effects for better user experience.
  //The return statement specifies the content that should appear on the screen based on 
  //the component's logic and state.
  return (
    <div className="mb-6">
      <p className="mb-2 text-base text-black">Upload Image</p>
      <div className="text-center">
        {isSubmitted ? (
          <Image
            src={upload_default}
            alt="upload-img"
            width={100}
            height={91}
          />
        ) : (
          upload_img
        )}
      </div>
      <span className="text-tiny text-center w-full inline-block mb-3">
        (Only png* jpg* jpeg* webp/ will be accepted)
      </span>
      <div className="">
        <input
          onChange={handleImageUpload}
          type="file"
          name="image"
          id="categoryImage"
          className="hidden"
        />
        <label
          htmlFor="categoryImage"
          className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
        >
          Upload Image
        </label>
      </div>
    </div>
  );
};

export default GlobalImgUpload;
