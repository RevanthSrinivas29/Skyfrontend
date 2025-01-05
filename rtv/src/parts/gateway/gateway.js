import React, { useState, useEffect } from 'react';
import { 
    Box, Button, FormControl, VStack, Text, useToast, 
    Card, Image, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Input 
} from '@chakra-ui/react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export const PaymentPage = () => {
    const [tcid, setTcid] = useState('');
    const [bkname, setBkname] = useState('');
    const [showAlert, setShowAlert] = useState(true);
    const toast = useToast();
    const location = useLocation();
    const navigate = useNavigate();

    const { duration,userID } = location.state || {};
    console.log(userID);
    const fixedAmount =duration ===5 ?800 :duration === 3 ? 500 : duration === 2 ? 400 : 300;
    const upiID = '8247693087@axl';
    const encodedUpiID = encodeURIComponent(upiID);
    const encodedAmount = encodeURIComponent(fixedAmount.toFixed(2));
    const qrCodeUrl = `upi://pay?pa=${encodedUpiID}&pn=BOOKING GAMES&am=${encodedAmount}&cu=INR`;

    // Display bookingData only once
    useEffect(() => {
        const userdt = sessionStorage.getItem('bookingData');
        if (userdt) {
            const user = JSON.parse(userdt);
            console.log(user);
        } else {
            console.log('No data found');
        }
    }, []);

    const handlePayment = async () => {
        const TRANSACTION_ID_LENGTH = 12;
    
        if (!tcid || !bkname) {
            toast({
                title: "Missing Fields",
                description: "Please enter both Transaction ID and Banking Name.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
    
        if (tcid.length !== TRANSACTION_ID_LENGTH) {
            toast({
                title: "Invalid Transaction ID",
                description: `Transaction ID must be exactly ${TRANSACTION_ID_LENGTH} characters long.`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
    
        const details = { tcid, bkname, userID, fixedAmount };
        console.log("Submitting payment details:", details); // Debugging
    
        try {
            const response = await axios.post('https://skyland.onrender.com/payment', details);
            console.log("Server response:", response); // Debugging
    
            if (response.status === 200) {
                toast({
                    title: "Payment Confirmation",
                    description: "Your payment details have been successfully submitted. Details will be sent to your mail.",
                    status: "success",
                    duration: 7000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Submission Failed",
                    description: response.data?.message || "Something went wrong.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Error during payment submission:", error.response || error); // Debugging
            toast({
                title: "Error",
                description: error.response?.data?.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };
    

    return (
        <Box width="300px" mx="auto" mt={8}>
            <VStack spacing={4}>
                {/* Alert for payment security */}
                {showAlert && (
                    <Alert status="warning" borderRadius={5}>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Warning!</AlertTitle>
                            <AlertDescription>
                                The banking name is MALLA. Please verify before proceeding.
                            </AlertDescription>
                        </Box>
                        <CloseButton
                            position="absolute"
                            right="8px"
                            top="8px"
                            onClick={() => setShowAlert(false)}
                        />
                    </Alert>
                )}

                <FormControl id="amount" isRequired>
                    <Card mt={4} borderRadius={5} p={4} boxShadow="2xl">
                        <Text fontSize="xl" fontWeight="bold" textAlign="center">
                            Make payment and share the details
                        </Text>
                        <Button onClick={() =>window.open( `upi://pay?pa=${encodedUpiID}&pn=BOOKING GAMES&am=${encodedAmount}&cu=INR`, '_blank' )
                                }
                                alt="Link for Payment"
                                colorScheme="teal"
                                mt={4}
                                >
                                Pay {fixedAmount}
                                </Button>

                            
                        <Input
                            placeholder="Enter Transaction ID"
                            value={tcid}
                            onChange={(e) => setTcid(e.target.value)}
                            mt={4}
                        />
                        <Input
                            placeholder="Enter Banking Name"
                            value={bkname}
                            onChange={(e) => setBkname(e.target.value)}
                            mt={4}
                        />
                    </Card>
                </FormControl>
                <Button onClick={handlePayment} colorScheme="teal" mt={4}>
                    Confirm Payment
                </Button>
            </VStack>
        </Box>
    );
};
