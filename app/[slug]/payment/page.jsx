"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import { Fragment } from "react";
import { MdOutlineContentCopy } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { formatRupiah } from "@/lib/utils";

const renderHtmlWithReact = (html, variables) => {
  return parse(html, {
    replace: (domNode) => {
      if (domNode.type === "text") {
        const text = domNode.data;
        const matches = text.match(/{{\s*[\w.]+\s*}}/g);

        if (matches) {
          const parts = text.split(/({{\s*[\w.]+\s*}})/g).map((part, index) => {
            const match = part.match(/{{\s*(\w+)\s*}}/);
            if (match) {
              const key = match[1];
              const value = variables[key];

              if (Array.isArray(value)) {
                // Jika array, tampilkan sebagai <ul><li>...</li></ul> jika lebih dari 1
                if (value.length === 1) {
                  return <Fragment key={index}>{value[0]}</Fragment>;
                }
                return (
                  <span key={index} className="list-disc pl-5 ">
                    {value.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </span>
                );
              }

              return <Fragment key={index}>{value}</Fragment>;
            }

            return part;
          });

          return <>{parts}</>;
        }
      }
    },
  });
};

const PaymentOptions = ({ paymentMethod }) => {
  const { logo, name, account_number, account_name } =
    paymentMethod?.data || {};

  const {
    logo: ePaymentLogo,
    name: ePaymentName,
    value,
    type,
  } = paymentMethod?.data || {};

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch((err) => {
        console.error("Copy failed:", err);
      });
  };

  return (
    <>
      {paymentMethod?.type === "bankTransfer" ? (
        <span className="flex flex-col md:flex-row  justify-between gap-3 md:gap-10 mt-2 rounded border p-5 w-max  mx-auto">
          <span className="flex flex-col gap-y-3">
            <span className="flex flex-col">
              <span className="text-muted-foreground mb-1 text-left">
                Atas Nama
              </span>
              <span className="text-left">{account_name}</span>{" "}
            </span>

            <span className="flex flex-col">
              <span className="text-muted-foreground mb-1 text-left">
                No Rekening
              </span>

              <span className="flex items-center gap-x-3">
                <span className="text-left">{account_number}</span>

                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => handleCopy(account_number)}
                        className="w-8 h-8"
                        variant="ghost"
                      >
                        <MdOutlineContentCopy />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Copy No Rekening</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
            </span>
          </span>

          <span className="relative w-32 h-32 mx-auto  ">
            <Image
              src={logo}
              alt={name}
              fill
              sizes="(min-width: 768px) 64px, 40px"
              className="object-contain"
            />
          </span>
        </span>
      ) : paymentMethod?.type === "e-payment" && type === "va" ? (
        <span className="flex flex-col md:flex-row   justify-between gap-10 mt-2 rounded border p-5 w-max max-w-full mx-auto">
          <span className="flex flex-col gap-y-3">
            <span className="flex flex-col">
              <span className="text-muted-foreground mb-1 text-left">
                Nama Virtual Account
              </span>
              <span className="text-left">{ePaymentName}</span>{" "}
            </span>

            <span className="flex flex-col">
              <span className="text-muted-foreground mb-1 text-left">
                No Virtual Account
              </span>

              <span className="flex items-center gap-x-3">
                <span className="text-left">{value}</span>

                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => handleCopy(value)}
                        className="w-8 h-8"
                        variant="ghost"
                      >
                        <MdOutlineContentCopy />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Copy No Rekening</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
            </span>
          </span>

          <span className="relative w-32 h-32 mx-auto">
            <Image
              src={ePaymentLogo}
              alt={ePaymentName}
              fill
              sizes="(min-width: 768px) 64px, 40px"
              className="object-contain"
            />
          </span>
        </span>
      ) : null}
    </>
  );
};

const PaymentInstruction = () => {
  const [data, setData] = useState({});
  console.log("🚀 ~ PaymentInstruction ~ data:", data);

  useEffect(() => {
    const rawData = sessionStorage.getItem("paymentData");
    if (rawData) {
      const parsedData = JSON.parse(rawData);
      setData(parsedData);
    }
  }, []);

  const { chatTemplate = "", products, paymentMethod } = data;

  const calculateProductsPrice = products?.reduce(
    (acc, current) => acc + current.price * current.quantity,
    0
  );

  const calculateTotalPrice = () => {
    if (!data?.courier?.price) {
      return Number(calculateProductsPrice);
    } else {
      return Number(data?.courier?.price) + Number(calculateProductsPrice);
    }
  };

  const productsName = products?.map(
    (product) => `${product.name} - ${product.quantity}pcs`
  );

  const variableReplacement = {
    product_name: productsName || "",
    total_price: formatRupiah(calculateTotalPrice()) || "",
    payment_options: <PaymentOptions paymentMethod={paymentMethod} />,
    bank_transfer_confirmation: (
      <span>
        Silahkan{" "}
        <span className="font-semibold text-blue-500 cursor-pointer hover:underline">
          Konfirmasi Pembayaran
        </span>
      </span>
    ),
  };

  return (
    <div className="flex flex-col justify-center items-center p-5 shadow-md border-b-8 border-b-orange-500 min-h-screen">
      <div className="mx-auto text-center">
        {renderHtmlWithReact(chatTemplate, variableReplacement)}
      </div>
    </div>
  );
};

export default PaymentInstruction;
