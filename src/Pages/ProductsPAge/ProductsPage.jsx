import { Box, Flex, Input, Spinner, Text } from '@chakra-ui/react';
import React, { useState, useMemo } from 'react';
import ProductComponent from '../../components/ProductComponent/ProductComponent';
import useFetchProducts from '../../hooks/useFetchProducts';
import useProductStore from '../../Store/useProductStore'; // Import Zustand store

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Local state for search query
  const { loading, error } = useFetchProducts(); // Fetch products from Firestore using the custom hook
  const products = useProductStore((state) => state.products); // Fetch products from Zustand store

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    return products?.filter((product) =>
      product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);
  
  console.log("Filtered Products:", filteredProducts);
  return (
    <Box minH="80vh" pt="2em">
      {/* Search Bar and Title */}
      <Flex gap={1} justifyContent={{ base: "center", md: "space-between" }} alignItems="center" flexWrap="wrap">
        <Text color="#F85606" fontSize="22px" fontWeight="bold">
          Products For You
        </Text>
        <Input
          placeholder="Search"
          outlineColor="#f85606"
          width="200px"
          size="sm"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Flex>

      {/* Display Spinner or Error */}
      {loading ? (
        <Spinner size="xl" mt={6} />
      ) : error ? (
        <Text color="red.500" mt={6}>
          Failed to load products: {error.message}
        </Text>
      ) : (
        // Display Products
        <Flex flexWrap="wrap" justifyContent="center" mt={6}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductComponent
                key={product.id}
                productName={product.name}
                imageURL={product.imageURL}
                productDescription={product.description}
                productPrice={product.price}
              />
            ))
          ) : (
            <Text mt={6} color="gray.500">
              No products found.
            </Text>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default ProductsPage;
