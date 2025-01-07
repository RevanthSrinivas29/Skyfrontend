import { HamburgerIcon, PhoneIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Text,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    VStack,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Toast,
    useToast,
    Center,
    Menu
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [uscount, setUsCount] = useState(0); // Track user count
    const [itemCount, setItemCount] = useState(0);
    const [totalAmount, setAmount] = useState(0); // Track user count
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
    const cancelRef = useRef();
    const now = new Date();
    const [itemToDelete, setItemToDelete] = useState(null);
    const toast = useToast();
    
   

    const fetchData = () => {
        axios
            .post("https://skybackend.onrender.com/admin", { action: 'fetch' })
            .then((response) => {
                setData(
                    response.data.map((item) => ({
                        ...item,
                        confirmStatus: item.paymentStatus === 'paid' ? 'Confirmed' : 'Confirm',
                    }))
                );                
                setItemCount(response.data.length);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            });
    };


    const handleConfirm = (info) => {
        if (!info) return; // Guard against empty info
        axios.post("https://skybackend.onrender.com/admin", { action: 'confirm', info })
            .then((response) => {
                const updatedItem = response.data; // Get updated item from backend
                setData((prevData) =>
                    prevData.map((item) =>
                        item._id === updatedItem._id
                            ? updatedItem // Replace the updated item
                            : item
                    )
                );
                toast({
                    title: 'Confirmation Successful',
                    description: `Payment is confirmed. Booking details will be sent via email.`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                const total = data.reduce((acc, data) => acc + data.Amt, 0);
                setAmount(total);
                setUsCount((prevCount) => prevCount + 1);
            })
            .catch((error) => {
                console.error('Error occurred during confirmation:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to confirm the payment. Please try again.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            });
    };
   
    
    const handleDelete = (item) => {
        axios.post("https://skybackend.onrender.com/admin", { action: 'delete', item })
            .then((response) => {
                // Remove item from frontend list
                console.log(response)
                setData(prevData => prevData.filter(dataItem => dataItem._id !== item._id));
                setItemCount(prevCount => prevCount - 1); 
                onClose();
                toast({
                    title: 'Deleted',
                    description: 'Booking has been deleted.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            })
            .catch((error) => {
                console.error('Error deleting the item:', error);
                toast({
                    title: 'Error',
                    description: 'There was an issue deleting the booking.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            });
    };
    

    const handleDeleteAll = () => {
        axios
            .post("https://skybackend.onrender.com/admin", { action: 'deleteall' }) // Send delete request to backend
            .then((response) => {
                setData([]); // Clear the data after deletion
                setItemCount(0); // Reset item count
                onAlertClose(); // Close the AlertDialog
            })
            .catch((error) => {
                console.error('Error deleting all data:', error);
                setError('Error deleting all data');
            });
    };
    const handleCancelClick = (item) => {
        console.log(item)
        setItemToDelete(item); // Store the item to delete
        onOpen(); // Open the AlertDialog for single delete
    };

    const showSection = (section) => {
        setActiveSection(section);
        onClose();
    };

    useEffect(() => {
        fetchData();
         // Fetch data on component mount
         handleConfirm();
    },[handleConfirm]);

    return (
        <Flex direction={{ base: 'column', md: 'row' }}>
            {/* Sidebar */}
            <Box
                width={{ base: '100%', md: '250px' }}
                bg="#1E3E62"
                height={{ base: 'auto', md: '100vh' }}
                overflow="hidden"
                p={{ base: '10px', md: '20px' }} // Responsive padding
                boxShadow="lg"
                position={{ base: 'absolute', md: 'fixed' }}
                zIndex={1}
            >
                <Text fontSize="2xl" color="white" mb="20px">Admin Panel</Text>
                <VStack spacing={8} align="start">
                    <Box bgColor="white" borderRadius="10px" p={4} width="100%">
                        <Button variant="ghost" _hover={{ backgroundColor: '#B9B4C7' }} onClick={() => showSection('dashboard')} p={2} width="100%">
                            Dashboard
                        </Button>
                        <Button variant="ghost" _hover={{ backgroundColor: '#B9B4C7' }} onClick={() => showSection('userManagement')} p={2} width="100%">
                            User Management
                        </Button>
                        <Button variant="ghost" _hover={{ backgroundColor: '#B9B4C7' }} onClick={() => showSection('bookingManagement')} p={2} width="100%">
                            Booking Management
                        </Button>
                        <Button variant="ghost" _hover={{ backgroundColor: '#B9B4C7' }} onClick={() => showSection('serviceManagement')} p={2} width="100%">
                            Service Management
                        </Button>
                        <Button variant="ghost" _hover={{ backgroundColor: '#B9B4C7' }} onClick={() => showSection('payments')} p={2} width="100%">
                            Payments
                        </Button>
                        <Button variant="ghost" _hover={{ backgroundColor: '#B9B4C7' }} onClick={() => showSection('review')} p={2} width="100%">
                            Reviews
                        </Button>
                    </Box>
                </VStack>
            </Box>

            {/* Main content */}
            <Box
                ml={{ base: 0, md: '270px' }}
                p={{ base: '10px', md: '20px' }} // Responsive padding
                width={{ base: '100%', md: 'calc(100% - 270px)' }}
                position='relative'
            >
                <Box
                    bg="#1E3E62" color="white" p="15px" display='flex' justifyContent="space-between" alignItems="center" mb="20px" borderRadius="5px"
                >
                    <Text fontSize={{ base: 'lg', md: 'xl' }} flexGrow={1} textAlign="center">
                        Welcome, Admin!
                    </Text>
                   
                </Box>

                {/* Dashboard Section */}
                {activeSection === 'dashboard' && (
                    <Box bg="white" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
                        <Text fontSize="xl" color="#1E3E62" mb="15px">Key Statistics</Text>
                        <Text>Total Confirmed Bookings: <strong>{uscount}</strong></Text>
                        <Text>Revenue This Month: <strong>{totalAmount}</strong></Text>
                        <Text>Active Users: <strong>{itemCount}</strong></Text>
                    </Box>
                )}

                {/* User Management Section */}
                {activeSection === 'userManagement' && (
                    <Box bg="white" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
                    <Box display='flex' justifyContent="space-between" >
                        <Text fontSize="xl" color="#1E3E62" mb="15px">User Management</Text>
                        {activeSection === 'userManagement' && (
                        <Button size="sm" colorScheme="red" onClick={onAlertOpen}>
                            Delete All
                        </Button>
                    )}</Box>
                        <Button colorScheme="black" mb="10px">View All Users</Button>
                        <Box overflowX="hidden">
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Sno</Th>
                                        <Th><PhoneIcon /> Phone No</Th>
                                        <Th>Username</Th>
                                        <Th>Email</Th>
                                        <Th>SlotDate</Th>
                                        <Th>Time</Th>
                                        <Th>Payment Status</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.length > 0 ? (
                                        data.map((item, index) => (
                                            <Tr key={index}>
                                                <Td>{index+1}</Td>
                                                <Td>{item.phoneNumber || "N/A"}</Td>
                                                <Td>{item.name || "N/A"}</Td>
                                                <Td>{item.email || "N/A"}</Td>
                                                <Td>{item.date}</Td>
                                                <Td  whiteSpace="nowrap"  // Ensures single-line display
                                                    overflow="hidden"    // Prevents overflow
                                                    textOverflow="ellipsis" // Adds ellipsis for long text
                                                >{item.timeSlot || "N/A"}</Td>
                                                <Td>{item.payment ? item.payment : "Pending"}</Td>
                                            </Tr>
                                        ))
                                    ) : (
                                        <Tr>
                                            <Td colSpan={8} textAlign="center">No users found</Td>
                                        </Tr>
                                    )}
                                </Tbody>
                            </Table>
                        </Box>
                    </Box>
                )}

                {/* Booking Management Section */}
                {activeSection === 'bookingManagement' && (
                    <Box bg="white" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
                        <Text fontSize="xl" color="#1E3E62" mb="15px">Booking Management</Text>
                        <Box overflowX="auto">
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>BookedDate</Th>
                                        <Th>BookingTime</Th>
                                        <Th>Username</Th>
                                        <Th>Service</Th>
                                        <Th>Slot Date</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.length > 0 ? (
                                        data.map((item, index) => (
                                            <Tr key={index}>
                                                <Td>{item.formtDate|| "N/A"}</Td>
                                                <Td>{item.formtTime|| "N/A"}</Td>
                                                <Td>{item.name || "N/A"}</Td>
                                                <Td>{item.itemName || "N/A"}</Td>
                                                <Td>{item.date || "N/A"}</Td>
                                                
                                            </Tr>
                                        ))
                                    ) : (
                                        <Tr>
                                            <Td colSpan={6} textAlign="center">No bookings found</Td>
                                        </Tr>
                                    )}
                                </Tbody>
                            </Table>
                        </Box>
                    </Box>
                )}

                {/* Service Management Section */}
                {activeSection === 'serviceManagement' && (
                    <Box bg="white" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
                        <Text fontSize="xl" color="#1E3E62" mb="15px">Service Management</Text>
                        <Button colorScheme="black" mb="10px">View All Services</Button>
                        <Box overflowX="auto">
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th><PhoneIcon /> Phone No</Th>
                                        <Th>Username</Th>
                                        <Th>Service</Th>
                                        <Th>Date</Th>
                                        <Th>Time</Th>
                                        <Th>Duration</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.length > 0 ? (
                                        data.map((item, index) => (
                                            <Tr key={index}>
                                                <Td>{item.phoneNumber || "N/A"}</Td>
                                                <Td>{item.name || "N/A"}</Td>
                                                <Td>{item.itemName || "N/A"}</Td>
                                                <Td>{item.date || "N/A"}</Td>
                                                <Td>{item.timeSlot || "N/A"}</Td>
                                                <Td>{item.duration || "N/A"}</Td>
                                                <Td>
                                                    {/* <Button size="sm" colorScheme="black" mr="2">Edit</Button>
                                                    <Button size="sm" colorScheme="red" onClick={() => handleCancelClick(item)}>Cancel</Button> */}
                                                </Td>
                                            </Tr>
                                        ))
                                    ) : (
                                        <Tr>
                                            <Td colSpan={6} textAlign="center">No services found</Td>
                                        </Tr>
                                    )}
                                </Tbody>
                            </Table>
                        </Box>
                    </Box>
                    
                )}
                     {/* User Management Section */}
                     {activeSection === 'payments' && (
                    <Box bg="white" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
                    <Box display='flex' justifyContent="space-between" >
                        <Text fontSize="xl" color="#1E3E62" mb="15px">User Management</Text>
                    </Box>
                        <Button colorScheme="black" mb="10px">View All Users</Button>
                        <Box overflowX="hidden">
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Sno</Th>
                                        <Th><PhoneIcon />TransactionID</Th>
                                        <Th>Username</Th>
                                        <Th>Amount</Th>
                                        <Th>Payment Status</Th>
                                        <Th>CancelSlot</Th>
                                        <Th>ConfirmSlot</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.length > 0 ? (
                                        data.map((item, index) => (
                                            <Tr key={index}>
                                                <Td>{index+1}</Td>
                                                <Td>{item.Tid || "N/A"}</Td>
                                                <Td>{item.name || "N/A"}</Td>
                                                <Td>{item.Amt || "N/A"}</Td>
                                                <Td>{item.payment ? item.payment : "Pending"}</Td>
                                                <Td>
                                                <Button size="sm" colorScheme="black" mr="2">Edit</Button>
                                                <Button size="sm" colorScheme="red"  
                                                isDisabled={item.payment==='paid'}
                                                onClick={() => handleCancelClick(item)}>Cancel</Button>
                                                </Td>
                                                <Td>
                                                <Button size="sm" colorScheme="black" mr="2">Edit</Button>
                                                    <Button
                                                        size="sm"
                                                        colorScheme="green"
                                                        isDisabled={item.payment==='paid'}
                                                        onClick={() => handleConfirm(item)}
                                                    >
                                                        {item.confirmStatus}
                                                    </Button>     
                                                </Td>
                                            </Tr>
                                        ))
                                    ) : (
                                        <Tr>
                                            <Td colSpan={8} textAlign="center">No users found</Td>
                                        </Tr>
                                    )}
                                </Tbody>
                            </Table>
                        </Box>
                    </Box>
                )}
            </Box>

            {/* Alert Dialog for delete confirmation */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete User
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure you want to delete this user? This action cannot be undone.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={() => handleDelete(itemToDelete)} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Alert Dialog for delete all confirmation */}
            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={onAlertClose}
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete All Users
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure you want to delete all users? This action cannot be undone.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onAlertClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={handleDeleteAll} ml={3}>
                            Delete All
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Flex>
    );
};
