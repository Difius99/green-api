import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input/Input";
import { Container, InputsWrapper, ButtonsWrapper, HelperText } from "./styled";
import type { CredentialsFormProps, FormValues } from "./types";
import { useEffect } from "react";
import Button from "../../components/ui/button/Button";

export default function CredentialsForm({
  initialValues,
  onSubmit,
  onClose,
  serverError,
}: CredentialsFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      idInstance: initialValues?.idInstance || "",
      apiTokenInstance: initialValues?.apiTokenInstance || "",
    },
  });

  useEffect(() => {
    if (initialValues) reset(initialValues);
  }, [initialValues, reset]);

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <InputsWrapper>
        <Input
          label="ID инстанса"
          status={errors.idInstance ? "error" : "default"}
          helperText={errors.idInstance?.message}
          isValidate={true}
          {...register("idInstance", { required: "Введите idInstance" })}
        />

        <Input
          label="API токен"
          type="password"
          autoComplete="off"
          status={errors.apiTokenInstance ? "error" : "default"}
          helperText={errors.apiTokenInstance?.message}
          isValidate={true}
          {...register("apiTokenInstance", {
            required: "Введите apiTokenInstance",
          })}
        />
      </InputsWrapper>

      <ButtonsWrapper>
        <Button
          type="submit"
          disabled={isSubmitting}
          variant={"secondary"}
          fullWidth={true}
        >
          Сохранить
        </Button>
        <Button
          type="button"
          disabled={isSubmitting}
          variant={"primary"}
          fullWidth={true}
          onClick={onClose}
        >
          Отмена
        </Button>
      </ButtonsWrapper>

      <HelperText $isError={!!serverError}>{serverError || " "}</HelperText>
    </Container>
  );
}
