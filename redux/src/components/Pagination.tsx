import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex } from "@chakra-ui/react";

type Props = {
  currentPage: number;
  arrPages: number[];
  checkLastPage: (pageNumber: number) => boolean;
  changePage: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

function Pagination({
  currentPage,
  arrPages,
  changePage,
  nextPage,
  prevPage,
  checkLastPage,
}: Props) {
  return (
    <Flex justify="center" mt="5" gap="3">
      <Avatar
        bg="gray.300"
        cursor="pointer"
        _hover={{
          bg: "green.300",
        }}
        icon={<ArrowLeftIcon p="1" color="gray.600" />}
        onClick={prevPage}
      />
      {arrPages.map((num) =>
        num === currentPage ? (
          <Avatar
            key={num}
            bg="green.300"
            cursor="pointer"
            icon={<Box color="gray.600">{num}</Box>}
          />
        ) : (
          <Avatar
            key={num}
            bg="gray.300"
            cursor="pointer"
            _hover={{
              bg: checkLastPage(num > 0 ? num - 1 : num) ? "gray.300" : "green.300",
            }}
            icon={<Box color="gray.600">{num}</Box>}
            onClick={() => {
              if (checkLastPage(num > 0 ? num - 1 : num)) return;
              changePage(num);
            }}
          />
        )
      )}
      <Avatar
        bg="gray.300"
        cursor="pointer"
        _hover={{
          bg: "green.300",
        }}
        icon={<ArrowRightIcon p="1" color="gray.600" />}
        onClick={(e) => {
          if (checkLastPage(currentPage)) return;
          nextPage();
        }}
      />
    </Flex>
  );
}

export default Pagination;
