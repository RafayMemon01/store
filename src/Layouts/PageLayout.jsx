import { Flex, Text, Box, Button, Container } from "@chakra-ui/react";
import React from "react";
import WhatsAppButton from "../components/Carousel/WhatsAppButton";

const PageLayout = ({ children }) => {
  return (
    <>
      <header>
        <Flex
          as="nav"
          align="center"
          justify={{ base: "center", md: "space-between" }}
          padding="1.5rem"
          flexWrap={"wrap"}
          bg="#4B0082" // Deep Purple
          color="white"
        >
          <Text fontSize="xl" fontWeight="bold">
            Zyra
          </Text>
          <Flex gap="2rem">
            <Text cursor="pointer" _hover={{ color: "#00FFFF" }}>
              Home
            </Text>
            <Text cursor="pointer" _hover={{ color: "#00FFFF" }}>
              About
            </Text>
            <Text cursor="pointer" _hover={{ color: "#00FFFF" }}>
              Products
            </Text>
            <Text cursor="pointer" _hover={{ color: "#00FFFF" }}>
              Contact
            </Text>
          </Flex>
        </Flex>
      </header>
      <main>
        <Box bg="#F0F0F0">
          <Container maxW="1200px">        <WhatsAppButton />
          {children}</Container>
        </Box>
      </main>
      <footer>
        <Flex
          flexWrap={"wrap"}
          align="center"
          justify={{ base: "center", md: "space-between" }}
          padding="1rem"
          bg="#4B0082" // Deep Purple
          color="white"
          mt="auto"
        >
          <Text fontSize="sm">
            &copy; {new Date().getFullYear()} Zyra. All rights reserved.
          </Text>
          <Text fontSize="sm">This website is created by Rafay Memon</Text>
        </Flex>
      </footer>
    </>
  );
};

export default PageLayout;
