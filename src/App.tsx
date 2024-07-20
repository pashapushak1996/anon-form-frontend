import React from "react";

import { Box, ChakraProvider, Image } from "@chakra-ui/react";
import Form from "./components/Form";

import bgImage from "./bg_image.jpg";

function App() {
  return (
    <ChakraProvider>
      <Box
        backgroundColor={"#2F3645"}
        minHeight="100vh"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        px={4}
      >
        <Image
          src={bgImage}
          width={"100%"}
          height={"100%"}
          objectFit={"cover"}
          position={"absolute"}
        />
        <Box
          maxW={400}
          p={4}
          position={"relative"}
          zIndex={1}
          backgroundColor={"#EEEDEB"}
          borderRadius={4}
          boxShadow={"4px 4px 28px 3px rgba(0,0,0,0.45)"}
        >
          <Form />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
