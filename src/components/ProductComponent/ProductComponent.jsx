import { Box, Image, Text, Badge, Button, Flex } from '@chakra-ui/react';
import React from 'react';

const ProductComponent = () => {
  return (
    <>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        p="5"
        bg="#ffffff"
        m="4"
      >
        <Image
          src="https://via.placeholder.com/150" // Placeholder image; replace with your image source
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
            Product Name
          </Text>

          <Text color="gray.600" fontSize="sm" mt="2">
            Product description goes here. It should be brief and to the point.
          </Text>

          <Flex mt="4" flexWrap={'wrap'} alignItems="center" justifyContent="space-between">
            <Text fontSize="xl" fontWeight="bold" color="#f85606">
              $29.99
            </Text>
            <Button
              colorScheme="orange"
              variant="solid"
              size="sm"
              onClick={() => window.open('https://wa.me/yourphonenumber?text=I%20am%20interested%20in%20this%20product', '_blank')}
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
