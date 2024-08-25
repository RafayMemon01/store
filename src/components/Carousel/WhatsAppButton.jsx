import React from 'react';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const buttonSize = useBreakpointValue({ base: '60px', md: '80px' }); // Set the width and height based on breakpoints

  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex={10}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <a
        href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}  // Replace 'yourphonenumber' with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton
          aria-label="Message on WhatsApp"
          icon={<FaWhatsapp size="1.5em" />} // Adjust icon size
          colorScheme="teal"
          borderRadius="full"
          backgroundColor="#25D366"  // WhatsApp green
          color="white"
          _hover={{ backgroundColor: "#128C7E" }}  // Darker green on hover
          w={buttonSize} // Use width for sizing
          h={buttonSize} // Use height for sizing
        />
      </a>
    </Box>
  );
};

export default WhatsAppButton;
