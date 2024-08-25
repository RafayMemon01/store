import React, { useState, useEffect } from "react";
import { Box, IconButton, Image, useBreakpointValue } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const buttonSize = useBreakpointValue({ base: "sm", md: "lg" });

  // Function to go to the previous slide
  const previousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Auto-slide effect using useEffect
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds

    return () => clearInterval(slideInterval); // Cleanup interval on component unmount
  }, [currentIndex]); // Dependency array ensures effect runs when currentIndex changes

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
