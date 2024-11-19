//***src\hooks\useProductSubmit.tsx***

"use client";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import {useRouter} from 'next/navigation';
//useAddProductMutation adds a new product, while useEditProductMutation edits an existing
import { useAddProductMutation, useEditProductMutation } from "@/redux/product/productApi";
//These utility functions display toast notifications for success or error messages,
//improving user feedback on actions like successful form submissions or errors.
import { notifyError, notifySuccess } from "@/utils/toast";

// ImageURL type
// this code doesn't actually generate any URLs. It only defines the structure of an
// ImageURL object, setting up a "template" to make sure any image data follows the
// same format. To generate URLs or store images, you'll need separate functions or
// methods that create or fetch URLs and assign them to objects matching this ImageURL
// structure.
export interface ImageURL {
  color: {
    name?: string;
    clrCode?: string;
  };
  img: string;
  sizes?: string[];
}
//This code defines a custom IBrand type. It specifies that any object of this type must 
//have two properties: name and id, both of which are strings. This type can be used to
//ensure consistent structure for brand-related data across your code.
type IBrand = {
  name: string;
  id: string;
};
type ICategory = {
  name: string;
  id: string;
};

// Drop down: This defines a TypeScript literal type called status. It limits the variable 
// values to three specific string options: "in-stock", "out-of-stock", or "discontinued".
// Any variable of type status can only hold one of these exact values, helping prevent invalid
// or unexpected data entries.
type status = "in-stock" | "out-of-stock" | "discontinued";

// below we are setting states
// 1. Setting Up State Variables 
const useProductSubmit = () => {
  const [sku, setSku] = useState<string>("");
  // Inside the hook, a state variable img is created with the useState hook. 
  // The img variable is initialized as an empty string (""), which will represent the image
  // URL or data related to the product image.
  const [img, setImg] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [imageURLs, setImageURLs] = useState<ImageURL[]>([]);
  const [parent, setParent] = useState<string>("");
  const [children, setChildren] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [brand, setBrand] = useState<IBrand>({ name: "", id: "" });
  const [category, setCategory] = useState<ICategory>({ name: "", id: "" });
  const [status, setStatus] = useState<status>("in-stock");
  const [productType, setProductType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");
  const [offerDate, setOfferDate] = useState<{
    startDate: null;
    endDate: null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [additionalInformation, setAdditionalInformation] = useState<
    {
      key: string;
      value: string;
    }[]
  >([]);
  const [tags, setTags] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const router = useRouter();

  //The handleSubmitProduct function is responsible for constructing the product data 
  //object and invoking the addProduct mutation to submit the new product to the backend.
  // useAddProductMutation
  //In your code, the value of addProductData,When a product is successfully added, you might want
  //to display a success message or perform some action based on the returned data.
  // For example, after a successful addition, you can show a toast notification or update 
  //the UI with the newly added product details.
  //Yes, exactly! These are default values provided by Redux Toolkit's RTK Query,
  // not custom properties. When you call a mutation hook like useAddProductMutation, 
  //Redux Toolkit automatically includes metadata such as data, isError, isLoading, 
  //and others to handle the mutation state. These values are designed to help with tracking
  // the success, error, and loading status of mutations without
  const [addProduct, { data: addProductData, isError, isLoading }] =
    useAddProductMutation();
  // useAddProductMutation
  const [editProduct, { data: editProductData, isError: editErr, isLoading: editLoading }] =
    useEditProductMutation();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();

  // 2.Resetting the Form 
  // resetForm
  const resetForm = () => {
    setSku("");
    setImg("");
    setTitle("");
    setSlug("");
    setUnit("");
    setImageURLs([]);
    setParent("");
    setChildren("");
    setPrice(0);
    setDiscount(0);
    setQuantity(0);
    setBrand({ name: "", id: "" });
    setCategory({ name: "", id: "" });
    setStatus("in-stock");
    setProductType("");
    setDescription("");
    setVideoId("");
    setOfferDate({
      startDate: null,
      endDate: null,
    });
    setAdditionalInformation([]);
    setTags([]);
    setSizes([]);
    reset();
  };

  // 3. Handling Product Submission
  // handle submit product
  const handleSubmitProduct = async (data: any) => {
    // console.log("product data--->", data);

    // product data
    const productData = {
      sku: data.SKU,
      img: img,
      title: data.title,
      slug: slugify(data.title, { replacement: "-", lower: true }),
      unit: data.unit,
      imageURLs: imageURLs,
      parent: parent,
      children: children,
      price: data.price,
      discount: data.discount_percentage,
      quantity: data.quantity,
      brand: brand,
      category: category,
      status: status,
      offerDate: {
        startDate: offerDate.startDate,
        endDate: offerDate.endDate,
      },
      productType: productType,
      description: data.description,
      videoId: data.youtube_video_Id,
      additionalInformation: additionalInformation,
      tags: tags,
    };

    console.log('productData-------------------..>',productData)


    if (!img) {
      return notifyError("Product image is required");
    }
    if (!category.name) {
      return notifyError("Category is required");
    }
    if (Number(data.discount) > Number(data.price)) {
      return notifyError("Product price must be gether than discount");
    } else {
      const res = await addProduct(productData);
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Product created successFully");
        setIsSubmitted(true);
        resetForm();
        router.push('/product-grid')
      }
    }
  };
  // 4. Handling Product Editing
  const handleEditProduct = async (data: any, id: string) => {
    // product data
    const productData = {
      sku: data.SKU,
      img: img,
      title: data.title,
      slug: slugify(data.title, { replacement: "-", lower: true }),
      unit: data.unit,
      imageURLs: imageURLs,
      parent: parent,
      children: children,
      price: data.price,
      discount: data.discount_percentage,
      quantity: data.quantity,
      brand: brand,
      category: category,
      status: status,
      offerDate: {
        startDate: offerDate.startDate,
        endDate: offerDate.endDate,
      },
      productType: productType,
      description: data.description,
      videoId: data.youtube_video_Id,
      additionalInformation: additionalInformation,
      tags: tags,
    };
    console.log('edit productData---->',productData)
    const res = await editProduct({ id: id, data: productData });
    if ("error" in res) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message?: string };
        if (typeof errorData.message === "string") {
          return notifyError(errorData.message);
        }
      }
    } else {
      notifySuccess("Product edit successFully");
      setIsSubmitted(true);
      router.push('/product-grid')
      resetForm();
    }
  };

  return {
    sku,
    setSku,
    img,
    setImg,
    title,
    setTitle,
    slug,
    setSlug,
    unit,
    setUnit,
    imageURLs,
    setImageURLs,
    parent,
    setParent,
    children,
    setChildren,
    price,
    setPrice,
    discount,
    setDiscount,
    quantity,
    setQuantity,
    brand,
    setBrand,
    category,
    setCategory,
    status,
    setStatus,
    productType,
    setProductType,
    description,
    setDescription,
    videoId,
    setVideoId,
    additionalInformation,
    setAdditionalInformation,
    tags,
    setTags,
    sizes,
    setSizes,
    handleSubmitProduct,
    handleEditProduct,
    register,
    handleSubmit,
    errors,
    control,
    offerDate,
    setOfferDate,
    setIsSubmitted,
    isSubmitted,
  };
};

export default useProductSubmit;
