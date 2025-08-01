import logoBjb from "@/assets/payment-logo/bank_bjb-2.png";
import logoBsi from "@/assets/payment-logo/BSI-Logo-2.png";
import iconQris from "@/assets/payment-logo/iconQris.png";
import logoIndomaret from "@/assets/payment-logo/indomaret-large.png";
import logoAlfamart from "@/assets/payment-logo/logo-alfamart.png";
import logoAstrapay from "@/assets/payment-logo/logo-astrapay.png";
import logoBca from "@/assets/payment-logo/logo-bca.png";
import logoBni from "@/assets/payment-logo/logo-bni.png";
import logoBri from "@/assets/payment-logo/logo-bri.png";
import logoBss from "@/assets/payment-logo/logo-bss.png"; // Bank Sampoerna
import logoCimb from "@/assets/payment-logo/logo-cimbniaga.png";
import logoDana from "@/assets/payment-logo/logo-dana.png";
import logoLinkaja from "@/assets/payment-logo/logo-linkaja.png";
import logoMandiri from "@/assets/payment-logo/logo-mandiri.png";
import logoOvo from "@/assets/payment-logo/logo-ovo.png";
import logoPermata from "@/assets/payment-logo/logo-permatabank.png";
import logoShopeePay from "@/assets/payment-logo/shopee-pay-logo-5-23.png";
import { useFormContext } from "react-hook-form";

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
import { FaCheck } from "react-icons/fa6";
import { IoIosRadioButtonOn } from "react-icons/io";
import Image from "next/image";
import { useEffect, useState } from "react";

const ePaymentOptions = [
  {
    group: "Virtual Account",
    options: [
      {
        id: "va-bca",
        name: "BCA",
        logo: logoBca,
        value: "1234567890",
        type: "va",
      },
      {
        id: "va-bri",
        name: "Bank BRI",
        logo: logoBri,
        value: "9876543210",
        type: "va",
      },
      {
        id: "va-bjb",
        name: "Bank BJB",
        logo: logoBjb,
        value: "1122334455",
        type: "va",
      },
      {
        id: "va-bni",
        name: "BNI",
        logo: logoBni,
        value: "5566778899",
        type: "va",
      },
      {
        id: "va-cimb",
        name: "CIMB Niaga",
        logo: logoCimb,
        value: "9988776655",
        type: "va",
      },
      {
        id: "va-mandiri",
        name: "Mandiri",
        logo: logoMandiri,
        value: "4433221100",
        type: "va",
      },
      {
        id: "va-permata",
        name: "PermataBank",
        logo: logoPermata,
        value: "7788990011",
        type: "va",
      },
      {
        id: "va-bss",
        name: "Bank Sahabat Sampoerna",
        logo: logoBss,
        value: "6655443322",
        type: "va",
      },
      {
        id: "va-bsi",
        name: "Bank Syariah Indonesia",
        logo: logoBsi,
        value: "9911223344",
        type: "va",
      },
    ],
  },
  {
    group: "E-Wallet",
    options: [
      {
        id: "wallet-ovo",
        name: "OVO",
        logo: logoOvo,
        value: "081234567890",
        type: "phone",
      },
      {
        id: "wallet-dana",
        name: "DANA",
        logo: logoDana,
        value: "089876543210",
        type: "phone",
      },
      {
        id: "wallet-linkaja",
        name: "LinkAja",
        logo: logoLinkaja,
        value: "087712345678",
        type: "phone",
      },
      {
        id: "wallet-astrapay",
        name: "AstraPay",
        logo: logoAstrapay,
        value: "082112345678",
        type: "phone",
      },
      {
        id: "wallet-shopeepay",
        name: "ShopeePay",
        logo: logoShopeePay,
        value: "088812345678",
        type: "phone",
      },
    ],
  },
  {
    group: "Retail Outlets/ OTC",
    options: [
      {
        id: "retail-alfamart",
        name: "Alfamart",
        logo: logoAlfamart,
        value: "1234567890123456",
        type: "retail-code",
      },
      {
        id: "retail-indomaret",
        name: "Indomart",
        logo: logoIndomaret,
        value: "6543210987654321",
        type: "retail-code",
      },
    ],
  },
  {
    group: "QR Codes",
    options: [
      {
        id: "qr-qris",
        name: "QRIS",
        logo: iconQris,
        value: "https://qris.id/scan/123456789",
        type: "qr",
      },
    ],
  },
];

export const EPayment = ({ method, isSelectedPayment, styles }) => {
  const { control, setValue, watch } = useFormContext();

  const [openAccordionItems, setOpenAccordionItems] = useState([]);

  const handleSelect = (ePaymentData) => {
    setValue(
      "paymentMethod",
      {
        type: "e-payment",
        data: ePaymentData,
      },
      {
        shouldValidate: true,
      }
    );
  };

  const hasSelectedEpayment = ePaymentOptions
    .flatMap((group) => group.options)
    .some((opt) => opt.id === watch("paymentMethod.data.id"));

  useEffect(() => {
    if (hasSelectedEpayment) {
      setOpenAccordionItems(["item-2"]);
    } else if (!isSelectedPayment) {
      setOpenAccordionItems([]);
    }
  }, [hasSelectedEpayment, isSelectedPayment]);

  return (
    <Accordion
      type="multiple"
      value={openAccordionItems}
      onValueChange={setOpenAccordionItems}
    >
      <AccordionItem value="item-2">
        <AccordionTrigger
          className={cn(
            "w-full px-4 py-3 text-left font-medium text-gray-900  rounded hover:bg-orange-50 !no-underline justify-between",
            isSelectedPayment ? "border border-orange-500" : "border"
          )}
        >
          <div className="flex items-center gap-x-2">
            <Image
              width={40}
              height={40}
              src={method.icon}
              alt="icon"
              className="object-contain"
            />
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
                        <Accordion
                          defaultValue="Virtual Account"
                          type="single"
                          collapsible
                          className="w-full"
                        >
                          {ePaymentOptions.map((payment) => (
                            <AccordionItem
                              key={payment.group}
                              value={payment.group}
                            >
                              <AccordionTrigger className="text-sm font-medium !no-underline">
                                {payment.group}
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="flex flex-col gap-y-2">
                                  {payment.options.map((opt) => {
                                    const selectedEpaymentOption =
                                      opt?.id === field?.value;
                                    return (
                                      <div
                                        key={opt.name}
                                        className={cn(
                                          `bg-white cursor-pointer flex items-center rounded-md p-3 justify-between hover:bg-orange-50`,
                                          selectedEpaymentOption &&
                                            isSelectedPayment &&
                                            "bg-orange-50"
                                        )}
                                        onClick={() => handleSelect(opt)}
                                      >
                                        <div className="flex items-center !select-none">
                                          <div className="relative w-14 h-14 mr-3 !select-none">
                                            <Image
                                              src={opt.logo}
                                              alt={opt.name}
                                              fill
                                              sizes="(min-width: 768px) 64px, 40px"
                                              className="object-contain "
                                            />
                                          </div>
                                          <p className="!select-none text-sm">
                                            {opt.name}
                                          </p>
                                        </div>

                                        {selectedEpaymentOption &&
                                          isSelectedPayment && (
                                            <FaCheck
                                              color={styles?.buttonColor}
                                            />
                                          )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
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
