import { cn, formatRupiah } from "@/lib/utils";
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from "react-icons/io";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { produce } from "immer";
import { useEffect } from "react";
import ViewTitle from "./ViewTitle";
import { Input } from "@/components/ui/input";

const Counter = ({ product }) => {
  const { setValue, watch } = useFormContext();

  const watchedProducts = watch("products");

  const currentQty = watchedProducts.find(
    (item) => item.id === product.id
  )?.quantity;

  const handleChangeQty = (type, productId, customValue) => {
    const updateValue = produce(watchedProducts, (draft) => {
      const target = draft.find((item) => item.id === productId);
      if (!target) return;

      if (type === "increment") {
        target.quantity += 1;
      } else if (type === "decrement" && target.quantity > 1) {
        target.quantity -= 1;
      } else {
        target.quantity = Number(customValue);
      }
    });

    setValue("products", updateValue);
  };

  return (
    <div className="flex gap-x-3 items-center">
      <Button
        type="button"
        disabled={currentQty === 1}
        onClick={() => handleChangeQty("decrement", product.id)}
        variant="outline"
        size="icon"
        className="w-7 h-7 font-bold"
      >
        -
      </Button>

      <Input
        className="w-12 text-center h-8 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        value={currentQty || ""}
        onChange={(e) => {
          const value = e.target.value;
          handleChangeQty("custom", product.id, value);
        }}
        type="number"
        onBlur={() => {
          if (!currentQty) {
            handleChangeQty("custom", product.id, 1);
          }
        }}
      />

      <Button
        type="button"
        onClick={() => handleChangeQty("increment", product.id)}
        variant="outline"
        size="icon"
        className="w-7 h-7 font-bold"
      >
        +
      </Button>
    </div>
  );
};

const Product = ({ product, settings, textInputColor }) => {
  const { isShowPrice, isShowImage, isShowDescription } = settings;
  return (
    <div className="flex gap-x-3 items-center">
      {isShowImage && (
        <img
          src={product?.ImageProducts[0].square_200_url}
          alt={product.name}
          className="object-contain w-10 rounded shadow"
        />
      )}

      <div className="flex flex-col gap-y-1">
        <p
          style={{
            color: textInputColor,
          }}
          className="font-semibold"
        >
          {product.name}
        </p>

        {isShowDescription && (
          <p className="text-muted-foreground line-clamp-1 text-sm pr-5">
            {product?.description}
          </p>
        )}

        {isShowPrice && (
          <p
            style={{
              color: textInputColor,
            }}
            className="font-bold  text-sm"
          >
            {formatRupiah(product?.price)}
          </p>
        )}

        {isShowImage && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="text-sm text-muted-foreground h-6 w-max"
              >
                View Detail
              </Button>
            </DialogTrigger>
            <DialogContent
              className="max-w-[90%] md:max-w-screen-md rounded-lg"
              onOpenAutoFocus={(e) => e.preventDefault()}
              onInteractOutside={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>Detail Product</DialogTitle>
                <DialogDescription className="invisible">x</DialogDescription>

                <div className="flex flex-col md:flex-row gap-x-10  gap-y-5">
                  <img
                    src={product?.ImageProducts[0].square_200_url}
                    alt={product.name}
                    className="object-cover w-[300px]  rounded shadow"
                  />

                  <div>
                    <p
                      style={{
                        color: textInputColor,
                      }}
                      className="font-semibold text-left"
                    >
                      {product.name}
                    </p>

                    <p
                      style={{
                        color: textInputColor,
                      }}
                      className="font-bold text-left mb-3"
                    >
                      {formatRupiah(product?.price)}
                    </p>

                    <p className="text-muted-foreground text-left  text-sm ">
                      {product?.description}
                    </p>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export const ViewProductsDetail = ({ products, settings, styles }) => {
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const { setValue, watch } = useFormContext();

  const watchedProducts = watch("products");

  const { label, isAllowMultipleQuantities } = settings;

  const { titleSize, titleColor, borderColor, textInputColor } = styles;

  const handleToggleProduct = (productvalue) => {
    const isSelected = watchedProducts.some(
      (item) => item.id === productvalue.id
    );

    if (isSelected) {
      // Hapus dari array
      const updated = watchedProducts.filter(
        (item) => item.id !== productvalue.id
      );
      setValue("products", updated);
    } else {
      const payloadProduct = {
        id: productvalue?.id,
        name: productvalue.name,
        price: productvalue.price,
        quantity: 1,
      };

      setValue("products", [...watchedProducts, payloadProduct], {
        shouldValidate: true,
      });
    }
  };

  useEffect(() => {
    if (!isAllowMultipleQuantities) {
      const updated = produce(watchedProducts, (draft) => {
        draft.forEach((item) => {
          item.quantity = 1;
        });
      });

      setValue("products", updated);
    }
  }, [isAllowMultipleQuantities]);

  const totalPriceEachProducts = watchedProducts.reduce((acc, product) => {
    acc[product.id] = product.price * product.quantity;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-y-5">
      <ViewTitle
        content={{ value: label }}
        titleSize={titleSize}
        titleColor={titleColor}
      />

      <div className="flex flex-col gap-y-4 cursor-pointer">
        {products.map((product) => {
          const selected = watchedProducts.some(
            (item) => item.id === product.id
          );

          const isHovered = hoveredProductId === product.id;

          return (
            <div
              key={product.id}
              className={cn(
                "flex flex-col  rounded border  transform transition-all ease-in-out duration-100"
              )}
              style={{
                borderColor:
                  isHovered || selected ? textInputColor : borderColor,
              }}
            >
              <div
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                className={cn(`  flex justify-between items-center p-3 `)}
              >
                <div className="flex items-center gap-x-3">
                  {selected ? (
                    <IoIosRadioButtonOn
                      size={24}
                      className="shrink-0 hover:scale-105"
                      style={{
                        color: textInputColor,
                      }}
                      onClick={() => handleToggleProduct(product)}
                    />
                  ) : (
                    <IoIosRadioButtonOff
                      size={24}
                      className="shrink-0 hover:scale-105"
                      style={{
                        color: textInputColor,
                      }}
                      onClick={() => handleToggleProduct(product)}
                    />
                  )}

                  <Product
                    product={product}
                    settings={settings}
                    textInputColor={textInputColor}
                  />
                </div>

                <div>
                  {isAllowMultipleQuantities && selected && (
                    <Counter product={product} />
                  )}
                </div>
              </div>

              {isAllowMultipleQuantities && selected && (
                <div className="flex justify-end bg-slate-100 w-full p-2 text-sm">
                  <p className="">
                    Total {formatRupiah(totalPriceEachProducts[product.id])}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
