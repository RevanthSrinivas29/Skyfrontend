import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  useToast,
  Flex,
  HStack,
  Spacer,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Icon
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon, PhoneIcon } from '@chakra-ui/icons';
import { FaLocationArrow, FaStar } from 'react-icons/fa';

export const GoPag = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const toast = useToast();
  const [dur,setDur] = useState('')
  const nav = useNavigate();
  const now = new Date()
  const formtDate = now.toLocaleDateString('en-GB');
  const formtTime= now.toLocaleTimeString('en-GB');
  useEffect(() => {
    console.log(formtDate,formtTime)
  }, [formtDate,formtTime]);
 



  const urls = [
    { Iname: "CricketNets", url: "https://www.shutterstock.com/shutterstock/videos/3447451967/thumb/1.jpg?ip=x480" },
    { Iname: "SwimmingPool", url: "https://watermark.lovepik.com/photo/20211203/large/lovepik-swimming-pool-picture_501497422.jpg" },
    { Iname: "Party House", url: "https://images.squarespace-cdn.com/content/v1/5994793b4c0dbfd6d7f78ae6/1515423481093-HA45709XLVXIHLOMM48P/pool+house.jpg" },
  ];

  const location = useLocation();
  const { itemName } = location.state || {};
  const backgroundImage = urls.find((item) => item.Iname === itemName)?.url || '';

  const handleDateChange = (date) => {
    if (date.length > 0) {
      const selectedDate = date[0];
      const dateStr = selectedDate.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
      setDate(dateStr);  // Set the date state
      setTimeSlot('');   // Reset the time slot when the date changes
    } else {
      setDate(null);  // Clear the date if no date is selected
    }
  };

  const handleDurationChange = (e) => {
    const duration = parseInt(e.target.value);
    setDuration(duration);
    const availableSlots = getAvailableTimeSlots(duration);
    setTimeSlots(availableSlots);
    setTimeSlot(''); // Reset time slot when duration changes
  };
  

  const getAvailableTimeSlots = (duration) => {
    const slots = [
      "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
      "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
      "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
    ];
  
    return slots.map((slot) => {
      const endTime = calculateEndTime(slot, duration);
      return endTime ? `${slot} - ${endTime}` : null;
    }).filter(Boolean);
  };
  
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isValidPhoneNumber = (phone) => {
    const re = /^\d{10}$/; // Assuming 10-digit phone numbers
    return re.test(phone);
  };
  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    let endHours = hours + duration;
    const endMinutes = minutes;
    if (endHours >= 24) {
      endHours = 24; // After midnight, reset hours to 24 (midnight).
    }
  
    const validDuration = endHours - hours; // Calculate valid duration.
    setDur(validDuration); // Update state if mismatch exists.
  
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !phoneNumber || !date || !duration || !timeSlot) {
      displayPopUpMessage('Please fill out all fields.', 'error');
      return;
    }
  
    if (!isValidEmail(email)) {
      displayPopUpMessage('Please enter a valid email address.', 'error');
      return;
    }
  
    if (!isValidPhoneNumber(phoneNumber)) {
      displayPopUpMessage('Please enter a valid phone number.', 'error');
      return;
    }
  
    const [startTime, endTime] = timeSlot.split(" - ").map((time) => time.trim());
    const formattedDate = date.split('-').reverse().join('-');
  
    if (parseInt(duration) !== parseInt(dur)) {
      displayPopUpMessage(
        'Sorry 😓! To select after midnight (00:00), book again with 12:00 AM as the starting time.',
        'error'
      );
      return;
    }
  
    const bookingData = {
      name,
      email,
      phoneNumber,
      date: formattedDate,
      duration,
      timeSlot,
      itemName,
      startTime,
      endTime,
      payment: 'pending',
      formtDate,
      formtTime,
    };
  
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    console.log('Booking data stored:', bookingData);
  
    try {
      const response = await axios.post('http://localhost:9000/go', bookingData);
      const userID = response.data.userId;
      console.log(userID);
  
      if (response.status === 200) {
        displayPopUpMessage(response.data.message || 'Appointment Confirmed!', 'success');
  
        setTimeout(() => {
          nav("/payment", { state: { duration,userID} });
        }, 2000);
      } else {
        displayPopUpMessage('Booking Failed!', 'error');
      }
    } catch (error) {
      if (error.response) {
        displayPopUpMessage(error.response.data.message || 'Booking Failed!', 'error');
      } else {
        displayPopUpMessage('Something went wrong. Please try again.', 'error');
      }
      console.error('Error:', error);
    }
  };
  

  const displayPopUpMessage = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };




  return (

    <Box
  backgroundImage={`url(${backgroundImage})`}
  backgroundSize="cover"
  backgroundPosition="center"
  minHeight="100vh"
  position="relative"
>

  {/* Fixed Header */}
  <Flex
    as="header"
    p={4}
    bg="#000000"
    color="white"
    zIndex={10} // Ensure the header is above other content
    position="relative"
    top={0}
    left={0}
    width="100%" // Full width of the page
  >
    <Image
      src="https://via.placeholder.com/150"
      alt="Logo"
      boxSize="50px"
      mr={3}
    />
    <Heading size="lg" mx="auto" mr={100}>Skyland</Heading>
    <Spacer />
    <HStack spacing={4}>
    <Menu>
            <MenuButton as={Button} colorScheme="black">
              <HamburgerIcon></HamburgerIcon>
              Menu
            </MenuButton>
            <MenuList  bg="#000000" color="white" >
            <MenuItem bg="#000000" color="white"  _hover={{ bg: '#3C3D37' }} onClick={() => nav('/')}>Home</MenuItem>
            <MenuItem bg="#000000" color="white"  _hover={{ bg: '#3C3D37' }}  onClick={() => window.open('https://maps.app.goo.gl/XNxGLsw7Gkm3ZF4C7')}>
            <FaLocationArrow></FaLocationArrow>
            Location
          </MenuItem>
              <MenuItem bg="#000000" color="white"  _hover={{ bg: '#3C3D37' }} onClick={() => nav('/customer-care')}><PhoneIcon></PhoneIcon>Customer Care</MenuItem>
              <MenuItem bg="#000000" color="white"   _hover={{ bg: '#3C3D37' }} onClick={() => nav('/about')}>
              <Icon />About</MenuItem>
            </MenuList>
          </Menu>
    </HStack>
  </Flex>

  {/* Main content - Add padding to avoid overlap with the fixed header */}
  <Box pt="80px" px={4}>

    {/* Form Container */}
    <Container
      maxW="400px"
      p={5}
      backgroundColor="rgba(255, 255, 255, 0.8)"
      borderRadius="10px"
      boxShadow="md"
      mb={8}
    >
      <Heading textAlign="center" color="#4b0082" mb={4}>
        {itemName || "Default Header Title"}
      </Heading>

      <FormControl mb={4}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
        <Input
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </FormControl>

      <form id="bookingForm" onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="calendar">Choose Appointment Date</FormLabel>
          <Flatpickr
            id="calendar"
            onChange={handleDateChange}
            options={{
              inline: true,
              minDate: "today",
            }}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="Duration">Select Duration (in hours)</FormLabel>
          <Select
            id="Duration"
            placeholder="Select Duration"
            onChange={handleDurationChange}
          >
            <option value="1">1 Hour</option>
            <option value="2">2 Hours</option>
            <option value="3">3 Hours</option>
          </Select>
        </FormControl>



        <FormControl mb={4}>
  <FormLabel htmlFor="startTime">Choose Start Time</FormLabel>
  <Flex>
    <Select
      id="startTime"
      placeholder="Select Start Time"
      onChange={(e) => {
        const selectedStart = e.target.value;
        if (selectedStart) {
          const durationHours = parseInt(duration); // Use the current duration
          const endTime = calculateEndTime(selectedStart, durationHours);
          setTimeSlot(endTime ? `${selectedStart} - ${endTime}` : '');
        }
      }}
      value={timeSlot.split(" - ")[0] || ''} // Set start time value
    >
      {timeSlots.map((slot, index) => (
        <option key={index} value={slot.split(" - ")[0]}>
          {slot.split(" - ")[0]}
        </option>
      ))}
    </Select>

    <Select
      id="endTime"
      placeholder="Select End Time"
      onChange={(e) => setTimeSlot(`${timeSlot.split(" - ")[0]} - ${e.target.value}`)}
      value={timeSlot.split(" - ")[1] || ''} // Set end time value
      ml={4} // Add margin for spacing
      isDisabled='true'
    >
      {timeSlots.map((slot, index) => (
        <option key={index} value={slot.split(" - ")[1]}>
          {slot.split(" - ")[1]}
        </option>
      ))}
    </Select>
  </Flex>
</FormControl>
        <Button type="submit" colorScheme="purple" width="full">
          Book Appointment
        </Button>
      </form>
      <Text>*Note:You can only select slot on the same day.If midnight then book slot as startTime:24:00 and 0:00:endTime</Text>
    </Container>   
  </Box>

  {/* Footer */}
  <Box as="footer" bg="#000000" color="white" p={4} textAlign="center" mt={8}>
    <Text>&copy; {new Date().getFullYear()} Skyland. All rights reserved.</Text>
    <Box as="footer" p={4} bg="#000000" color="white" textAlign="center">
        <Heading size="md" textAlign="center" color="#F5EFFF" mb={4}>
          Build by RTV
        </Heading>
        <Text textAlign="center">
          Thank you for choosing our services. If you have any questions, feel free to contact our customer service.
        </Text>
        <Text textAlign="center" mt={2}>
          We look forward to serving you!
        </Text>
     </Box>
    </Box>
    </Box>
  );
};
