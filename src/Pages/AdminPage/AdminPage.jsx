import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Image,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
  Text,
  Flex,
  useToast
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import useCarouselStore from '../../Store/useCarouselStore ';
import useAuthStore from '../../Store/useAuthStore'; // Import the auth store

const AdminPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { images, loading, error, fetchImages, addImage, deleteImage } = useCarouselStore();
  const { logout } = useAuthStore(); // Access logout function from the auth store
  const [newImageFile, setNewImageFile] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchImages(); // Fetch images when the component mounts
  }, [fetchImages]);

  const handleAddImage = async () => {
    if (newImageFile) {
      try {
        await addImage(newImageFile);
        toast({
          title: 'Image Added',
          description: 'The image has been added successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setNewImageFile(null);
        onClose();
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to add image.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'No File Selected',
        description: 'Please select an image file to upload.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteImage = async () => {
    if (selectedImageId && selectedImageUrl) {
      try {
        await deleteImage(selectedImageId, selectedImageUrl);
        toast({
          title: 'Image Deleted',
          description: 'The image has been deleted successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setSelectedImageId(null);
        setSelectedImageUrl('');
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete image.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleLogout = () => {
    logout(); // Call the logout function from the auth store
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box minH={"100vh"} py={"2rem"}>
      <Flex flexWrap={'wrap'} alignItems="center" gap={4} m={4}>
        <Button onClick={onOpen} colorScheme="teal" mr={4}>
          Manage Carousel Images
        </Button>
        <Button as={Link} to="/h-admin/products" colorScheme="orange" mr={4}>
          Manage Products
        </Button>
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage Carousel Images</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="file"
              onChange={(e) => setNewImageFile(e.target.files[0])}
              placeholder="Choose image file"
            />
            <Button mt={4} colorScheme="teal" onClick={handleAddImage}>
              Add Image
            </Button>
            <Box mt={6}>
              {loading ? (
                <Spinner size="xl" />
              ) : error ? (
                <Text color="red.500">Failed to load images: {error.message}</Text>
              ) : (
                <Flex wrap="wrap">
                  {images.map(image => (
                    <Box key={image.id} p={2}>
                      <Image src={image.imageUrl} boxSize="150px" objectFit="cover" />
                      <Button mt={2} colorScheme="red" onClick={() => {
                        setSelectedImageId(image.id);
                        setSelectedImageUrl(image.imageUrl);
                      }}>
                        Delete
                      </Button>
                    </Box>
                  ))}
                </Flex>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => {
              setSelectedImageId(null);
              setSelectedImageUrl('');
            }}>
              Close
            </Button>
            {selectedImageId && (
              <Button colorScheme="red" onClick={handleDeleteImage}>
                Confirm Delete
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminPage;
