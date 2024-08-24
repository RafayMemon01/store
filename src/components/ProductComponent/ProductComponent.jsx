import { Box, Image, Text, Badge, Button, Flex } from '@chakra-ui/react';
import React from 'react';

const ProductComponent = ({productName,imageURL,productDescription,productPrice}) => {
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

          <Text color="gray.600" fontSize="sm" mt="2">
            {productDescription}
          </Text>

          <Flex mt="4" flexWrap={'wrap'} alignItems="center" justifyContent="space-between">
            <Text fontSize="xl" fontWeight="bold" color="#f85606">
             {productPrice}
            </Text>
            <Button
              colorScheme="orange"
              variant="solid"
              size="sm"
              onClick={() => window.open(`https://wa.me/yourphonenumber?text=I%20am%20interested%20in%20${productName}`, '_blank')}
            >
              Buy on WhatsApp
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default ProductComponent;
