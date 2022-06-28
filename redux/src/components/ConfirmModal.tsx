import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmModal({ isOpen, title, onCancel, onConfirm }: Props) {
  const { onClose } = useDisclosure();
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton onClick={onCancel} />
          <ModalFooter gap="4">
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={onConfirm} colorScheme="red">
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmModal;
