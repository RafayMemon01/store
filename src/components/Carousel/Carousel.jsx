import React, { useState, useEffect } from "react";
import { Box, IconButton, Image, useBreakpointValue } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const buttonSize = useBreakpointValue({ base: "sm", md: "lg" });

  const previousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 4000); 

    return () => clearInterval(slideInterval); 
  }, [currentIndex]); 
  const currentImage = images[currentIndex];

  return (
    <Box
      position="relative"
      width="full"
      height={{ base: "250px", md: "500px" }}
      overflow="hidden"
    >
      <Image
        src={currentImage}
        alt={`Slide ${currentIndex}`}
        objectFit="cover"
        width="100%"
        height="100%"
      />

      <IconButton
        aria-label="Previous Slide"
        icon={<FaArrowLeft />}
        onClick={previousSlide}
        size={buttonSize}
        position="absolute"
        left="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        colorScheme="gray"
      />
      <IconButton
        aria-label="Next Slide"
        icon={<FaArrowRight />}
        onClick={nextSlide}
        size={buttonSize}
        position="absolute"
        right="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        colorScheme="gray"
      />
    </Box>
  );
};

export default Carousel;
