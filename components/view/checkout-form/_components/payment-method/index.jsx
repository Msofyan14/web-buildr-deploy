import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Fragment, useMemo } from "react";
import { useFormContext } from "react-hook-form";

import ViewTitle from "../ViewTitle";
import { BankTransfer } from "./BankTransfer";
import { COD } from "./COD";
import { EPayment } from "./EPayment";

const PaymentMethod = ({ paymentMethod, styles }) => {
  const { titleSize, titleColor } = styles;
  const { control } = useFormContext();

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

  const renderPaymentMethod = (method, field) => {
    const isSelectedPayment = field.value === method.value;

    switch (method.value) {
      case "bankTransfer":
        return (
          <BankTransfer
            method={method}
            isSelectedPayment={isSelectedPayment}
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
        name="paymentMethod.type"
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
