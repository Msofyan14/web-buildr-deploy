import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomLabelField from "./CustomLabelField";

export const provinsi = [
  { value: "prov-01", label: "Jawa Barat" },
  { value: "prov-02", label: "Jawa Tengah" },
  { value: "prov-03", label: "DKI Jakarta" },
];

export const kota = [
  { value: "kota-01", provinsivalue: "prov-01", label: "Bandung" },
  { value: "kota-02", provinsivalue: "prov-01", label: "Bekasi" },
  { value: "kota-03", provinsivalue: "prov-02", label: "Semarang" },
  { value: "kota-04", provinsivalue: "prov-03", label: "Jakarta Selatan" },
];

export const kecamatan = [
  { value: "kec-01", kotavalue: "kota-01", label: "Coblong" },
  { value: "kec-02", kotavalue: "kota-01", label: "Sukajadi" },
  { value: "kec-03", kotavalue: "kota-02", label: "Medansatria" },
  { value: "kec-04", kotavalue: "kota-03", label: "Candisari" },
  { value: "kec-05", kotavalue: "kota-04", label: "Tebet" },
];

const SelectPopoverField = ({
  control,
  name,
  label,
  options,
  labelSize,
  labelColor,
  inputSize,
  inputColor,
  borderColor,
  textInputColor,
  rounded = "0.5rem",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <FormLabel className="font-normal mt-2"></FormLabel>

          {label && (
            <CustomLabelField
              label={label}
              size={labelSize}
              color={labelColor}
            />
          )}

          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  style={{
                    border: `1px solid ${borderColor}`,
                    fontSize: inputSize || "",
                    color: textInputColor,
                    borderRadius: rounded,
                    backgroundColor: inputColor,
                  }}
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {field?.value ? (
                    options.find((data) => data.value === field.value)?.label
                  ) : (
                    <span className="text-neutral-300">Pilih {label}</span>
                  )}
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
                  <CommandInput placeholder={`Cari ${label}`} className="h-9" />
                  <CommandList>
                    <CommandEmpty>Tidak Ditemukan</CommandEmpty>
                    <CommandGroup>
                      {options.map((data) => (
                        <CommandItem
                          key={data.value}
                          value={data.value}
                          style={{
                            fontSize: inputSize || "",
                            color: textInputColor,
                            cursor: "pointer",
                          }}
                          onSelect={(currentValue) => {
                            field.onChange(currentValue);
                            setOpen(false);
                          }}
                        >
                          {data.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              field.value === data.value
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
  );
};

export const ViewAddressField = ({ address, styles }) => {
  const {
    labelSize,
    labelColor,
    borderColor,
    inputColor,
    inputSize,
    textInputColor,
    rounded,
  } = styles;

  const { control } = useFormContext();

  return (
    <>
      {address?.type === "subdistrict-only" ? (
        <SelectPopoverField
          control={control}
          name="address.subdistrict"
          label="Kecamatan"
          options={kecamatan}
          labelSize={labelSize}
          labelColor={labelColor}
          inputSize={inputSize}
          inputColor={inputColor}
          borderColor={borderColor}
          textInputColor={textInputColor}
        />
      ) : (
        <>
          <SelectPopoverField
            control={control}
            name="address.province"
            label="Provinsi"
            options={provinsi}
            labelSize={labelSize}
            labelColor={labelColor}
            inputSize={inputSize}
            inputColor={inputColor}
            borderColor={borderColor}
            textInputColor={textInputColor}
          />
          <SelectPopoverField
            control={control}
            name="address.district"
            label="Kota/Kabupaten"
            options={kota}
            labelSize={labelSize}
            labelColor={labelColor}
            inputSize={inputSize}
            inputColor={inputColor}
            borderColor={borderColor}
            textInputColor={textInputColor}
          />
          <SelectPopoverField
            control={control}
            name="address.subdistrict"
            label="Kecamatan"
            options={kecamatan}
            labelSize={labelSize}
            labelColor={labelColor}
            inputSize={inputSize}
            inputColor={inputColor}
            borderColor={borderColor}
            textInputColor={textInputColor}
          />
        </>
      )}

      <FormField
        control={control}
        name="address.fullAddress"
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
    </>
  );
};
