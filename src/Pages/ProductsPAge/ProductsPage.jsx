import { Box, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import ProductComponent from '../../components/ProductComponent/ProductComponent';

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Add your search/filter logic here
  };

  return (
    <Box minH="80vh" pt="2em">
      <Flex gap={1} justifyContent={{base:"center",md:"space-between"}} alignItems="center" flexWrap="wrap">
        <Text color="#F85606" fontSize="22px" fontWeight="bold">
          Products For You
        </Text>
        <Input
          placeholder="Search"
          outlineColor="#f85606"
          width="200px" // Changed width for better visibility
          size="sm"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Flex>

      <Flex flexWrap={"wrap"}>
      <ProductComponent
            imageURL={"https://via.placeholder.com/150"}
            productName="Product Name"
            productDescription="Product description goes here. It should be brief and to the point."
            productPrice=" $29.99"
          />
        </Flex>

    </Box>

  );
};

export default ProductsPage;
