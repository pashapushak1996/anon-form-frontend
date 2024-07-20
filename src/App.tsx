import React from "react";

import { Box, ChakraProvider, Image, useDisclosure } from "@chakra-ui/react";
import Form from "./components/Form";

import bgImage from "./bg_image.jpg";
import AppModal from "./components/Modal";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showModal = () => {
    onOpen();

    setTimeout(() => {
      onClose();
    }, 1000);
  };

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
          width={400}
          p={4}
          position={"relative"}
          zIndex={1}
          backgroundColor={"#EEEDEB"}
          borderRadius={4}
          boxShadow={"4px 4px 28px 3px rgba(0,0,0,0.45)"}
        >
          <Form showModal={showModal} />
        </Box>
        <AppModal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          title={"Успіх"}
          description={"Ви успішно залишили свій відгук"}
        />
      </Box>
    </ChakraProvider>
  );
}

export default App;
