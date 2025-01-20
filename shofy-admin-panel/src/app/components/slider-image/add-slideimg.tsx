"use client";
import React from "react";
import useSlideimgSubmit from "@/hooks/useSlideimgSubmit";
import ProductType from "../products/add-product/product-type";
import SlideimgTables from "./slideimg-tables";
import SlideimgImgUpload from "./global-img-upload";
import SlideimgChildren from "./slideimg-children";
import SlideimgParent from "./slideimg-parent";
import SlideimgDescription from "./slideimg-description";

//AddSlideimg is a React functional component responsible for managing and rendering the UI 
//and logic for adding a new slide image.
// The user submits the form in AddSlideimg.
// This triggers handleSubmit(handleSubmitSlideimg), which calls the handleSubmitSlideimg 
//function from useSlideimgSubmit.ts.
// Importing:
// In AddSlideimg, you import the useSlideimgSubmit hook and get access to the functions 
// and variables defined inside useSlideimgSubmit.ts.
// You use these variables and functions to control the form, handle image uploads, set product 
// types, and other form-related interactions.

const AddSlideimg = () => {
  const {
    selectProductType,
    setSelectProductType,
    errors,
    control,
    slideimgChildren,
    setSlideimgChildren,
    register,
    handleSubmit,
    handleSubmitSlideimg,
    setSlideimgImg,
    slideimgImg,
    error,
    isSubmitted,
    // This is a custom React hook
  } = useSlideimgSubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        <form onSubmit={handleSubmit(handleSubmitSlideimg)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
          
{/* This is React component and uploading pic to cloudinary*/}
{/* SlideimgImgUpload component is responsible for handling the image upload. 
When an image is uploaded via the backend (cloudinary.controller.js), the Cloudinary 
//API responds with a secure_url (public URL) and a public_id (a unique identifier for 
//the image). This data is returned in the response to the frontend.
useSlideimgSubmit.ts:
The useSlideimgSubmit hook is where the image upload process is managed and integrated 
with form submission. In this hook, you likely handle the image state (slideimgImg) and 
its associated upload functionality. When the image is uploaded via Cloudinary, you'll 
update the state with the secure_url returned from the backend.*/}
{/* When the SlideimgImgUpload component receives the secure_url from the backend response, 
it calls setSlideimgImg(secure_url) to update the slideimgImg state with the Cloudinary 
image URL. 

Refined
Image Upload and secure_url:
In the AddSlideimg, the SlideimgImgUpload component handles image uploads. 
Once the image is uploaded to Cloudinary, it receives a response containing the secure_url. 
This URL is then passed to the setSlideimgImg function via the setImage prop.

<SlideimgImgUpload
  isSubmitted={isSubmitted}
  setImage={setSlideimgImg} // secure_url is passed here to update the state
  image={slideimgImg} // Holds the current secure_url of the uploaded image
/>
State in useSlideimgSubmit.ts:
In useSlideimgSubmit.ts, the slideimgImg state is initialized as an empty string using 
useState.

const [slideimgImg, setSlideimgImg] = useState<string>(""); // Initial state is an empty string
The setSlideimgImg function updates the slideimgImg state with the secure_url when it's 
received from the SlideimgImgUpload component.*/}
      <SlideimgImgUpload
              isSubmitted={isSubmitted}
              setImage={setSlideimgImg}
 // The updated slideimgImg state holds the secure_url.              
              image={slideimgImg}
            />
            {/* slideimg image upload */}

            {/* slideimg parent */}
            <SlideimgParent register={register} errors={errors} />
            {/* slideimg parent */}

            <SlideimgChildren
              slideimgChildren={slideimgChildren}
              setSlideimgChildren={setSlideimgChildren}
              error={error}
            />

            {/* Product Type */}
            <div className="mb-6">
              <p className="mb-0 text-base text-black">Product Type</p>
              <div className="slideimg-add-select select-bordered">
                <ProductType
                  setSelectProductType={setSelectProductType}
                  control={control}
                  errors={errors}
                />
              </div>
            </div>
            {/* Product Type */}

            {/* Slideimg Description */}
            <SlideimgDescription register={register} />
            {/* Slideimg Description */}

            <button className="tp-btn px-7 py-2">Add Slideimg</button>
          </div>
        </form>
      </div>
      <div className="col-span-12 lg:col-span-8">
        <SlideimgTables />
      </div>
    </div>
  );
};

export default AddSlideimg;
