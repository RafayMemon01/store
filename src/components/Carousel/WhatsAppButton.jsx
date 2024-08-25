import React from 'react';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const buttonSize = useBreakpointValue({ base: '60px', md: '80px' });

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
        href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`} 
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with us on WhatsApp" // Added title for accessibility
      >
        <IconButton
          aria-label="Message on WhatsApp"
          icon={<FaWhatsapp size="1.5em" />} 
          colorScheme="teal"
          borderRadius="full"
          backgroundColor="#25D366"  
          color="white"
          _hover={{ backgroundColor: "#128C7E" }}  
          w={buttonSize} 
          h={buttonSize} 
        />
      </a>
    </Box>
  );
};

export default WhatsAppButton;
