import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import image1 from "../../Images/image1.jpg";
import image2 from "../../Images/image2.jpg";
import image3 from "../../Images/image3.jpg";
import Carousel from "../../components/Carousel/Carousel";
import ProductComponent from "../../components/ProductComponent/ProductComponent";
import { Link } from "react-router-dom";

const HomePage = () => {
  const images = [image1, image2, image3];
  return (
    <Box>
      <Box>
        <Carousel images={images} />
      </Box>
      <Box mt={"1em"}>
        <h2 style={{ fontSize: "32px" }}>New Arrival</h2>

        <Flex flexWrap={"wrap"}>
          <ProductComponent
            imageURL={"https://via.placeholder.com/150"}
            productName="Product Name"
            productDescription="Product description goes here. It should be brief and to the point."
            productPrice=" $29.99"
          />
          <ProductComponent
            imageURL={"https://via.placeholder.com/150"}
            productName="Product Name"
            productDescription="Product description goes here. It should be brief and to the point."
            productPrice=" $29.99"
          />
          <ProductComponent
            imageURL={"https://via.placeholder.com/150"}
            productName="Product Name"
            productDescription="Product description goes here. It should be brief and to the point."
            productPrice=" $29.99"
          />
          <ProductComponent
            imageURL={"https://via.placeholder.com/150"}
            productName="Product Name"
            productDescription="Product description goes here. It should be brief and to the point."
            productPrice=" $29.99"
          />
          <ProductComponent
            imageURL={"https://via.placeholder.com/150"}
            productName="Product Name"
            productDescription="Product description goes here. It should be brief and to the point."
            productPrice=" $29.99"
          />
          <ProductComponent
            imageURL={"https://via.placeholder.com/150"}
            productName="Product Name"
            productDescription="Product description goes here. It should be brief and to the point."
            productPrice=" $29.99"
          />
        </Flex>
        {/* //view All Products //navigate to /products */}
        <Box mt={"1em"} textAlign={"center"}>
          <Link to="/products">View All Products</Link>
        </Box>


      </Box>
    </Box>
  );
};
export default HomePage;
