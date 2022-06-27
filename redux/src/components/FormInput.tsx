import { Box, Input, Text, Textarea } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useController, UseControllerProps } from "react-hook-form";
import FormInputValues from "types/formInput";

type FormInputProps = {
  type: string;
  placeHolder?: string;
  defaultValue?: string | number;
} & UseControllerProps<FormInputValues>;

function FormInput({ type, placeHolder, defaultValue, ...props }: FormInputProps) {
  const {
    field,
    formState: { errors },
  } = useController<FormInputValues>(props);

  return (
    <Box mb="3">
      {type === "textarea" ? (
        <Textarea
          {...field}
          placeholder="Content for your post"
          focusBorderColor="green.200"
          defaultValue={defaultValue}
          h="40"
        />
      ) : (
        <Input
          {...field}
          type={type}
          placeholder={placeHolder}
          defaultValue={defaultValue}
          focusBorderColor="green.200"
        />
      )}

      <ErrorMessage
        errors={errors}
        name={props.name}
        render={({ message }) => (
          <Text fontSize="sm" color="red" ml="2">
            {message}
          </Text>
        )}
      />
    </Box>
  );
}

export default FormInput;
