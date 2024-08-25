import React from "react";
import { Flex, Text, Box, Button, Container, IconButton, Collapse, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import useAuthStore from "../Store/useAuthStore";
import WhatsAppButton from "../components/Carousel/WhatsAppButton";

const PageLayout = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <header>
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          padding="1.5rem"
          bg="#F85606" // Deep Orange
          color="white"
          position="relative"
        >
          <Text fontSize="xl" fontWeight="bold">
            Zyra
          </Text>
          <IconButton
            display={{ base: "block", md: "none" }}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={onToggle}
            aria-label="Toggle Navigation"
            bg="transparent"
            color="white"
          />
          <Collapse in={isOpen} animateOpacity>
            <Flex
              direction="column"
              align="center"
              display={{ base: "flex", md: "none" }}
              bg="#F85606"
              position="absolute"
              top="100%"
              left="0"
              width="100%"
              zIndex="dropdown"
              py="1rem"
              gap="1rem"
            >
              <Link to={'/'} onClick={onToggle} _hover={{ color: "#00FFFF" }}>
                Home
              </Link>
              <Link to={'#'} onClick={onToggle} _hover={{ color: "#00FFFF" }}>
                About
              </Link>
              <Link to={'/products'} onClick={onToggle} _hover={{ color: "#00FFFF" }}>
                Products
              </Link>
              <Link to={'#'} onClick={onToggle} _hover={{ color: "#00FFFF" }}>
                Contact
              </Link>
              {isAuthenticated && (
                <Link to={'/h-admin'} onClick={onToggle} _hover={{ color: "#00FFFF" }}>
                  Dashboard
                </Link>
              )}
            </Flex>
          </Collapse>
          <Flex
            display={{ base: "none", md: "flex" }}
            align="center"
            gap="2rem"
          >
            <Link to={'/'} _hover={{ color: "#00FFFF" }}>
              Home
            </Link>
            <Link to={'#'} _hover={{ color: "#00FFFF" }}>
              About
            </Link>
            <Link to={'/products'} _hover={{ color: "#00FFFF" }}>
              Products
            </Link>
            <Link to={'#'} _hover={{ color: "#00FFFF" }}>
              Contact
            </Link>
            {isAuthenticated && (
              <Link to={'/h-admin'} _hover={{ color: "#00FFFF" }}>
                Dashboard
              </Link>
            )}
          </Flex>
        </Flex>
      </header>
      <main>
        <Box bg="#f2eae0">
          <Container maxW="1200px">
            <WhatsAppButton />
            {children}
          </Container>
        </Box>
      </main>
      <footer>
        <Flex
          flexWrap="wrap"
          align="center"
          justify={{ base: "center", md: "space-between" }}
          padding="1rem"
          bg="#F85606" // Deep Orange
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
