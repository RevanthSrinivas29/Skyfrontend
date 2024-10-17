import { HamburgerIcon, PhoneIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, Button, Table, Thead, Tbody, Tr, Th, Td, VStack, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [itemCount, setItemCount] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
    const cancelRef = useRef();
    const [itemToDelete, setItemToDelete] = useState(null);
    const [confirmDeleteAll, setConfirmDeleteAll] = useState(false); // State for delete all confirmation

    useEffect(() => {
        fetchData(); // Fetch data on component mount
    }, []);

    const fetchData = () => {
        axios
            .post("http://localhost:9000/admin", { action: 'fetch' })
            .then((response) => {
                setData(response.data);
                console.log(response.data);
                setItemCount(response.data.length);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            });
    };

    const handleDelete = () => {
        axios
            .post("http://localhost:9000/admin", { action: 'delete', itemToDelete })
            .then((response) => {
                setData(data.filter(item => item._id !== itemToDelete._id));
                setItemCount(prevCount => prevCount - 1); // Update the item count
                onAlertClose(); // Close the alert dialog
            })
            .catch((error) => {
                console.error('Error deleting item:', error);
                setError('Error deleting item');
            });
    };

    const handleDeleteAll = () => {
        axios
            .post("http://localhost:9000/admin", { action: 'deleteall' }) // Send delete request to backend
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
        setItemToDelete(item); // Store the item to delete
        onOpen(); // Open the AlertDialog for single delete
    };

    const showSection = (sectionId) => {
        setActiveSection(sectionId);
        onClose(); // Close sidebar on section change
    };

    return (
        <Flex direction={{ base: 'column', md: 'row' }}>
            {/* Sidebar */}
            <Box 
                width={{ base: '100%', md: '250px' }} 
                bg="#1E3E62" 
                height={{ base: isOpen ? 'auto' : '0', md: '100vh' }} 
                overflow="hidden"
                transition="height 0.3s"
                p="20px"
                boxShadow="lg" 
                position={{ base: 'absolute', md: 'fixed' }}
                zIndex={1}
            >
                <Button 
                    onClick={onOpen} 
                    display={{ base: 'block', md: 'none' }} 
                    mb="40px"
                    colorScheme="teal"
                >
                    <HamburgerIcon />
                </Button>
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
                p="20px" 
                width={{ base: '100%', md: 'calc(100% - 270px)' }}
                transition="margin-left 0.3s"
                position='relative'
            >
                <Box 
                    bg="#1E3E62" color="white" p="15px" display='flex' justifyContent="space-between" alignItems="center" mb="20px" borderRadius="5px"
                >
                    <Text fontSize={{ base: 'lg', md: 'xl' }} flexGrow={1} textAlign="center">
                        Welcome, Revanth!
                    </Text>
                    {activeSection === 'userManagement' && (
                        <Button size="sm" colorScheme="red" onClick={onAlertOpen}>
                            Delete All
                        </Button>
                    )}
                </Box>

                {/* Dashboard Section */}
                {activeSection === 'dashboard' && (
                    <Box bg="white" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
                        <Text fontSize="xl" color="#1E3E62" mb="15px">Key Statistics</Text>
                        <Text>Total Bookings: <strong>{itemCount}</strong></Text>
                        <Text>Revenue This Month: <strong>$12,000</strong></Text>
                        <Text>Active Users: <strong>3,500</strong></Text>
                    </Box>
                )}

                {/* User Management Section */}
                {activeSection === 'userManagement' && (
                    <Box bg="white" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
                        <Text fontSize="xl" color="#1E3E62" mb="15px">User Management</Text>
                        <Button colorScheme="black" mb="10px">View All Users</Button>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th><PhoneIcon /> Phone No</Th>
                                    <Th>Username</Th>
                                    <Th>Service</Th>
                                    <Th>Date</Th>
                                    <Th>Time</Th>
                                    <Th>Duration</Th>
                                    <Th>Actions</Th>
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
                                                <Button size="sm" colorScheme="black" mr="2">Edit</Button>
                                                <Button size="sm" colorScheme="red" onClick={() => handleCancelClick(item)}>Cancel</Button>
                                            </Td>
                                        </Tr>
                                    ))
                                ) : (
                                    <Tr>
                                        <Td colSpan={7} textAlign="center">No users found</Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </Box>
                )}
                {/* Other Sections... */}
                {/* Booking Management Section */}
                {activeSection === 'bookingManagement' && (
                    <Box bg="white" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
                        <Text fontSize="xl" color="#1E3E62" mb="15px">Booking Management</Text>
                        <Button colorScheme="black" mb="10px">View All Bookings</Button>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Item Name</Th>
                                    <Th>Username</Th>
                                    <Th>Date</Th>
                                    <Th>Time</Th>
                                    <Th>Status</Th>
                                    <Th>Payment</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.length > 0 ? (
                                    data.map((item, index) => (
                                        <Tr key={index}>
                                            <Td>{item.itemName || "N/A"}</Td>
                                            <Td>{item.name || "N/A"}</Td>
                                            <Td>{item.date || "N/A"}</Td>
                                            <Td>Done</Td>
                                            <Td>Paid</Td>
                                            <Td>
                                                <Button size="sm" colorScheme="black" mr="2">Edit</Button>
                                                <Button size="sm" colorScheme="red">Cancel</Button>
                                            </Td>
                                        </Tr>
                                    ))
                                ) : (
                                    <Tr>
                                        <Td colSpan="6">No bookings found.</Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </Box>
                )}

                {/* Service Management Section */}
                {activeSection === 'serviceManagement' && (
                    <Box bg="white" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
                        <Text fontSize="xl" color="#1E3E62" mb="15px">Service Management</Text>
                        <Button colorScheme="black" mb="10px">Add New Service</Button>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Service Name</Th>
                                    <Th>Price</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {/* Sample Data for Service Management */}
                                <Tr>
                                    <Td>Service 1</Td>
                                    <Td>$100</Td>
                                    <Td>
                                        <Button size="sm" colorScheme="black" mr="2">Edit</Button>
                                        <Button size="sm" colorScheme="red">Delete</Button>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Service 2</Td>
                                    <Td>$200</Td>
                                    <Td>
                                        <Button size="sm" colorScheme="black" mr="2">Edit</Button>
                                        <Button size="sm" colorScheme="red">Delete</Button>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>
                )}

                {/* Payments Section */}
                {activeSection === 'payments' && (
                    <Box bg="white" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
                        <Text fontSize="xl" color="#1E3E62" mb="15px">Payments</Text>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Payment ID</Th>
                                    <Th>Amount</Th>
                                    <Th>Status</Th>
                                    <Th>Date</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {/* Sample Data for Payments */}
                                <Tr>
                                    <Td>001</Td>
                                    <Td>$100</Td>
                                    <Td>Completed</Td>
                                    <Td>2024-01-01</Td>
                                    <Td>
                                        <Button size="sm" colorScheme="black" mr="2">View</Button>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>002</Td>
                                    <Td>$200</Td>
                                    <Td>Pending</Td>
                                    <Td>2024-01-02</Td>
                                    <Td>
                                        <Button size="sm" colorScheme="black" mr="2">View</Button>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>
                )}

                {/* Reports Section */}
                {activeSection === 'review' && (
                    <Box bg="white" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
                        <Text fontSize="xl" color="#1E3E62" mb="15px">Rating by the users</Text>
                        <Text>Rating: <strong>7</strong></Text>
                        <Text>Users count: <strong>123</strong></Text>
                    </Box>
                )}
                             {/* Alert Dialog for Single User Deletion */}
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
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
                                <Button colorScheme="red" onClick={() => { handleDelete(); onClose(); }} ml={3}>
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>

                {/* Alert Dialog for Delete All Users */}
                <AlertDialog
                    isOpen={isAlertOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onAlertClose}
                >
                    <AlertDialogOverlay>
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
                                <Button colorScheme="red" onClick={() => { handleDeleteAll(); onAlertClose(); }} ml={3}>
                                    Delete All
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Box>
        </Flex>
    );
};