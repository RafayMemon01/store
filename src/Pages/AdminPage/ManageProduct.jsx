// src/pages/ManageProduct.js

import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Text,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImg from "../../hooks/usePreviewImage";
import useShowToast from "../../hooks/useShowToast";
import useCreateProduct from "../../hooks/useCreateProduct";
import useFetchProducts from "../../hooks/useFetchProducts";
import useProductStore from "../../Store/useProductStore"; // Import Zustand store
import ProductComponent from "../../components/ProductComponent/ProductComponent";
import deleteProductFromFirestore from '../../hooks/deleteProductFromFirestore';
// import deleteProductFromFirestore from '../../firebase/deleteProductFromFirestore'; // Import the delete function

const ManageProduct = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state management for create product
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose
  } = useDisclosure(); // Modal state management for delete confirmation

  const imageRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const showToast = useShowToast();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productIdToDelete, setProductIdToDelete] = useState(null); // State to store the product ID to delete

  const { handleCreateProduct, isLoading } = useCreateProduct();
  const { loading, error } = useFetchProducts(); // Fetch products from Firestore using the custom hook
  const products = useProductStore((state) => state.products); // Get products from Zustand store
  const deleteProduct = useProductStore((state) => state.deleteProduct); // Zustand action to delete a product

  const handleProductCreation = async () => {
    try {
      await handleCreateProduct(
        selectedFile,
        productName,
        productDescription,
        productPrice
      );
      onClose();
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setSelectedFile(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const handleDelete = async () => {
    try {
      if (productIdToDelete) {
        await deleteProductFromFirestore(productIdToDelete); // Delete product from Firestore
        deleteProduct(productIdToDelete); // Update Zustand store after deletion
        showToast("Success", "Product deleted successfully", "success");
        onDeleteModalClose(); // Close the delete confirmation modal
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const handleDeleteClick = (productId) => {
    setProductIdToDelete(productId); // Set the product ID to delete
    onDeleteModalOpen(); // Open the confirmation modal
  };

  return (
    <Box minH={"100vh"} py={"2rem"}>
      <Text fontSize={32} fontWeight={"bold"}>
        Manage Products
      </Text>
      {/* Button to open the modal */}
      <Button
        onClick={onOpen}
        bg={"#F85606"}
        color={"white"}
        _hover={{
          bg: "white",
          border: "1px solid #F85606",
          color: "#F85606",
        }}
        mt={4}
      >
        Create Product
      </Button>

      {/* Modal for Create Product Form */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <Input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                borderColor={"gray.900"}
                placeholder="Product Name"
              />
              <Textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                borderColor={"gray.900"}
                placeholder="Product Description"
              />
              <Input
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                borderColor={"gray.900"}
                type="number"
                placeholder="0"
              />
              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />

              <BsFillImageFill
                style={{
                  marginTop: "15px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                size={16}
                onClick={() => imageRef.current.click()}
              />

              {selectedFile && (
                <Flex
                  mt={5}
                  w={"full"}
                  position={"relative"}
                  justifyContent={"center"}
                >
                  <Image width={200} h={200} src={selectedFile} alt="preview" />
                  <CloseButton
                    position={"absolute"}
                    top={2}
                    right={2}
                    onClick={() => setSelectedFile(null)}
                  />
                </Flex>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={handleProductCreation}
              isLoading={isLoading}
              bg={"#F85606"}
              color={"white"}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this product? This action cannot be undone.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onDeleteModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Display products or loading/error states */}
      {loading ? (
        <Spinner size="xl" mt={6} />
      ) : error ? (
        <Text color="red.500" mt={6}>
          Failed to load products: {error.message}
        </Text>
      ) : (
        <Flex flexWrap="wrap" justifyContent="center" mt={6}>
          {products.map((product) => (
            <ProductComponent
              key={product.id}
              productName={product.name}
              imageURL={product.imageURL}
              productDescription={product.description}
              productPrice={product.price}
              isAdmin={true} // Assuming this component is only used by admins in this context
              onDelete={() => handleDeleteClick(product.id)} // Trigger confirmation modal
            />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default ManageProduct;
