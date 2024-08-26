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
import { auth } from "../../firebase/firebase"; 
import useAuthStore from "../../Store/useAuthStore"; 
import { useNavigate } from "react-router-dom"; 

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAuthStore((state) => state.setUser); 
  const toast = useToast();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate(); 

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(email, password);
      if (result) { 
        setUser(result.user);
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/h-admin");
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
          bg="#242423"
          color={"white"}
          _hover={{
            bg: "white",
            border: "1px solid #242423",
            color: "#242423",
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
