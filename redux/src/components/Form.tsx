import React from "react";
import { Box } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObjectSchema } from "yup";
import { FormInputValues } from "types";

type FormProps = {
  children: React.ReactNode;
  schema?: AnyObjectSchema;
  onSubmit: (data: FormInputValues) => void;
  defaultValues?: FormInputValues;
};

function Form({ children, schema, onSubmit, defaultValues }: FormProps) {
  const methods = useForm<FormInputValues>({
    resolver: schema ? yupResolver(schema) : undefined,
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Box w="full">
        <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      </Box>
    </FormProvider>
  );
}

export default Form;
