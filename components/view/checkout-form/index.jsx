"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const generateCustomFieldSchema = () => {
  return z.array(
    z
      .record(z.any()) // Mengizinkan objek dengan struktur bebas
      .superRefine((data, ctx) => {
        if (data.isRequired && (!data.value || data.value === "")) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["value"],
            message: "Required",
          });
        }

        // Validasi email jika type === "email"
        if (data.type === "email" && typeof data.value === "string") {
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

        // Validasi email jika type === "phoneNumber"
        if (data.type === "phoneNumber" && typeof data.value === "string") {
          if (!data.isRequired && !data.value) {
            return;
          }

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
      })
  );
};

const formSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters").max(50),
    email: z.string().email(),
    phoneNumber: z.string().regex(/^8\d{8,13}$/, {
      message: "Enter a valid number starting with 8, e.g. 8950000xxxx",
    }),
    address: z
      .string()
      .min(8, "Address must be at least 8 characters")
      .max(500),
    // city: z.string().optional(),
    // subdistrict: z.string().optional(),
    // isDropshipping: z.boolean().optional(),
    // nameDropshipper: z.string().optional(),
    // phoneNumberDropshipper: z.string().optional(),

    paymentMethod: z.enum(["bankTransfer", "cod", "e-payment"], {
      message: "Requred Payment Method",
    }),
    bank: z.any().optional(),
    courier: z.string().min(1, { message: "Required" }),
    courierPackage: z.string().min(1, { message: "Required" }),
    customFields: generateCustomFieldSchema(),
  })
  .superRefine((data, ctx) => {
    // Jika paymentMethod adalah "bankTransfer", maka "bank" harus diisi
    if (
      data.paymentMethod === "bankTransfer" &&
      (!data.bank || !data.bank.id || !data.bank.name)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["bank"],
        message: "Bank selection is required for bank transfer",
      });
    }
  });

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

import { createElement } from "react";
import * as Icons from "react-icons/fa";
import CustomLabelField from "./_components/CustomLabelField";
import Shipping from "./_components/Shipping";
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

const ViewFormCheckout = ({ section }) => {
  const { contents, submitEvent } = section;
  const {
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
      address: "",
      city: "",
      subdistrict: "",
      isDropshipping: false,
      nameDropshipper: "",
      phoneNumberDropshipper: false,
      paymentMethod: "",
      bank: {},
      courier: "",
      courierPackage: "",
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
      data?.paymentMethod === "cod"
        ? contentTemplateCOD
        : data?.paymentMethod === "bankTransfer"
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
      return;
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div>
      <Form {...form}>
        <form className="space-y-3 relative p-5">
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
                    placeholder="628952367xxxx"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <CustomLabelField
                  label="Alamat"
                  size={labelSize}
                  color={labelColor}
                />
                <FormControl>
                  <Textarea
                    style={{
                      border: `1px solid ${borderColor}`,
                      backgroundColor: inputColor,
                      fontSize: inputSize ? inputSize : "",
                      color: textInputColor,
                      borderRadius: rounded,
                    }}
                    className="placeholder:text-neutral-300"
                    placeholder="Jl Perjuangan 11"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="font-normal mt-2"></FormLabel>

                <CustomLabelField
                  label="Kota / Kecamatan"
                  size={labelSize}
                  color={labelColor}
                />
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        style={{
                          border: `1px solid ${borderColor}`,
                          fontSize: inputSize ? inputSize : "",
                          color: textInputColor,
                          borderRadius: rounded,
                          backgroundColor: inputColor,
                        }}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        {value
                          ? frameworks.find(
                              (framework) => framework.value === value
                            )?.label
                          : "Select framework..."}
                        <ChevronDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      style={{
                        border: `1px solid ${borderColor}`,
                        borderRadius: rounded,
                      }}
                      className="w-[200px] p-0 overflow-hidden"
                    >
                      <Command>
                        <CommandInput
                          placeholder="Search framework..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {frameworks.map((framework) => (
                              <CommandItem
                                style={{
                                  fontSize: inputSize ? inputSize : "",
                                  color: textInputColor,
                                  cursor: "pointer",
                                }}
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                {framework.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    value === framework.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Custom Fields */}
          {contents.length > 0 &&
            contents.map((content, index) => {
              return (
                <div style={{ margin: "20px 0px" }} key={content.id}>
                  {content.type === "title" && (
                    <ViewTitle
                      content={content}
                      labelColor={labelColor}
                      labelSize={labelSize}
                    />
                  )}
                  {(content.type === "text-input" ||
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

          <Shipping styles={section.wrapperStyle} />
          <PaymentMethod
            paymentMethod={section?.paymentMethod}
            styles={section.wrapperStyle}
          />

          <Button
            size="lg"
            style={{
              backgroundColor: buttonColor,
              marginBottom: "10px",
            }}
            onClick={form.handleSubmit(onSubmit)}
            className="w-full"
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
