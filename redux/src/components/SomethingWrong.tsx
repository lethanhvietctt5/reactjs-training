import { Flex, Icon } from "@chakra-ui/react";

type Props = {
  message: string;
};

function SomethingWrong({ message }: Props) {
  return (
    <Flex direction="column" h="100vh" w="full" justify="center" align="center">
      <Icon w="28" h="28" color="red.500" mb="-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z"
          ></path>
        </svg>
      </Icon>
      {message}
    </Flex>
  );
}

export default SomethingWrong;
