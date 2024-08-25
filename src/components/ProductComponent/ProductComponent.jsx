import React, { useState } from 'react';
import { Box, Image, Text, Badge, Button, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';

const ProductComponent = ({ productName, imageURL, productDescription, productPrice, isAdmin, onDelete }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleReadMoreClick = () => {
    setIsReadMore(true);
    onOpen();
  };

  return (
    <>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        p="3"
        bg="#ffffff"
        my="4"
        mx={".6"}
      >
        <Image
          src={imageURL}
          alt="Product Image"
          borderRadius="md"
          mb="4"
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" bg="#f85606" color="white">
              New
            </Badge>
          </Box>

          <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
            {productName}
          </Text>

          <Text color="gray.600" fontSize="sm" mt="2" noOfLines={isReadMore ? undefined : 2}>
            {productDescription}
          </Text>

          {!isReadMore && productDescription.length > 20 && (
            <Button mt="2" size="sm" onClick={handleReadMoreClick}>
              Read More
            </Button>
          )}

          <Flex mt="4" flexWrap={'wrap'} alignItems="center" justifyContent="space-between">
            <Text fontSize="xl" fontWeight="bold" color="#f85606">
              {productPrice} PKR
            </Text>
            <Button
              colorScheme="orange"
              variant="solid"
              size="sm"
              onClick={() => window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=I%20am%20interested%20in%20${productName}`, '_blank')}
            >
              Buy on WhatsApp
            </Button>
          </Flex>

          {/* Conditionally render the delete button if the user is an admin */}
          {isAdmin && (
            <Button
              mt={4}
              colorScheme="red"
              size="sm"
              onClick={onDelete}
            >
              Delete Product
            </Button>
          )}
        </Box>
      </Box>

      {/* Modal for full description */}
      <Modal isOpen={isOpen} onClose={()=>{setIsReadMore(false);onClose();}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{productName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{productDescription}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductComponent;
