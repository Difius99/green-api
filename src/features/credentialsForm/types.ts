export type FormValues = {
  idInstance: string;
  apiTokenInstance: string;
};

export type CredentialsFormProps = {
  initialValues?: FormValues;
  serverError?: string | null;
  onSubmit: (value: FormValues) => void | Promise<void>;
  onClose: () => void;
};
