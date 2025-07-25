"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

import { createElement } from "react";
import * as Icons from "react-icons/fa";
import CustomLabelField from "./_components/CustomLabelField";
import ViewCheckbox from "./_components/ViewCheckbox";
import ViewDate from "./_components/ViewDate";
import ViewDividerField from "./_components/ViewDividerField";
import ViewDropdown from "./_components/ViewDropdown";
import ViewEmail from "./_components/ViewEmail";
import ViewImageField from "./_components/ViewImageField";
import ViewInput from "./_components/ViewInput";
import ViewTextArea from "./_components/ViewTextArea";
import ViewTitle from "./_components/ViewTitle";
import ViewRating from "./_components/ViewtRating";
import PaymentMethod from "./_components/payment-method";
import ViewSummaryOrder from "./_components/ViewSummaryOrder";
import ViewShipping from "./_components/ViewShipping";
import { ViewAddressField } from "./_components/ViewAddressField";

const generateCustomFieldSchema = (contents) => {
  if (!contents || contents.length === 0) {
    return z.array(z.any()).optional(); // Tidak divalidasi jika kosong
  }

  return z.array(
    z.record(z.any()).superRefine((data, ctx) => {
      if (data.isRequired && (!data.value || data.value === "")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["value"],
          message: "Required",
        });
      }

      if (data.type === "email") {
        const isEmpty = data.value === undefined || data.value === "";
        if (data.isRequired || (!data.isRequired && !isEmpty)) {
          const emailSchema = z.string().email();
          const result = emailSchema.safeParse(data.value);

          if (!result.success) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["value"],
              message: "Invalid email format",
            });
          }
        }
      }

      if (data.type === "phoneNumber") {
        const isEmpty = data.value === undefined || data.value === "";
        if (data.isRequired || (!data.isRequired && !isEmpty)) {
          const phoneNumberSchema = z.string().regex(/^8\d{8,13}$/, {
            message: "Enter a valid number starting with 8, e.g. 8950000xxxx",
          });
          const result = phoneNumberSchema.safeParse(data.value);

          if (!result.success) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["value"],
              message: "Enter a valid number starting with 8, e.g. 8950000xxxx",
            });
          }
        }
      }
    })
  );
};

const ViewFormCheckout = ({ section }) => {
  const {
    contents,
    submitEvent,
    paymentMethod,
    products,
    shipping,
    address,
    summary,
  } = section;

  const { isRequired, isCod, isBankTransfer, isEpayment } = paymentMethod || {};

  const router = useRouter();

  const createPaymentMethodSchema = ({
    isCod,
    isBankTransfer,
    isEpayment,
    isRequired,
  }) => {
    const allowedValues = [
      isCod && "cod",
      isBankTransfer && "bankTransfer",
      isEpayment && "e-payment",
    ].filter(Boolean);

    const schema = z
      .object({
        type: z
          .string({
            required_error: isRequired
              ? "Payment method is required"
              : undefined,
          })
          .refine((val) => allowedValues.includes(val), {
            message: `Payment method is required`,
          }),
        data: z.any().optional(),
      })
      .refine(
        (val) => {
          if (val.type === "cod") return true;
          return val.data != null; // harus ada data kalau bukan COD
        },
        {
          message: "Data is required for this payment method",
          path: ["data", "id"],
        }
      );

    return schema;
  };

  const createCourierSchema = ({ isRequired }) => {
    if (!isRequired) {
      return z.object({
        name: z.string().optional(),
        serviceType: z.string().optional(),
        price: z.coerce.number().optional(),
      });
    }

    return z.object({
      name: z.string().min(1, "Required"),
      serviceType: z.string().min(1, "Required"),
      price: z.coerce.number(),
    });
  };

  const createAddressSchema = ({ isRequired, type }) => {
    const isSubdistrictOnly = type === "subdistrict-only";

    if (!isRequired) {
      // Semua optional
      return z.object({
        province: z.string().optional(),
        district: z.string().optional(),
        subdistrict: z.string().optional(),
        fullAddress: z.string().optional(),
      });
    }

    // isRequired: true
    return z.object({
      province: isSubdistrictOnly
        ? z.string().optional()
        : z.string().min(1, "Required"),

      district: isSubdistrictOnly
        ? z.string().optional()
        : z.string().min(1, "Required"),

      subdistrict: z.string().min(1, "Required"),

      fullAddress: z
        .string()
        .min(5, "Address minimum 5 character")
        .max(200, "Address too long"),
    });
  };

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(50),
    email: z.string().email(),
    phoneNumber: z.string().regex(/^8\d{8,13}$/, {
      message: "Enter a valid number starting with 8, e.g. 8950000xxxx",
    }),
    address: createAddressSchema({
      isRequired: address?.isRequired,
      type: address?.type,
    }),
    // isDropshipping: z.boolean().optional(),
    // nameDropshipper: z.string().optional(),
    // phoneNumberDropshipper: z.string().optional(),

    paymentMethod: createPaymentMethodSchema({
      isBankTransfer: isBankTransfer,
      isCod: isCod,
      isEpayment: isEpayment,
      isRequired: isRequired,
    }),
    bank: z.any().optional(),
    courier: createCourierSchema({ isRequired: shipping?.isRequired }),
    customFields: z.lazy(() => generateCustomFieldSchema(contents)),
    products: z.object(
      {
        id: z.string(),
        name: z.string(),
        price: z.string(),
      },
      { message: "Products Required" }
    ),
  });

  const {
    width,
    titleColor,
    titleSize,
    labelSize,
    labelColor,
    borderColor,
    inputColor,
    inputSize,
    textInputColor,
    rounded,
    buttonText,
    buttonColor,
    iconBtn,
  } = section.wrapperStyle;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: {
        fullAddress: "",
        province: "",
        district: "",
        subdistrict: "",
      },
      isDropshipping: false,
      nameDropshipper: "",
      phoneNumberDropshipper: false,
      paymentMethod: {
        type: "",
        data: {},
      },
      bank: {},
      courier: {
        name: "",
        serviceType: "",
        price: "",
      },
      customFields: [],
    },
  });

  useEffect(() => {
    if (contents.length > 0) {
      setTimeout(() => {
        form.setValue("customFields", contents);
      }, 0);
    }
  }, [contents, form, form.setValue]);

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    const {
      event,
      waNumber,
      waChatTemplate,
      customUrl,
      contentTemplateCOD,
      contentTemplateBankTransfer,
      contentTemplateEpayment,
    } = submitEvent;

    const selectedChatTempate =
      data?.paymentMethod?.type === "cod"
        ? contentTemplateCOD
        : data?.paymentMethod?.type === "bankTransfer"
        ? contentTemplateBankTransfer
        : contentTemplateEpayment;

    if (event === "whatsapp_custom_number" && waNumber) {
      const waLink = `https://wa.me/+62${waNumber}?text=${encodeURIComponent(
        waChatTemplate
      )}`;
      window.open(waLink, "_blank", "noopener noreferrer");
    } else if (event === "custom_url" && customUrl) {
      window.open(customUrl, "_blank", "noopener noreferrer");
    } else if (event === "instruction_page") {
      router.push(`/slug/payment`);
      sessionStorage.setItem(
        "paymentData",
        JSON.stringify({
          ...data,
          chatTemplate: selectedChatTempate,
        })
      );
    }
  };

  useEffect(() => {
    if (Object.keys(products).length > 0) {
      setTimeout(() => {
        form.setValue("products", products);
      }, 0);
    }
  }, [form, form.setValue, products]);

  console.log("ERROR", form.formState.errors);

  return (
    <div
      style={{
        maxWidth: width || "100%",
      }}
      className="mx-auto w-full"
    >
      <Form {...form}>
        <form className="space-y-5 relative p-5">
          <ViewTitle
            content={{ value: "Data Penerima" }}
            titleSize={titleSize}
            titleColor={titleColor}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <CustomLabelField
                  label="Name"
                  size={labelSize}
                  color={labelColor}
                />
                <FormControl>
                  <Input
                    style={{
                      border: `1px solid ${borderColor}`,
                      backgroundColor: inputColor,
                      fontSize: inputSize ? inputSize : "",
                      color: textInputColor,
                      borderRadius: rounded,
                    }}
                    className="placeholder:text-neutral-300"
                    placeholder="John"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <CustomLabelField
                  label="Email"
                  size={labelSize}
                  color={labelColor}
                />
                <FormControl>
                  <Input
                    style={{
                      border: `1px solid ${borderColor}`,
                      backgroundColor: inputColor,
                      fontSize: inputSize ? inputSize : "",
                      color: textInputColor,
                      borderRadius: rounded,
                    }}
                    className="placeholder:text-neutral-300"
                    placeholder="John@gmail.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <CustomLabelField
                  label="No Whatsapp"
                  size={labelSize}
                  color={labelColor}
                />

                <FormControl>
                  <Input
                    maxLength={13}
                    style={{
                      border: `1px solid ${borderColor}`,
                      backgroundColor: inputColor,
                      fontSize: inputSize ? inputSize : "",
                      color: textInputColor,
                      borderRadius: rounded,
                    }}
                    className="placeholder:text-neutral-300"
                    placeholder="8950000xxxx"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {address?.isRequired && (
            <ViewAddressField
              address={address}
              styles={section?.wrapperStyle}
            />
          )}

          {/* Custom Fields */}
          {contents.length > 0 &&
            contents.map((content, index) => {
              return (
                <div style={{ margin: "20px 0px" }} key={content.id}>
                  {content.type === "title" && (
                    <ViewTitle
                      content={content}
                      titleSize={titleSize}
                      titleColor={titleColor}
                    />
                  )}
                  {(content.type === "text-input" ||
                    content.type === "discount-code" ||
                    content.type === "phoneNumber") && (
                    <ViewInput content={content} index={index} />
                  )}

                  {content.type === "email" && (
                    <ViewEmail content={content} index={index} />
                  )}
                  {content.type === "text-area" && (
                    <ViewTextArea content={content} index={index} />
                  )}
                  {content.type === "checkbox" && (
                    <ViewCheckbox content={content} index={index} />
                  )}
                  {content.type === "dropdown-menu" && (
                    <ViewDropdown content={content} index={index} />
                  )}
                  {content.type === "date" && (
                    <ViewDate content={content} index={index} />
                  )}
                  {content.type === "rating" && (
                    <ViewRating content={content} index={index} />
                  )}
                  {content.type === "image" && (
                    <ViewImageField content={content} index={index} />
                  )}
                  {content.type === "divider" && (
                    <ViewDividerField content={content} index={index} />
                  )}
                </div>
              );
            })}

          {shipping?.isRequired && (
            <ViewShipping styles={section.wrapperStyle} />
          )}

          {section?.paymentMethod?.isRequired && (
            <PaymentMethod
              paymentMethod={section?.paymentMethod}
              styles={section.wrapperStyle}
            />
          )}

          {summary?.isRequired && products?.id && (
            <ViewSummaryOrder
              summary={summary}
              products={products}
              styles={section.wrapperStyle}
            />
          )}

          {form.formState.errors?.products && (
            <p className="text-red-500">
              {form.formState.errors?.products?.message}
            </p>
          )}

          <Button
            size="lg"
            style={{
              backgroundColor: buttonColor,
              marginBottom: "10px",
            }}
            onClick={form.handleSubmit(onSubmit)}
            className="w-full cursor-pointer"
            type="button"
          >
            {" "}
            {iconBtn?.position === "right" ? (
              <div className="flex justify-center items-center gap-x-2">
                <p> {buttonText}</p>

                {iconBtn?.icon?.startsWith("Fa") && Icons[iconBtn.icon] ? (
                  <div style={{ color: iconBtn?.color }}>
                    {createElement(Icons[iconBtn.icon], {})}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex justify-center items-center gap-x-2">
                {iconBtn?.icon?.startsWith("Fa") && Icons[iconBtn.icon] ? (
                  <div style={{ color: iconBtn?.color }}>
                    {createElement(Icons[iconBtn.icon], {})}
                  </div>
                ) : null}

                <p>{buttonText}</p>
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ViewFormCheckout;
