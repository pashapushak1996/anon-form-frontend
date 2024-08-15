import React from "react";

import { Box, ChakraProvider, Image, Text } from "@chakra-ui/react";
import Form from "./components/Form";

import bgImage from "./bg_image.jpg";

function App() {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const showSuccess = () => {
    setIsSuccess(true);
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
          height={680}
          p={4}
          position={"relative"}
          zIndex={1}
          backgroundColor={"#EEEDEB"}
          borderRadius={4}
          boxShadow={"4px 4px 28px 3px rgba(0,0,0,0.45)"}
          alignItems={"center"}
          justifyContent={"center"}
          display={"flex"}
        >
          {isSuccess ? (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              textAlign={"center"}
              color={"green.300"}
            >
              <Box fontSize="46px" fontWeight={"bold"}>
                Успіх
              </Box>
              <Box fontSize="20px" fontStyle={"italic"}>
                Ви успішно залишили свій відгук
              </Box>
              <Text title={"Ви успішно залишили свій відгук"} />
            </Box>
          ) : (
            <Form showSuccess={showSuccess} />
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
