import React, { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
// internal
import { Delete, Edit } from "@/svg";
import { notifyError } from "@/utils/toast";
import { useDeleteProductMutation } from "@/redux/product/productApi";
import EditTooltip from "../../tooltip/edit-tooltip";
import DeleteTooltip from "../../tooltip/delete-tooltip";

const ProductGridAction = ({ id }: { id: string }) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const [deleteProduct, { data: delData }] = useDeleteProductMutation();

  const handleDelete = async (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete this product ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteProduct(productId);
          if ("error" in res) {
            if ("data" in res.error) {
              const errorData = res.error.data as { message?: string };
              if (typeof errorData.message === "string") {
                return notifyError(errorData.message);
              }
            }
          } else {
            Swal.fire("Deleted!", `Your product has been deleted.`, "success");
          }
        } catch (error) {}
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="relative">
        <Link href={`/edit-product/${id}`}>
          <button
            onMouseEnter={() => setShowEdit(true)}
            onMouseLeave={() => setShowEdit(false)}
            className="w-10 h-10 leading-10 text-tiny bg-success text-white rounded-md hover:bg-green-600"
          >
            <Edit />
          </button>
        </Link>

        <EditTooltip showEdit={showEdit} />
      </div>
      <div className="relative">
        <button
          onClick={() => handleDelete(id)}
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
          className="w-10 h-10 leading-[33px] text-tiny bg-white border border-gray text-slate-600 rounded-md hover:bg-danger hover:border-danger hover:text-white"
        >
          <Delete />
        </button>

        <DeleteTooltip showDelete={showDelete} />
      </div>
    </div>
  );
};

export default ProductGridAction;

// Here's how product-grid-area.tsx, product-grid-item.tsx, and product-grid-action.tsx work together:

// product-grid-area.tsx: This is the main container component that renders the product listing grid. It maps over productItems to create individual product cards by using ProductGridItem for each product.

// product-grid-item.tsx: This component represents a single product card in the grid. It receives product data as a prop, which it destructures to access details like the product image, title, price, and rating.

// Within each product card, product-grid-item.tsx includes a ProductGridAction component, which adds interactive buttons for editing and deleting the product.

// product-grid-action.tsx: This component handles the actions (edit and delete) for each product card. It provides functionality to delete a product (through Redux mutation) and includes tooltips and confirmation prompts for these actions.

// Relationship: product-grid-area.tsx is responsible for generating the entire product grid, product-grid-item.tsx is used to render each individual product, and product-grid-action.tsx provides actions for each product item.

// Together, they create a modular structure, with each file handling a specific responsibility—listing products, displaying individual product details, and managing product actions.

// This setup allows each component to be reusable, maintainable, and isolated for different parts of the product grid functionality.