import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { AnyObjectSchema } from "yup";
import FormInputValues from "types/formInput";
import { Box } from "@chakra-ui/react";

type FormProps = {
  children: React.ReactNode;
  schema: AnyObjectSchema;
  onSubmit: (data: FormInputValues) => void;
};

function Form({ children, schema, onSubmit }: FormProps) {
  const methods = useForm<FormInputValues>({
    resolver: yupResolver(schema),
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
