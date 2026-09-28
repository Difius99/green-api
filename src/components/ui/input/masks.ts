import IMask from "imask";
import type { MaskVariant } from "./types";

export type MaskInstance = ReturnType<typeof IMask>;

export type MaskProps = {
  options: Parameters<typeof IMask>[1];
  label: string;
  getValue: (mask: MaskInstance) => string;
  setValue: (mask: MaskInstance, value: string) => void;
};

export const MASKS: Record<MaskVariant, MaskProps> = {
  phone: {
    options: {
      mask: "+{7} 000 000-00-00",
      lazy: false,
      overwrite: true,
    },
    label: "Phone",
    getValue: (mask) => mask.unmaskedValue,
    setValue: (mask, value) => {
      mask.unmaskedValue = value ?? "";
      mask.updateValue();
    },
  },
  time: {
    options: {
      mask: "HH:MM",
      lazy: false,
      overwrite: true,
      blocks: {
        HH: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 23,
          maxLength: 2,
        },
        MM: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
          maxLength: 2,
        },
      },
    },
    label: "Time",
    getValue: (mask) => mask.unmaskedValue,
    setValue: (mask, value) => {
      mask.unmaskedValue = value ?? "";
      mask.updateValue();
    },
  },
  interval: {
    options: {
      mask: "HH:MM",
      lazy: false,
      overwrite: true,
      blocks: {
        HH: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 23,
          maxLength: 2,
        },
        MM: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
          maxLength: 2,
        },
      },
    },
    label: "Time Interval",
    getValue: (mask) => mask.unmaskedValue,
    setValue: (mask, value) => {
      mask.unmaskedValue = value ?? "";
      mask.updateValue();
    },
  },
} satisfies Record<MaskVariant, MaskProps>;
