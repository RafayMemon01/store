import React, { useState } from "react";
import { Box, IconButton, Image, useBreakpointValue } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    const lastIndex = images.length - 1;
    const shouldResetIndex = currentIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentIndex - 1;
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const lastIndex = images.length - 1;
    const shouldResetIndex = currentIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  const currentImage = images[currentIndex];
  const buttonSize = useBreakpointValue({ base: "sm", md: "lg" });

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
        colorScheme="teal"
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
        colorScheme="teal"
      />
    </Box>
  );
};

export default Carousel;
