import React from 'react';
import { Box, Flex,  } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

// Define keyframes for the hamster running and the wheel spinning
const hamsterRunKeyframes = keyframes`
  0%, 100% {
    transform: rotate(4deg) translate(-0.8em, 1.85em);
  }
  50% {
    transform: rotate(0) translate(-0.8em, 1.85em);
  }
`;

const wheelSpinKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const HamsterWheel = () => {
  return (
    <Flex
      justify="center"
      align="center"
      height="100vh" // Full viewport height
      overflow="hidden"
    >
      <Box
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        position="relative"
        width="12em"
        height="12em"
      >
        {/* Wheel */}
        <Box
          borderRadius="50%"
          width="100%"
          height="100%"
          bgGradient="radial(100% 100% at center, hsla(0, 0%, 60%, 0) 47.8%, hsl(0, 0%, 60%) 48%)"
          animation={`${wheelSpinKeyframes} 2s linear infinite`} // Wheel spinning animation
          zIndex={2}
        />
        
        {/* Hamster */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width="7em"
          height="3.75em"
          transform="translate(-50%, -50%)" // Center the hamster inside the wheel
          transformOrigin="50% 0"
          animation={`${hamsterRunKeyframes} 1s ease-in-out infinite`} // Hamster running animation
          zIndex={1}
        >
          {/* Hamster Body */}
          <Box
            background="hsl(30, 90%, 55%)"
            borderRadius="70% 30% 0 100% / 40% 25% 25% 60%"
            boxShadow="0 -0.25em 0 hsl(30, 90%, 80%) inset, 0.75em -1.55em 0 hsl(30, 90%, 90%) inset"
            position="absolute"
            top={0}
            left="-2em"
            width="2.75em"
            height="2.5em"
            transformOrigin="100% 50%"
          >
            {/* Hamster Head */}
            <Box
              background="hsl(0, 90%, 85%)"
              borderRadius="50%"
              position="absolute"
              top="-0.25em"
              right="-0.25em"
              width="0.75em"
              height="0.75em"
              boxShadow="-0.25em 0 hsl(30, 90%, 55%) inset"
            />
            <Box
              background="hsl(0, 0%, 0%)"
              borderRadius="50%"
              position="absolute"
              top="0.375em"
              left="1.25em"
              width="0.5em"
              height="0.5em"
            />
            <Box
              background="hsl(0, 90%, 75%)"
              borderRadius="35% 65% 85% 15% / 70% 50% 50% 30%"
              position="absolute"
              top="0.75em"
              left={0}
              width="0.2em"
              height="0.25em"
            />
          </Box>
          
          {/* Limbs */}
          <Box
            background="linear-gradient(hsl(30, 90%, 80%) 80%, hsl(0, 90%, 75%) 80%)"
            position="absolute"
            top="2em"
            left="0.5em"
            width="1em"
            height="1.5em"
            transformOrigin="50% 0"
            clipPath="polygon(0 0, 100% 0, 70% 80%, 60% 100%, 0% 100%, 40% 80%)"
          />
          <Box
            background="linear-gradient(hsl(30, 90%, 90%) 80%, hsl(0, 90%, 85%) 80%)"
            position="absolute"
            top="2em"
            left="0.5em"
            width="1em"
            height="1.5em"
            transformOrigin="50% 0"
            clipPath="polygon(0 0, 100% 0, 70% 80%, 60% 100%, 0% 100%, 40% 80%)"
          />
          <Box
            borderRadius="0.75em 0.75em 0 0"
            position="absolute"
            top="1em"
            left="2.8em"
            width="1.5em"
            height="2.5em"
            transformOrigin="50% 30%"
            clipPath="polygon(0 0, 100% 0, 100% 30%, 70% 90%, 70% 100%, 30% 100%, 40% 90%, 0% 30%)"
          />
          <Box
            borderRadius="0.75em 0.75em 0 0"
            position="absolute"
            top="1em"
            left="2.8em"
            width="1.5em"
            height="2.5em"
            transformOrigin="50% 30%"
            clipPath="polygon(0 0, 100% 0, 100% 30%, 70% 90%, 70% 100%, 30% 100%, 40% 90%, 0% 30%)"
          />
          <Box
            background="hsl(0, 90%, 85%)"
            borderRadius="0.25em 50% 50% 0.25em"
            position="absolute"
            top="1.5em"
            right="-0.5em"
            width="1em"
            height="0.5em"
            transformOrigin="0.25em 0.25em"
          />
        </Box>
      </Box>
    </Flex>
  );
};

