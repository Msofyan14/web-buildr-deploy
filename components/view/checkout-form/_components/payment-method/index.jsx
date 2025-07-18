import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Fragment, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";

import logoMandiri from "@/assets/payment-logo/logo-mandiri.png";
import logoBca from "@/assets/payment-logo/logo-bca.png";
import logoBri from "@/assets/payment-logo/logo-bri.png";

import ViewTitle from "../ViewTitle";
import { BankTransfer } from "./BankTransfer";
import { COD } from "./COD";
import { EPayment } from "./EPayment";

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

const PaymentMethod = ({ paymentMethod, styles }) => {
  const { titleSize, titleColor } = styles;
  const { control, setValue, watch } = useFormContext();

  const getPaymentMethodOptions = (value) => [
    {
      value: "bankTransfer",
      label: "Bank Transfer",
      icon: "https://ik.imagekit.io/ez1ffaf6o/default-images/bankTransfer.png?updatedAt=1747622420607",
      isDisabled: !value?.isBankTransfer,
    },
    {
      value: "cod",
      label: "COD",
      icon: "https://ik.imagekit.io/ez1ffaf6o/default-images/cod.png?updatedAt=1747622420791",
      isDisabled: !value?.isCod,
    },
    {
      value: "e-payment",
      label: "E-Payment",
      icon: "https://ik.imagekit.io/ez1ffaf6o/default-images/online-payment.png?updatedAt=1752732922733",
      isDisabled: !value?.isEpayment,
    },
  ];

  const paymentMethodOptions = useMemo(
    () =>
      getPaymentMethodOptions(paymentMethod).filter(
        (option) => !option.isDisabled
      ),
    [paymentMethod]
  );

  const selectedPaymentMethod = watch("paymentMethod");
  const selectedBank = watch("bank");

  useEffect(() => {
    const isSelectedValid = paymentMethodOptions.some(
      (option) => option.value === selectedPaymentMethod
    );

    if (!isSelectedValid) {
      setValue("paymentMethod", "", { shouldValidate: false });
    }
  }, [paymentMethodOptions, selectedPaymentMethod, setValue]);

  const renderPaymentMethod = (method, field) => {
    const isSelectedPayment = field.value === method.value;

    const isSelectedBankMethod = bankOptions.some(
      (opt) => opt.id === selectedBank.id
    );

    switch (method.value) {
      case "bankTransfer":
        return (
          <BankTransfer
            method={method}
            isSelectedPayment={isSelectedPayment}
            isSelectedBankMethod={isSelectedBankMethod}
            styles={styles}
          />
        );
      case "cod":
        return <COD method={method} isSelectedPayment={isSelectedPayment} />;

      case "e-payment":
        return (
          <EPayment
            method={method}
            isSelectedPayment={isSelectedPayment}
            isSelectedBankMethod={isSelectedBankMethod}
            styles={styles}
          />
        );
    }
  };

  return (
    <div>
      <ViewTitle
        content={{ value: paymentMethod?.label }}
        titleSize={titleSize}
        titleColor={titleColor}
      />

      <FormField
        control={control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex flex-col gap-y-3   mb-5  ">
                {paymentMethodOptions.map((method) => {
                  return (
                    <Fragment key={method?.value}>
                      {renderPaymentMethod(method, field)}
                    </Fragment>
                  );
                })}
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PaymentMethod;
