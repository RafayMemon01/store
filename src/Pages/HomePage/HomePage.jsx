import { Box } from '@chakra-ui/react';
import React from 'react'
import image1 from '../../Images/image1.jpg'
import image2 from '../../Images/image2.jpg'
import image3 from '../../Images/image3.jpg'
import Carousel from '../../components/Carousel/Carousel';


const HomePage = () => {
    

    const images = [image1,image2,image3]
  return (
    <Box>
      <Box>
        <Carousel images={images} />
      </Box>
      <Box>
        <h1>Home Page</h1>
      </Box>
    </Box>
  )}
export default HomePage;
