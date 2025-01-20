export interface ISlideimgItem {
  _id: string;
  img: string;
  parent: string;
  children: string[];
  productType: string;
  products?: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SlideimgResponse {
  success: boolean;
  result: ISlideimgItem[];
}

export interface IAddSlideimg {
  img?: string;
  parent: string;
  children?: string[];
  productType: string;
  description?: string;
}

export interface IAddSlideimgResponse {
  status: string;
  message: string;
  data: {
    parent: string;
    children?: string[];
    productType: string;
    products?: any[];
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ISlideimgDeleteRes {
  success?: boolean;
  message?: string;
}
