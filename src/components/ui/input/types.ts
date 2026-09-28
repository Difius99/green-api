export type InputSize = "m" | "l";
export type InputStatus = "default" | "error" | "success";
export type MaskVariant = "phone" | "time" | "interval";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  size?: InputSize;
  status?: InputStatus;
  helperText?: string;
  label?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  isValidate?: boolean;
};

export type InputFieldStyledProps = {
  $status?: InputStatus;
};

export type InputStyledProps = {
  $status?: InputStatus;
};

export type MaskedInputProps = Omit<InputProps, "onChange" | "value"> & {
  maskVariant: MaskVariant;
  value?: string;
  onChange?: (value: string) => void;
};
