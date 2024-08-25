import React from "react";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import Carousel from "../../components/Carousel/Carousel"; // Import your Carousel component
import ProductComponent from "../../components/ProductComponent/ProductComponent";
import { Link } from "react-router-dom";
import useFetchProducts from "../../hooks/useFetchProducts";
import useProductStore from "../../Store/useProductStore";
import useCarouselImages from "../../hooks/useCarosualmages"; // Import the hook for fetching carousel images

const HomePage = () => {
  const { loading: productsLoading, error: productsError } = useFetchProducts(); // Fetch products from Firestore
  const { images, loading: carouselLoading, error: carouselError } = useCarouselImages(); // Fetch carousel images
  const products = useProductStore((state) => state.products); // Get products from Zustand store

  // Get the top 6 products
  const topProducts = products.slice(0, 6);

  return (
    <Box>
      <Box>
        {carouselLoading ? (
          <Spinner size="xl" />
        ) : carouselError ? (
          <Text color="red.500">Failed to load carousel images: {carouselError.message}</Text>
        ) : (
          <Carousel images={images.map(img => img.imageUrl)} />
        )}
      </Box>
      <Box mt={"1em"}>
        <h2 style={{ fontSize: "32px" }}>New Arrival</h2>

        {/* Display Spinner or Error */}
        {productsLoading ? (
          <Spinner size="xl" mt={6} />
        ) : productsError ? (
          <Text color="red.500" mt={6}>
            Failed to load products: {productsError.message}
          </Text>
        ) : (
          <Flex flexWrap={"wrap"} justifyContent="center" mt={6}>
            {topProducts.length > 0 ? (
              topProducts.map((product) => (
                <ProductComponent
                  key={product.id}
                  imageURL={product.imageURL}
                  productName={product.productName || product.name}
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

        {/* View All Products */}
        <Box mt={"1em"} textAlign={"center"}>
          <Link to="/products">View All Products</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
