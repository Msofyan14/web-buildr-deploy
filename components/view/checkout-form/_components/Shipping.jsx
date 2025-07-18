import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
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
import { Check, ChevronDown } from "lucide-react";

import { useState } from "react";
import ViewTitle from "./ViewTitle";

const couriers = [
  {
    value: "jne",
    label: "JNE",
    packages: [
      { value: "jne-oke", label: "JNE OKE (Ongkos Kirim Ekonomis)" },
      { value: "jne-reg", label: "JNE REG (Reguler)" },
      { value: "jne-yes", label: "JNE YES (Yakin Esok Sampai)" },
    ],
  },
  {
    value: "jnt",
    label: "J&T Express",
    packages: [
      { value: "jnt-express", label: "J&T Express (Regular)" },
      { value: "jnt-economy", label: "J&T Economy" },
    ],
  },
  {
    value: "sicepat",
    label: "SiCepat",
    packages: [
      { value: "sicepat-reg", label: "SiCepat REG (Reguler)" },
      { value: "sicepat-best", label: "SiCepat BEST (Besok Sampai Tujuan)" },
      { value: "sicepat-cod", label: "SiCepat COD" },
    ],
  },
  {
    value: "tiki",
    label: "TIKI",
    packages: [
      { value: "tiki-reg", label: "TIKI REG (Reguler)" },
      { value: "tiki-ons", label: "TIKI ONS (Over Night Service)" },
      { value: "tiki-eco", label: "TIKI ECO (Economy Service)" },
    ],
  },
  {
    value: "pos",
    label: "POS Indonesia",
    packages: [
      { value: "pos-kilat", label: "POS Kilat Khusus" },
      { value: "pos-express", label: "POS Express" },
    ],
  },
];

const Shipping = ({ styles }) => {
  const {
    width,
    titleSize,
    titleColor,
    inputSize,
    textInputColor,
    rounded,
    inputColor,
    borderColor,
  } = styles;

  const { control, setValue, watch } = useFormContext();
  const [open, setOpen] = useState(false);
  const [openPackage, setOpenPackage] = useState(false);

  const selectedCourier = watch("courier");

  const availablePackages =
    couriers?.find((courier) => courier.value === selectedCourier)?.packages ||
    [];
  return (
    <div>
      <ViewTitle
        content={{ value: "Pengiriman" }}
        titleSize={titleSize}
        titleColor={titleColor}
      />

      <div
        className={` ${
          width < 400
            ? "flex flex-wrap gap-5"
            : "flex flex-wrap md:!flex-nowrap justify-between gap-5 w-full "
        }`}
      >
        <FormField
          control={control}
          name="courier"
          render={({ field }) => (
            <FormItem className=" w-full">
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
                      className="w-full justify-between"
                    >
                      {field.value
                        ? couriers.find(
                            (courier) => courier.value === field.value
                          )?.label
                        : "Pilih Kurir..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    style={{
                      border: `1px solid ${borderColor}`,
                      borderRadius: rounded,
                    }}
                    className="min-w-full p-0 overflow-hidden"
                  >
                    <Command>
                      <CommandInput placeholder="Cari Kurir..." />
                      <CommandList>
                        <CommandEmpty>Tidak Ditemukan</CommandEmpty>
                        <CommandGroup>
                          {couriers.map((courier) => (
                            <CommandItem
                              key={courier.value}
                              value={courier.value}
                              onSelect={(currentValue) => {
                                setValue("courier", currentValue, {
                                  shouldValidate: true,
                                });

                                if (currentValue !== field.value) {
                                  setValue("courierPackage", "");
                                }

                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === courier.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {courier.label}
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

        {selectedCourier && (
          <FormField
            control={control}
            name="courierPackage"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Popover open={openPackage} onOpenChange={setOpenPackage}>
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
                        aria-expanded={openPackage}
                        className="w-full justify-between"
                      >
                        {field.value
                          ? availablePackages.find(
                              (pkg) => pkg.value === field.value
                            )?.label
                          : "Pilih Paket..."}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      style={{
                        border: `1px solid ${borderColor}`,
                        borderRadius: rounded,
                      }}
                      className="min-w-full p-0 overflow-hidden"
                    >
                      <Command>
                        <CommandInput placeholder="Cari Paket..." />
                        <CommandList>
                          <CommandEmpty>Tidak Ditemukan</CommandEmpty>
                          <CommandGroup>
                            {availablePackages.map((pkg) => (
                              <CommandItem
                                key={pkg.value}
                                value={pkg.value}
                                onSelect={(currentValue) => {
                                  setValue("courierPackage", currentValue, {
                                    shouldValidate: true,
                                  });
                                  setOpenPackage(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === pkg.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {pkg.label}
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
        )}
      </div>
    </div>
  );
};

export default Shipping;
