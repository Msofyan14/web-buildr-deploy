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

export const BankTransfer = ({
  method,
  isSelectedPayment,
  isSelectedBankMethod,
  styles,
}) => {
  const { control, setValue } = useFormContext();

  const handleSelectBank = (bankData) => {
    setValue("bank", bankData, { shouldValidate: true });

    setValue("paymentMethod", "bankTransfer", { shouldValidate: true });

    setValue("ePaymentData", {});
  };
  return (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger
          className={cn(
            "w-full px-4 py-3 text-left font-medium text-gray-900  rounded hover:bg-orange-50 !no-underline justify-between",
            isSelectedBankMethod && isSelectedPayment
              ? "border border-orange-500"
              : "border"
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
            {isSelectedBankMethod && isSelectedPayment && (
              <IoIosRadioButtonOn className="text-orange-500" />
            )}
          </div>
        </AccordionTrigger>

        <AccordionContent
          className={cn(
            "p-2 overflow-hidden",

            isSelectedBankMethod && isSelectedPayment
              ? "border border-t-0 border-orange-500"
              : "border"
          )}
        >
          <FormField
            control={control}
            name="bank"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col   rounded-md p-1">
                      <div className="flex flex-col gap-y-2">
                        {bankOptions.map((payment) => {
                          const selectedBankOption =
                            payment?.id === field?.value?.id;

                          return (
                            <div
                              key={payment.id}
                              className={cn(
                                `bg-white cursor-pointer  flex items-center  rounded-md p-3 justify-between hover:bg-orange-50`,

                                selectedBankOption && "bg-orange-50"
                              )}
                              onClick={() => {
                                handleSelectBank(payment);
                              }}
                            >
                              <div className="flex items-center !select-none">
                                <div className="relative w-14 h-14 mr-3 !select-none">
                                  <Image
                                    src={payment.logo}
                                    alt={payment.name}
                                    fill
                                    sizes="(min-width: 768px) 64px, 40px"
                                    className="object-contain "
                                  />
                                </div>

                                <p className="!select-none  text-sm">
                                  Transfer {payment.name}
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
