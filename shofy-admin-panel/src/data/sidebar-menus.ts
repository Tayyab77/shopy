
// data folder
// Purpose: Stores static or dynamic data used across the app.
// Examples: JSON files, mock data, constants, or API response mappings.
// Useful for centralizing data that doesn't change often.

import { ISidebarMenus } from "./../types/menu-types";
import {
  Dashboard,
  Categories,
  Coupons,
  Orders,
  Pages,
  Products,
  Profile,
  Reviews,
  Setting,
  Leaf,
  StuffUser,
} from "@/svg";

const sidebar_menu: Array<ISidebarMenus> = [
  {
    id: 1,
    icon: Dashboard,
    link: "/dashboard",
    title: "Dashboard",
  },
  {
    id: 2,
    icon: Products,
    link: "/product-list",
    title: "Products",
    subMenus: [
      { title: "Product List", link: "/product-list" },
      { title: "Product Grid", link: "/product-grid" },
      { title: "Add Product", link: "/add-product" }
    ],
  },
  {
    id: 3,
    icon: Categories,
    link: "/category",
    title: "Category",
  },
  {
    id: 4,
    icon: Orders,
    link: "/orders",
    title: "Orders",
  },
  {
    id: 5,
    icon: Leaf,
    link: "/brands",
    title: "Brand",
  },
  {
    id: 6,
    icon: Reviews,
    link: "/reviews",
    title: "Reviews",
  },
  {
    id: 7,
    icon: Coupons,
    link: "/coupon",
    title: "Coupons",
  },
  {
    id: 8,
    icon: Profile,
    link: "/profile",
    title: "Profile",
  },
  {
    id: 9,
    icon: Setting,
    link: "#",
    title: "Online store",
  },
  {
    id: 10,
    icon: StuffUser,
    link: "/our-staff",
    title: "Our Staff",
  },
  {
    id: 11,
    icon: Pages,
    link: "/dashboard",
    title: "Pages",
    subMenus: [
      { title: "Register", link: "/register" },
      { title: "Login", link: "/login" },
      { title: "Forgot Password", link: "/forgot-password" }
    ],
  },
// This is a JavaScript object likely representing a menu or navigation item in a 
// web application.
// Usage: This object is likely part of a list that dynamically generates the application's 
// sidebar or navigation menu.
  {
    id: 12,
    icon: Categories,
    link: "/slider-images",
    title: "Slider Images",
  },
];

export default sidebar_menu;
