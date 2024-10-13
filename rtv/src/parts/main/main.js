import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Text,
  Flex,
  Image,
  VStack,
  Center,
  Heading,
  HStack,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  Icon,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { FaDirections, FaLocationArrow, FaSoap, FaStar } from 'react-icons/fa';
import { ArrowBackIcon, ArrowForwardIcon, HamburgerIcon, PhoneIcon } from '@chakra-ui/icons';


export const initialItems = [
  {
    name: 'SwimmingPool',
    image: 'https://watermark.lovepik.com/photo/20211203/large/lovepik-swimming-pool-picture_501497422.jpg',
    description: 'Water will be cleaned often and something like swimming head caps will be arranged soon',
  },
  {
    name: 'CricketNets',
    image: 'https://www.shutterstock.com/shutterstock/videos/3447451967/thumb/1.jpg?ip=x480',
    description: 'The equipment will be provided here and also snack items at normal price are available',
  },
  {
    name: 'Hotel',
    image: 'https://i.pinimg.com/originals/2f/4e/52/2f4e5276ef4779c23889ac5384612a1a.jpg',
    description: 'kjadh',
  },
];

export const Main = () => {
  const navigate = useNavigate();
  const [currentItems, setCurrentItems] = useState(initialItems);
  const [loading, setLoading] = useState(false); // State to manage loading
  const [rating, setRating] = useState(0); // Rating state
  const [hover, setHover] = useState(null); // Hover state for stars
  const [submitted, setSubmitted] = useState(false); // New state for submission
  const toast = useToast();

  const handleSubmitRating = () => {
    setSubmitted(true); // Set the submitted state to true after clicking the submit button
    toast({
      title: "Thank you for the feedback!",
      description: "We appreciate your effort to rate us.It will be a great help for us",
      status: "success",  // You can also use 'info', 'warning', or 'error'
      duration: 3000,
      isClosable: true,
      position: "top",  // You can change this based on your design
    });
  };
  


  const nextSlide = () => {
    setCurrentItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.push(newItems.shift());
      return newItems;
    });
  };
 

  const prevSlide = () => {
    setCurrentItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.unshift(newItems.pop());
      return newItems;
    });
  };
  

  const Go = (name, image) => {
    setLoading(true); // Set loading to true before navigation
    setTimeout(() => { // Simulate a network request
      navigate('/go', { state: { itemName: name, itemImage: image } });
      setLoading(false); // Set loading back to false after navigation
    }, 400); // Adjust the timeout duration as needed
  };

  return (
    <Box >
      {/* Header */}
      <Flex as="header" p={4} bg="#000000" color="white" justifyContent="center" alignItems="center">
        <Image
          src="https://via.placeholder.com/150" // Replace with your logo URL
          alt="Logo"
          boxSize="50px"
          mr={3}
        />
        <Heading size="lg">Skyland</Heading>
        <Spacer />
        <HStack spacing={4}>
          <Menu>
            <MenuButton as={Button} colorScheme="black">
              <HamburgerIcon></HamburgerIcon>
              Menu
            </MenuButton>
            <MenuList  bg="#000000" color="white" >
            <MenuItem bg="#000000" color="white"  _hover={{ bg: '#3C3D37' }}  onClick={() => window.open('https://maps.app.goo.gl/XNxGLsw7Gkm3ZF4C7')}>
            <FaDirections></FaDirections>
            Location
          </MenuItem>
              <MenuItem bg="#000000" color="white"  _hover={{ bg: '#3C3D37' }} onClick={() => navigate('/customer-care')}><PhoneIcon></PhoneIcon>Customer Care</MenuItem>
              <MenuItem bg="#000000" color="white"   _hover={{ bg: '#3C3D37' }} onClick={() => navigate('/about')}>
              <Icon />About</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Loading Spinner */}
      {loading ? (
        <Center height="100vh">
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
          <Text ml={4}>Please wait a moment</Text>
        </Center>
      ) : (
        <Box
          mt={4} // Add margin to move the box below the header
          position="relative"
          top="0"
          left="50%"
          transform="translate(-50%, 0)"
          width={{ base: "90%", md: "800px", lg: "1000px" }} // Responsive width
          height={{ base: "400px", md: "500px", lg: "600px" }} // Responsive height
          backgroundColor="#f5f5f5"
          boxShadow="0 30px 50px #dbdbdb"
          overflow="hidden"
        >
          <Flex className="slide" position="relative" height="100%"  justifyContent="center"  alignItems="center"
          >
            {currentItems.map((item, index) => (
              <Box
                key={index}
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
                borderRadius="20px"
                boxShadow="0 30px 50px #505050"
                backgroundImage={`url(${item.image})`}
                backgroundPosition="50% 50%"
                spacing={10}
                backgroundSize="cover"
                width={index < 2 ? '100%' : '200px'}
                height={index < 2 ? '100%' : '300px'}
                transition="0.5s"
                opacity={index < 2 ? 1 : 0}
                left={index === 0 ? '0' : index === 1 ? '0' : `${50 + (220 * (index - 1))}px`}
              >
                <VStack
                  spacing={3}
                  position="absolute"
                  top="50%"
                  left="100px"
                  textAlign="left"
                  color="#eee"
                  transform="translate(0, -50%)"
                  display={index === 1 ? 'block' : 'none'}
                >
                  <Text
                    fontSize="40px"
                    textTransform="uppercase"
                    fontWeight="bold"
                    opacity="0"
                    animation="animate 1s ease-in-out 1 forwards"
                  >
                    {item.name}
                  </Text>
                  <Text
                    marginTop="10px"
                    marginBottom="20px"
                    opacity="0"
                    fontSize={20}
                    animation="animate 1s ease-in-out 0.3s 1 forwards"
                  >
                  </Text>
                  <Button
                    padding="10px 20px"
                    border="none"
                    cursor="pointer"
                    opacity="0"
                    animation="animate 1s ease-in-out 0.6s 1 forwards"
                    onClick={() => Go(item.name, item.image)}
                  >
                    Book a slot
                  </Button>
                </VStack>
              </Box>
            ))}

            {/* Navigation Buttons */}
            <Box className="button" position="absolute" bottom="20px" width="100%" textAlign="center"  paddingBottom={10}
            >
              <Button
                width="40px"
                height="35px"
                borderRadius="8px"
                border="1px solid #000"
                size="lg"
                margin="0 10px"
                onClick={prevSlide}
                transition="0.3s"
                _hover={{ background: '#ababab', color: '#fff' }}
              >
                    <ArrowBackIcon /> {/* Use the icon inside the button */}
                <i className="fa-solid fa-arrow-left"></i>
              </Button>
              <Button
                width="40px"
                height="35px"
                borderRadius="8px"
                border="1px solid #000"
                margin="0 5px"
                size="lg"
                onClick={nextSlide}
                transition="0.3s"
                _hover={{ background: '#ababab', color: '#fff' }}
              >
                    <ArrowForwardIcon /> {/* Use the icon inside the button */}
                <i className="fa-solid fa-arrow-right"></i>
              </Button>
            </Box>
          </Flex>
          <style>{`
            @keyframes animate {
              from {
                opacity: 0;
                transform: translate(0, 100px);
                filter: blur(33px);
              }
              to {
                opacity: 1;
                transform: translate(0);
                filter: blur(0);
              }
            }
          `}</style>
        </Box>
      )}

      {/* Additional Content Below the Slider */}
      <Box display='column'
        p={5}
        backgroundColor="rgba(255, 255, 255, 0.8)"
        mt={8}
        backdropSaturate={11}
        boxDecorationBreak={10}
        boxShadow={4}
        ml={20}
        maxWidth="1000px"
         // Center the additional content
      >
        <Heading fontSize="4xl" color="#4b0082" m={4}>
           CricketNets
         </Heading>
  
            <Text textAlign="center" m={4}>
          Box cricket is a lively and social variant of traditional cricket, played in smaller, enclosed spaces like courtyards or parks with teams of 5 to 10 players.
        </Text>
        <Text textAlign="left" fontSize='lg' m={9}>
          <strong>Key Features:</strong>
          <br />
          <strong>Playing Area:</strong> The game is played on a shortened pitch, surrounded by walls,
          <br/> ensuring continuous action as the ball rarely goes out of play.
          <br />
          <strong>Equipment:</strong> Players use lightweight bats and softer balls, making it safe for 
          <br />
          casual play, often with minimal protective gear.
          <br />
        </Text>
      </Box>
      <Box display='column'
        p={5}
        backgroundColor="rgba(255, 255, 255, 0.8)"
        mt={8}
        backdropSaturate={11}
        boxDecorationBreak={10}
        boxShadow={4}
        ml={20}
        maxWidth="1000px"
         // Center the additional content
      >
        <Heading fontSize="4xl" color="#4b0082" m={4}>
           SwimmingPool
         </Heading>
  
            <Text textAlign="center" m={4}>
          Box cricket is a lively and social variant of traditional cricket, played in smaller, enclosed spaces like courtyards or parks with teams of 5 to 10 players.
        </Text>
        <Text textAlign="left" fontSize='lg' m={9}>
          <strong>Key Features:</strong>
          <br />
          <strong>Playing Area:</strong> The game is played on a shortened pitch, surrounded by walls,
          <br/> ensuring continuous action as the ball rarely goes out of play.
          <br />
          <strong>Equipment:</strong> Players use lightweight bats and softer balls, making it safe for 
          <br />
          casual play, often with minimal protective gear.
          <br />
        </Text>
      </Box>
      <Box display='column'
        p={5}
        backgroundColor="rgba(255, 255, 255, 0.8)"
        mt={8}
        backdropSaturate={11}
        boxDecorationBreak={10}
        boxShadow={4}
        ml={20}
        maxWidth="1000px"
         // Center the additional content
      >
        <Heading fontSize="4xl" color="#4b0082" m={4}>
           CricketNets
         </Heading>
  
            <Text textAlign="center" m={4}>
          Box cricket is a lively and social variant of traditional cricket, played in smaller, enclosed spaces like courtyards or parks with teams of 5 to 10 players.
        </Text>
        <Text textAlign="left" fontSize='lg' m={9}>
          <strong>Key Features:</strong>
          <br />
          <strong>Playing Area:</strong> The game is played on a shortened pitch, surrounded by walls,
          <br/> ensuring continuous action as the ball rarely goes out of play.
          <br />
          <strong>Equipment:</strong> Players use lightweight bats and softer balls, making it safe for 
          <br />
          casual play, often with minimal protective gear.
          <br />
        </Text>
      </Box>


      {/* Footer */}
      <Box as="footer" p={4} bg="#000000" color="white" textAlign="center">
        <Text>© 2024 Skyland. All rights reserved.</Text>
        <Heading size="md" textAlign="center" color="F5EFFF" mb={4}>
          Build by RTV
        </Heading>
        <Text textAlign="center">
          Thank you for choosing our services. If you have any questions, feel free to contact our customer service.
        </Text>
        <Text textAlign="center" mt={2}>
          We look forward to serving you!
        </Text>
        <Box>
      <Text>How many stars would you rate for the design and development of this website?</Text>
      <Box display="centre" mt={2}>
        {[1, 2, 3, 4, 5].map((star, index) => (
          <Icon
            as={FaStar}
            key={index}
            boxSize={8}
            color={hover >= star || rating >= star ? 'yellow.400' : 'gray.300'}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            cursor="pointer"
          />
        ))}
      </Box>

      <Button
        mt={4}
        colorScheme="teal"
        onClick={handleSubmitRating}
        disabled={rating === 0} // Disable the button if no rating is selected
      >
        Submit Rating
      </Button>

      {/* Conditionally render the dynamic tag after rating submission */}
      {/* {submitted && rating > 0 && (
        <Box mt={4}>
          <Text fontSize="lg" color="green.500">
            Thank you for rating us {rating} stars!
          </Text>
        </Box>
      )} */}
    </Box>
       
  </Box>
  </Box>


  );
};
