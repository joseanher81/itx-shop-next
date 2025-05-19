import { FaShoppingCart } from "react-icons/fa";
import { ProductDetail } from "../types/Product";

interface Props {
  product: ProductDetail;
  selectedStorage: string | null;
  selectedColor: string | null;
  handleChangeStorage: (value: string) => void;
  handleChangeColor: (value: string) => void;
  handleAddToCart: (payload: {
    id: string;
    colorCode: string;
    storageCode: string;
  }) => void;
  isPending: boolean;
}

const Actions = ({
  product,
  selectedStorage,
  selectedColor,
  handleChangeStorage,
  handleChangeColor,
  handleAddToCart,
  isPending,
}: Props) => {
  return (
    <>
      <div className="space-y-3">
        <label className="block">
          Storage:
          <select
            value={selectedStorage ?? ""}
            onChange={(e) => handleChangeStorage(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          >
            {product.options.storages.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Color:
          <select
            value={selectedColor ?? ""}
            onChange={(e) => handleChangeColor(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          >
            {product.options.colors.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        disabled={isPending || !product.price}
        onClick={() =>
          handleAddToCart({
            id: product.id,
            colorCode: selectedColor!,
            storageCode: selectedStorage!,
          })
        }
        className="w-full mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isPending ? (
          "Adding..."
        ) : (
          <>
            {" "}
            <FaShoppingCart /> Add to cart{" "}
          </>
        )}
      </button>
    </>
  );
};

export default Actions;
