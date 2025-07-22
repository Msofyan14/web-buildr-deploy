import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { IoIosRadioButtonOn } from "react-icons/io";

import logoBca from "@/assets/payment-logo/logo-bca.png";
import logoBri from "@/assets/payment-logo/logo-bri.png";
import logoMandiri from "@/assets/payment-logo/logo-mandiri.png";
import Image from "next/image";
import { useEffect, useState } from "react";

const bankOptions = [
  {
    id: "1",
    name: "Bank BCA",
    code_name: "bca",
    account_number: "3428843888",
    account_name: "PT. Plasa Grosir Indonesia",
    logo: logoBca,
    is_default: true,
  },
  {
    id: "2",
    name: "Bank BRI",
    code_name: "bri",
    account_number: "038601001383302",
    account_name: "PT. Plasa Grosir Indonesia",
    logo: logoBri,
    is_default: false,
  },
  {
    id: "3",
    name: "Bank Mandiri",
    code_name: "mandiri",
    account_number: "0060010352833",
    account_name: "PT. Plasa Grosir Indonesia",
    logo: logoMandiri,
    is_default: false,
  },
];

export const BankTransfer = ({ method, isSelectedPayment, styles }) => {
  const { control, setValue, watch } = useFormContext();

  const [openAccordionItems, setOpenAccordionItems] = useState([]);

  const handleSelectBank = (bankData) => {
    setValue(
      "paymentMethod",
      {
        type: "bankTransfer",
        data: bankData,
      },
      {
        shouldValidate: true,
      }
    );
  };

  const hasSelectedBank = bankOptions.some(
    (bank) => bank.id === watch("paymentMethod.data.id")
  );

  useEffect(() => {
    if (hasSelectedBank) {
      setOpenAccordionItems(["item-1"]);
    } else if (!isSelectedPayment) {
      setOpenAccordionItems([]);
    }
  }, [hasSelectedBank, isSelectedPayment]);

  return (
    <Accordion
      type="multiple"
      value={openAccordionItems}
      onValueChange={setOpenAccordionItems}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          className={cn(
            "w-full px-4 py-3 text-left font-medium text-gray-900  rounded hover:bg-orange-50 !no-underline justify-between",
            isSelectedPayment ? "border border-orange-500" : "border"
          )}
        >
          <div className="flex items-center gap-x-2">
            <div className="relative w-10 h-10">
              <Image
                src={method.icon}
                alt="icon"
                fill
                sizes="(min-width: 768px) 64px, 40px"
                className="object-contain"
              />
            </div>
            {method.label}
          </div>

          <div className={`flex gap-x-2 ml-auto px-3`}>
            {isSelectedPayment && (
              <IoIosRadioButtonOn className="text-orange-500" />
            )}
          </div>
        </AccordionTrigger>

        <AccordionContent
          className={cn(
            "p-2 overflow-hidden",

            isSelectedPayment ? "border border-t-0 border-orange-500" : "border"
          )}
        >
          <FormField
            control={control}
            name="paymentMethod.data.id"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col   rounded-md p-1">
                      <div className="flex flex-col gap-y-2">
                        {bankOptions.map((bank) => {
                          const selectedBankOption = bank?.id === field?.value;

                          return (
                            <div
                              key={bank.id}
                              className={cn(
                                `bg-white cursor-pointer  flex items-center  rounded-md p-3 justify-between hover:bg-orange-50`,

                                selectedBankOption &&
                                  isSelectedPayment &&
                                  "bg-orange-50"
                              )}
                              onClick={() => {
                                handleSelectBank(bank);
                              }}
                            >
                              <div className="flex items-center !select-none">
                                <div className="relative w-14 h-14 mr-3 !select-none">
                                  <Image
                                    src={bank.logo}
                                    alt={bank.name}
                                    fill
                                    sizes="(min-width: 768px) 64px, 40px"
                                    className="object-contain "
                                  />
                                </div>
                                <p className="!select-none  text-sm">
                                  Transfer {bank.name}
                                </p>
                              </div>

                              {selectedBankOption && isSelectedPayment && (
                                <FaCheck color={styles?.buttonColor} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
