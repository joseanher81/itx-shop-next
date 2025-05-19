import { ProductDetail } from "../types/Product";

interface Props {
  product: ProductDetail;
}

const Description = ({ product }: Props) => {
  return (
    <>
      <h1 className="text-xl font-semibold">
        {product.brand} {product.model}
      </h1>
      <p
        className={
          product.price ? "text-blue-600 font-medium" : "text-gray-400"
        }
      >
        {product.price ? `${product.price} €` : "Not available"}
      </p>
      <ul className="text-sm grid grid-cols-2 gap-2 mt-2">
        <li>
          <strong>CPU:</strong> {product.cpu || "N/A"}
        </li>
        <li>
          <strong>RAM:</strong> {product.ram || "N/A"}
        </li>
        <li>
          <strong>OS:</strong> {product.os || "N/A"}
        </li>
        <li>
          <strong>Resolution:</strong> {product.displayResolution || "N/A"}
        </li>
        <li>
          <strong>Battery:</strong> {product.battery || "N/A"}
        </li>
        <li>
          <strong>Cameras:</strong>{" "}
          {product.primaryCamera || product.secondaryCamera
            ? `${product.primaryCamera || "N/A"} / ${
                product.secondaryCamera || "N/A"
              }`
            : "N/A"}
        </li>
        <li>
          <strong>Dimensions:</strong> {product.dimentions || "N/A"}
        </li>
        <li>
          <strong>Weight:</strong>{" "}
          {product.weight ? `${product.weight}g` : "N/A"}
        </li>
      </ul>
    </>
  );
};

export default Description;
