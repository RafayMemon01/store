import { Box } from '@chakra-ui/react';
import React from 'react'
import image1 from '../../Images/image1.jpg'
import image2 from '../../Images/image2.jpg'
import image3 from '../../Images/image3.jpg'
import Carousel from '../../components/Carousel/Carousel';
import ProductComponent from '../../components/ProductComponent/ProductComponent';


const HomePage = () => {
    

    const images = [image1,image2,image3]
  return (
    <Box>
      <Box>
        <Carousel images={images} />
      </Box>
      <Box mt={'1em'}>
        <h2 style={{fontSize:'32px'}}>Our Products</h2>

        <ProductComponent/>
        <ProductComponent/>
        <ProductComponent/>
      </Box>
    </Box>
  )}
export default HomePage;
