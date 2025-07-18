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

const renderHtmlWithReact = (html, variables) => {
  return parse(html, {
    replace: (domNode) => {
      if (domNode.type === "text") {
        const text = domNode.data;

        // Regex untuk mendeteksi semua {{key}}
        const matches = text.match(/{{\s*[\w.]+\s*}}/g);

        if (matches) {
          const parts = text.split(/({{\s*[\w.]+\s*}})/g).map((part, index) => {
            const match = part.match(/{{\s*(\w+)\s*}}/);
            if (match) {
              const key = match[1];
              const value = variables[key];
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

const PaymentOptions = ({ recipient }) => {
  const { logo, name, account_number, account_name } = recipient?.bank || {};

  const {
    logo: ePaymentLogo,
    name: ePaymentName,
    value,
    type,
  } = recipient?.ePaymentData || {};

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
      {recipient?.paymentMethod === "bankTransfer" ? (
        <span className="flex justify-between gap-10 mt-2 rounded border p-5 w-max mx-auto">
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

          <div className="relative w-32 ">
            <Image
              src={logo}
              alt={name}
              fill
              sizes="(min-width: 768px) 64px, 40px"
              className="object-contain"
            />
          </div>
        </span>
      ) : recipient?.paymentMethod === "e-payment" && type === "va" ? (
        <span className="flex justify-between gap-10 mt-2 rounded border p-5 w-max mx-auto">
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

          <div className="relative w-32 ">
            <Image
              src={ePaymentLogo}
              alt={ePaymentName}
              fill
              sizes="(min-width: 768px) 64px, 40px"
              className="object-contain"
            />
          </div>

          {/* <img
            src={ePaymentLogo}
            className="w-32 object-contain"
            alt={ePaymentName}
          /> */}
        </span>
      ) : null}
    </>
  );
};

const Instruction = ({ content = "", recipient }) => {
  const variableReplacement = {
    product_name: "Kopi Gula Aren",
    total_price: "Rp 120.000",
    payment_options: <PaymentOptions recipient={recipient} />,
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
    <div className="mx-auto text-center">
      {renderHtmlWithReact(content, variableReplacement)}
    </div>
  );
};

const ViewPaymentInstructionPage = ({ checkoutFormComponent }) => {
  const { recipient } = checkoutFormComponent || {};
  const {
    contentTemplateCOD,
    contentTemplateBankTransfer,
    contentTemplateEpayment,
  } = checkoutFormComponent.submitEvent || {};
  const contentValue =
    recipient?.paymentMethod === "cod"
      ? contentTemplateCOD
      : recipient?.paymentMethod === "bankTransfer"
      ? contentTemplateBankTransfer
      : contentTemplateEpayment;

  return (
    <div className="flex flex-col justify-center items-center p-5 shadow-md border-b-4 border-b-orange-500 h-full">
      <Instruction content={contentValue} recipient={recipient} />
    </div>
  );
};

export default ViewPaymentInstructionPage;
