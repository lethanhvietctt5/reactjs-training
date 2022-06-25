import { Box, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";

type FormInputProps = {
  register?: UseFormRegister<FieldValues>;
  errors?: {
    [x: string]: FieldError | undefined;
  };
  fieldName: string;
  type: string;
  classname?: string;
};

function FormInput({ register, errors, fieldName, type, classname }: FormInputProps) {
  return (
    <Box className={classname} my="2" mx="2">
      <InputGroup colorScheme={"teal"}>
        <InputLeftElement pointerEvents="none" children={<HiOutlineMail color="gray.100" />} />
        <Input
          {...(register ? { ...register(fieldName) } : null)}
          type={type}
          placeholder="Enter email"
          focusBorderColor="green.200"
        />
      </InputGroup>
      <Text fontSize="sm" color="red" ml="2">
        {errors ? errors[fieldName]?.message : ""}
      </Text>
    </Box>
  );
}

export default FormInput;
