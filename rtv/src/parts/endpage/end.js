import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
export const End = ()=>
    {
        return(
            <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            textAlign="center"
            height="100vh" 
          >
            <CheckCircleIcon color="green.500" boxSize={5} mr={2} />
            Payment confirmation will be sent to your email
          </Box>
        )
    } 