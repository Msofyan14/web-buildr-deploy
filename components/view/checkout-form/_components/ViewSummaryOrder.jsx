import { cn, formatRupiah } from "@/lib/utils";
import CustomLabelField from "./CustomLabelField";
import { useFormContext } from "react-hook-form";

const ViewSummaryOrder = ({ summary, products, styles }) => {
  const { watch } = useFormContext();

  const courierPrice = watch("courier.price");

  const { labelColor, borderColor, rounded } = styles;

  const calculateProductsPrice = products.reduce(
    (acc, current) => acc + current.price * current.quantity,
    0
  );

  const calculateTotalPrice = () => {
    if (!courierPrice) {
      return Number(calculateProductsPrice);
    } else {
      return Number(courierPrice) + Number(calculateProductsPrice);
    }
  };

  return (
    <div
      style={{
        border: `1px solid ${borderColor}`,
        borderRadius: rounded,
      }}
      className={cn("p-5 flex flex-col gap-y-5  ")}
    >
      {summary?.label && (
        <CustomLabelField label={summary?.label} size={18} color={labelColor} />
      )}

      {products.map((product) => {
        const totalPriceProduct = product?.price * product.quantity;

        return (
          <div key={product.id} className="flex items-center justify-between ">
            <p className="">{product?.name}</p>
            <p className="">{formatRupiah(totalPriceProduct)}</p>
          </div>
        );
      })}

      <div className="flex items-center justify-between ">
        <p className="">Ongkos Kirim</p>
        <p className="">{formatRupiah(courierPrice)}</p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t-2">
        <p className="font-bold">Total</p>
        <p className="font-bold">{formatRupiah(calculateTotalPrice())}</p>
      </div>
    </div>
  );
};

export default ViewSummaryOrder;
