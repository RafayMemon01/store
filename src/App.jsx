import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import PageLayout from "./Layouts/PageLayout"
// import ProductPage from "./Pages/ProductPage/ProductPage"
import { Box, Text, Icon } from "@chakra-ui/react";
import { FaExclamationTriangle } from "react-icons/fa";
import AdminLogin from "./Pages/AdminPage/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./Pages/AdminPage/AdminPage";
import ProductsPage from "./Pages/ProductsPAge/ProductsPage";
import ManageProduct from "./Pages/AdminPage/ManageProduct";

function App() {

  return (
  <>
  <PageLayout>

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/products" element={<ProductsPage/>} />
      <Route path="*" element={<NotFoundComponent/>}/>
      
      <Route path="/h-admin" element={
        <ProtectedRoute>
       <AdminPage/>
        </ProtectedRoute>
        } />
        <Route path="/h-admin/products" element={
          <ProtectedRoute>
            <ManageProduct/>
          </ProtectedRoute>
        }/>
      <Route path="admin-login" element={<AdminLogin/>}/>
    </Routes>
  </PageLayout>
  </>
  )
}

export default App

const NotFoundComponent = () => {
  return (
    <Box
      h="80vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p={4}
    >
      <Icon as={FaExclamationTriangle} w={20} h={20} color="red.500" mb={4} /> {/* Icon added here */}
      <Text fontSize="2xl" fontWeight="bold">
        404 - Page Not Found
      </Text>
      <Text mt={2} fontSize="lg">
        It seems like the link you followed is broken or the page has been removed from the website.
      </Text>
    </Box>
  );
};