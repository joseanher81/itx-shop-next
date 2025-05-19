// Basic product properties
export interface ProductSummary {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
}

// Extended product properties
export interface ProductDetail extends ProductSummary {
  cpu: string;
  ram: string;
  os: string;
  battery: string;
  displayResolution: string;
  dimentions: string;
  weight: string;
  primaryCamera?: string;
  secondaryCamera?: string;
  options: {
    colors: { code: string; name: string }[];
    storages: { code: string; name: string }[];
  };
}
