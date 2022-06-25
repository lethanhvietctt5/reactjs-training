import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AnyObjectSchema } from "yup";
import FormInput from "./FormInput";

type FormProps<T> = {
  schema: AnyObjectSchema;
  onSubmit: SubmitHandler<T>;
  classname?: string;
  children: React.ReactNode | React.ReactNode[];
};

function Form<T>({ schema, onSubmit, children, classname }: FormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: yupResolver(schema),
  });

  return (
    <form className={classname} onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child: React.ReactNode, idx) => {
            if (React.isValidElement(child)) {
              if (child.type === React.createElement(FormInput).type)
                return React.cloneElement(child, { register, errors });
              return child;
            } else return child;
          })
        : children}
    </form>
  );
}

export default Form;
