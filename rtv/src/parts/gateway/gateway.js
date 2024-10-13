// // PaymentPage.js
// import React, { useState } from 'react';
// import { Box, Button, useToast } from '@chakra-ui/react';
// import axios from 'axios';

// const PaymentPage = () => {
//   const [amount] = useState(10); // Default amount
//   const toast = useToast();

//   const handlePaymentRequest = async () => {
//     try {
//       // Send request to the server to create a payment request
//       const response = await axios.post('http://localhost:9000/payment', { amount });

//       if (response.data.success) {
//         // Redirect user to PhonePe app using deep linking
//         const phonePeUrl = `phonepe://pay?amount=${amount}&transactionId=${response.data.transactionId}`; // Customize this URL as needed
//         window.location.href = phonePeUrl; // Redirect to PhonePe app

//         toast({
//           title: 'Payment initiated!',
//           description: 'Please check your PhonePe app to complete the transaction.',
//           status: 'success',
//           duration: 5000,
//           isClosable: true,
//         });
//       } else {
//         toast({
//           title: 'Payment failed',
//           description: response.data.message,
//           status: 'error',
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Error occurred during payment processing!',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Box p={8} maxW="400px" mx="auto" mt={10}>
//       <Button onClick={handlePaymentRequest} colorScheme="blue" w="full">
//         Pay ₹{amount} with PhonePe
//       </Button>
//     </Box>
//   );
// };

// export default PaymentPage;
import React, { useState } from 'react';
import { Box, Button, FormControl, VStack, Text, useToast, Card, Heading, Image, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';
import axios from 'axios';

export const PaymentPage = () => {
    const [amount, setAmount] = useState('');
    const [showAlert, setShowAlert] = useState(true);  // State to control the visibility of the alert
    const toast = useToast();

    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:3000/makePayment', { amount });
            if (response.data.success) {
                toast({
                    title: "Payment Initiated",
                    description: response.data.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Payment Failed",
                    description: response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Error during payment:", error);
            toast({
                title: "Error",
                description: "An error occurred during payment processing.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
      <Box width="400px" mx="auto" mt={8}>
        <VStack spacing={4}>
          {/* Alert for payment security */}
          {showAlert && (
            <Alert status="warning" borderRadius={5}>
              <AlertIcon />
              <Box>
                <AlertTitle>Warning!</AlertTitle>
                <AlertDescription>
                  This interface is not responsible for the payment.You are just paying money 
                  directly to the incharge
                </AlertDescription>
              </Box>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setShowAlert(false)}  // Hide the alert when close button is clicked
              />
            </Alert>
          )}

          <FormControl id="amount" isRequired>
            <Card mt={4} borderRadius={5} p={4} boxShadow="2xl">
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Scan the QR for the payment
              </Text>
              <Image
                src="https://i.ibb.co/HXK70p7/Qr-Code.png" // Use a direct image link here
                alt="QR Code for Payment"
                mt={4}
                m={10}
                borderRadius={20}
              />
            </Card>
          </FormControl>

          <Heading colorScheme="teal">Make Payment</Heading>
        </VStack>
      </Box>
    );
};
;

