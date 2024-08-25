import React from 'react';
import { Box, Flex, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, Button, IconButton, useToast, VStack, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase'; // Import Firebase auth
import { signOut } from 'firebase/auth'; // Import signOut function from Firebase
import useAuthStore from '../../Store/useAuthStore'; // Zustand store for auth

const AdminPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const setUser = useAuthStore((state) => state.setUser); // Zustand action to reset user

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user from Zustand store
      toast({
        title: 'Logged Out',
        description: 'You have been logged out successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Logout Failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex h="90vh">
      {/* Sidebar for larger screens */}
      <Box
        w={{ base: 'full', md: '250px' }}
        bg="#F85606" // Orange color
        color="black"
        p={4}
        display={{ base: 'none', md: 'block' }}
      >
        <SidebarContent onLogout={handleLogout} />
      </Box>

      {/* Drawer for smaller screens */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Admin Menu</DrawerHeader>
            <DrawerBody>
              <SidebarContent onLogout={handleLogout} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      {/* Main content area */}
      <Box flex="1" p={4}>
        <Flex alignItems="center" mb={4}>
          {/* Hamburger button for small screens */}
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            bg="#F85606"
            color="white"
          />
          <Box as="h1" ml={4} fontSize="2xl" color="#F85606">
            Admin Dashboard
          </Box>
        </Flex>
        <Box h={"80vh"}>
            
            

        </Box>
      </Box>
    </Flex>
  );
};

const SidebarContent = ({ onLogout }) => {
  return (
    <>
    <Flex h={"70vh"} mt={'2em'} flexDir={'column'} gap={3} alignItems={'start'}>

      <Button variant="link" color="black" mb={4} as={Link} to="/h-admin">
        Dashboard Home
      </Button>
      <Button variant="link" color="black" mb={4} as={Link} to="/h-admin/products">
        Manage Products
      </Button>
      
      
      {/* Logout Button */}
      <Button mt={'auto'} variant="link" color="black" mb={4} onClick={onLogout}>
        Logout
      </Button>
    </Flex>
    </>
  );
};

export default AdminPage;
