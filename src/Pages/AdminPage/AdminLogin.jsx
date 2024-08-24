import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  useToast,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase"; // Import Firebase auth
import useAuthStore from "../../Store/useAuthStore"; // Import Zustand store
import { Navigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAuthStore((state) => state.setUser); // Zustand action to set user
  const toast = useToast();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(email, password);
      if (user) {
        setUser(user.user);
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        Navigate("/h-admin");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/h-admin" />;
  }

  return (
    <Box height={"70vh"} p={8} display="flex" alignItems="center" justifyContent="center">
      <VStack maxW={"100%"} spacing={4} align="stretch">
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          bg="#F85606"
          color={"white"}
          _hover={{
            bg: "white",
            border: "1px solid #F85606",
            color: "#F85606",
          }}
          onClick={handleLogin}
          isLoading={loading}
          spinner={<Spinner size="md" />}
        >
          Login
        </Button>
        {error && <Text color="red.500">{error.message}</Text>}
      </VStack>
    </Box>
  );
};

export default AdminLogin;
