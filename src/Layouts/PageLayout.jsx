import { Flex, Text, Box, Button, Container } from "@chakra-ui/react";
import React from "react";
import WhatsAppButton from "../components/Carousel/WhatsAppButton";
import { Link } from "react-router-dom";
import useAuthStore from "../Store/useAuthStore";

const PageLayout = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <>
      <header>
        <Flex
          as="nav"
          align="center"
          justify={{ base: "center", md: "space-between" }}
          padding="1.5rem"
          flexWrap={"wrap"}
          bg="#F85606" // Deep Purple
          color="white"
        >
          <Text fontSize="xl" fontWeight="bold">
            Zyra
          </Text>
          <Flex flexWrap={"wrap"} justifyContent={{base:"center",md:"start"}} gap="2rem">
            <Link to={'/'} cursor="pointer" _hover={{ color: "#00FFFF" }}>
              Home
            </Link>
            <Link to={'#'} cursor="pointer" _hover={{ color: "#00FFFF" }}>
              About
            </Link>
            <Link to={'products'} cursor="pointer" _hover={{ color: "#00FFFF" }}>
              Products
            </Link>
            <Text to={'#'} cursor="pointer" _hover={{ color: "#00FFFF" }}>
              Contact
            </Text>
            {isAuthenticated?
            <Link to={'/h-admin'} cursor="pointer" _hover={{ color: "#00FFFF" }}>
              Dashboard
            </Link>:null}
          </Flex>
        </Flex>
      </header>
      <main>
        <Box bg="#f2eae0">
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
          bg="#F85606" // Deep Purple
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
