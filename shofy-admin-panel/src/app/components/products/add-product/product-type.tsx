import React,{useEffect} from "react";
import ReactSelect from "react-select";
import { FieldErrors, Controller, Control } from "react-hook-form";
import ErrorMsg from "../../common/error-msg";

// In essence, this page handles product type selection with validation and integrates 
// with the form state management of react-hook-form.

// prop type
//This code defines a TypeScript type called IPropType, which is used to specify the 
//expected types for the props that the component will receive. Here’s a breakdown of each 
//property in IPropType:
// errors: FieldErrors<any>: This prop will hold the error messages related to form validation, 
// specifically using react-hook-form. The type FieldErrors<any> is from react-hook-form and 
// represents the errors for form fields. The any allows flexibility in the type of data 
// associated with errors.

// control: Control: This prop represents the control object from react-hook-form, 
// which is used to manage form inputs and their state. It helps in connecting the form to 
// the form state management system (e.g., registering inputs, handling validation, etc.).

// setSelectProductType: React.Dispatch<React.SetStateAction<string>>: This prop is a 
//function 
// used to update the selected product type in the parent component's state. 
// React.Dispatch<React.SetStateAction<string>> is the type of the setter function 
// returned by the useState hook, and it expects a new state value of type string.

// default_value?: string: This optional prop is a string that can hold a default value 
// for the product type selection. If not provided, the default value will be undefined.

// In summary, IPropType defines the structure and types for the props that the ProductType 
// component expects to receive, including form management, error handling, state management 
// for the product type, and an optional default value.

type IPropType = {
  errors: FieldErrors<any>;
  control: Control;
  setSelectProductType: React.Dispatch<React.SetStateAction<string>>;
  default_value?:string;
};

const ProductType = ({
  errors,
  control,
  default_value,
  setSelectProductType,
}: IPropType) => {
  // handleSelectProduct
  const handleSelectProduct = (value: string) => {
    setSelectProductType(value);
  };
  // set default product
  useEffect(() => {
    if(default_value){
      setSelectProductType(default_value)
    }
  }, [default_value, setSelectProductType])
  
  return (
    <>
      <Controller
        name="productType"
        control={control}
        rules={{
          required: default_value
            ? false
            : "productType is required!",
        }}
        render={({ field }) => (
          <ReactSelect
            {...field}
            value={field.value}
            defaultValue={
              default_value
                ? {
                    label: default_value,
                    value: default_value,
                  }
                : {
                    label: "Select..",
                    value: 0,
                  }
            }
            onChange={(selectedOption) => {
              field.onChange(selectedOption);
              handleSelectProduct(selectedOption?.value);
            }}
            options={[
              { value: "electronics", label: "Electronics" },
              { value: "fashion", label: "Fashion" },
              { value: "beauty", label: "Beauty" },
              { value: "jewelry", label: "Jewelry" },
            ]}
          />
        )}
      />
      <ErrorMsg msg={errors?.productType?.message as string} />
    </>
  );
};

export default ProductType;
