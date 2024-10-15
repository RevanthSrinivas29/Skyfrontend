import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, Button, Table, Thead, Tbody, Tr, Th, Td, Link, VStack, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useState } from 'react';

export const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');

    const showSection = (sectionId) => {
        setActiveSection(sectionId);
    };

    return (
        <Flex>
            {/* Sidebar */}
            <Box width="250px" bg="#1E3E62" height="100vh" p="20px" boxShadow="lg" position="fixed">
                <Text fontSize="2xl" color="white" mb="20px">Admin Panel</Text>

                {/* Menu for navigation */}
                <VStack  spacing={2} >
                    <Menu>
                        <MenuButton as={Button} colorScheme="black" width="100%">
                            <HamburgerIcon></HamburgerIcon>Admin Menu
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => showSection('dashboard')}>Dashboard</MenuItem>
                            <MenuItem onClick={() => showSection('userManagement')}>User Management</MenuItem>
                            <MenuItem onClick={() => showSection('bookingManagement')}>Booking Management</MenuItem>
                            <MenuItem onClick={() => showSection('serviceManagement')}>Service Management</MenuItem>
                            <MenuItem onClick={() => showSection('payments')}>Payments</MenuItem>
                            <MenuItem onClick={() => showSection('reports')}>Reports</MenuItem>
                        </MenuList>
                    </Menu>
                </VStack>
            </Box>

            {/* Main content */}
            <Box ml="270px" p="20px" width="calc(100% - 270px)">
                <Box bg="#1E3E62" color="white" p="15px" textAlign="center" mb="20px" borderRadius="5px">
                    <Text fontSize="xl">Welcome, Admin!</Text>
                </Box>

                {/* Dashboard Section */}
                {activeSection === 'dashboard' && (
                    <Box bg="white" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
                        <Text fontSize="xl" color="#1E3E62" mb="15px">Key Statistics</Text>
                        <Text>Total Bookings: <strong>1,250</strong></Text>
                        <Text>Revenue This Month: <strong>$12,000</strong></Text>
                        <Text>Active Users: <strong>3,500</strong></Text>
                    </Box>
                )}

                {/* User Management Section */}
                {activeSection === 'userManagement' && (
                    <Box bg="white" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
                        <Text fontSize="xl" color="#1E3E62" mb="15px">User Management</Text>
                        <Button colorScheme="white" mb="10px">Add New User</Button>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Username</Th>
                                    <Th>Itemname</Th>
                                    <Th>Status</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>User1</Td>
                                    <Td>Admin</Td>
                                    <Td>Active</Td>
                                    <Td>
                                        <Button size="sm" colorScheme="black" mr="2">Edit</Button>
                                        <Button size="sm" colorScheme="red">Delete</Button>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>User2</Td>
                                    <Td>Customer</Td>
                                    <Td>Active</Td>
                                    <Td>
                                        <Button size="sm" colorScheme="black" mr="2">Edit</Button>
                                        <Button size="sm" colorScheme="red">Delete</Button>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>
                )}

                {/* Booking Management Section */}
                {activeSection === 'bookingManagement' && (
                    <Box bg="white" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
                        <Text fontSize="xl" color="#1E3E62" mb="15px">Booking Management</Text>
                        <Button colorScheme="black" mb="10px">View All Bookings</Button>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Booking ID</Th>
                                    <Th>Username</Th>
                                    <Th>Date</Th>
                                    <Th>Time</Th>
                                    <Th>Status</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>001</Td>
                                    <Td>User1</Td>
                                    <Td>Service1</Td>
                                    <Td>01-10-2024</Td>
                                    <Td>10:00 AM</Td>
                                    <Td>Confirmed</Td>
                                    <Td>
                                        <Button size="sm" colorScheme="black" mr="2">Edit</Button>
                                        <Button size="sm" colorScheme="red">Cancel</Button>
                                    </Td>
                                </Tr>
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
                                    <Th>Availability</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Service1</Td>
                                    <Td>$100</Td>
                                    <Td>Available</Td>
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
                                    <Th>Transaction ID</Th>
                                    <Th>User</Th>
                                    <Th>Amount</Th>
                                    <Th>Date</Th>
                                    <Th>Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>TX001</Td>
                                    <Td>User1</Td>
                                    <Td>$100</Td>
                                    <Td>01-10-2024</Td>
                                    <Td>Completed</Td>
                                </Tr>
                                <Tr>
                                    <Td>TX002</Td>
                                    <Td>User2</Td>
                                    <Td>$200</Td>
                                    <Td>02-10-2024</Td>
                                    <Td>Pending</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>
                )}

                {/* Reports Section */}
                {activeSection === 'reports' && (
                    <Box bg="white" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
                        <Text fontSize="xl" color="#1E3E62" mb="15px">Reports</Text>
                        <Button colorScheme="black" mb="10px">Generate Report</Button>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Report ID</Th>
                                    <Th>Type</Th>
                                    <Th>Date</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>R001</Td>
                                    <Td>Monthly Sales</Td>
                                    <Td>01-10-2024</Td>
                                    <Td>
                                        <Button size="sm" colorScheme="black">View</Button>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>
                )}
            </Box>
        </Flex>
    );
};
