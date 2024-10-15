import React, { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
    Icon,
    Spinner,
    useToast,
    useBreakpointValue,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const toast = useToast();
    const nav = useNavigate();

    const handleLogin = async () => {
        setLoading(true); // Start loading
    
        try {
            // Send login request to backend
            const response = await axios.post('/log', {
                username,
                password,
            });
    
            if (response.status === 200) {
                // Successful login
                nav('/admin'); // Redirect to admin page
            }
        } catch (error) {
            // Handle errors
            setError('Invalid username or password.');
            toast({
                title: 'Login Failed',
                description: 'Invalid username or password.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };
    

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bg="#eef2f3"
        >
            <Box
                bg="white"
                p={6}
                borderRadius="8px"
                boxShadow="lg"
                width={{ base: '90%', sm: '400px' }} // Responsive width
                position="relative"
            >
                <Heading as="h2" size="lg" textAlign="center" color="#2980B9" mb={4}>
                    Admin Login
                </Heading>
                {error && <Text color="red.500" textAlign="center" mb={4}>{error}</Text>}
                <FormControl mb={4}>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl mb={4} position="relative">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        onPaste={(e) => e.preventDefault()} // Disable paste
                    />
                    <Icon
                        as={showPassword ? FaEyeSlash : FaEye}
                        position="absolute"
                        right="10px"
                        alignContent="center"
                        cursor="pointer"
                        color="gray.500"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </FormControl>
                <Button
                    width="100%"
                    bg="#2980B9"
                    color="white"
                    _hover={{ bg: "#3498DB" }}
                    onClick={handleLogin}
                    isDisabled={loading} // Disable button while loading
                >
                    {loading ? <Spinner size="sm" /> : 'Login'}
                </Button>
            </Box>
        </Box>
    );
};

