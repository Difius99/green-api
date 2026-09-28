import IMask from "imask";
import { Input } from "./Input";
import type { MaskedInputProps } from "./types";
import { useEffect, useRef } from "react";
import { MASKS } from "./masks";

export default function MaskedInput({
  maskVariant,
  value,
  onChange,
  label,
  ...rest
}: MaskedInputProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  const maskRef = useRef<ReturnType<typeof IMask> | null>(null);
  const config = MASKS[maskVariant];
  useEffect(() => {
    if (!ref.current) return;

    const config = MASKS[maskVariant];
    const instance = IMask(ref.current, config.options);
    maskRef.current = instance;

    maskRef.current.on("accept", () => {
      if (!maskRef.current) return;

      onChange?.(maskRef.current.unmaskedValue);
    });

    return () => {
      maskRef.current?.destroy();
    };
  }, [onChange]);

  useEffect(() => {
    if (maskRef.current && typeof value === "string") {
      if (maskRef.current.unmaskedValue !== value) {
        maskRef.current.unmaskedValue = value;
        maskRef.current.updateValue();
      }
    }
  }, [value]);

  return <Input ref={ref} label={label ?? config.label} {...rest} />;
}
