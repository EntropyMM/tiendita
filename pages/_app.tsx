import { ChakraProvider, Container, VStack, Image, Heading, Text, Box } from "@chakra-ui/react"
import { AppProps } from "next/dist/shared/lib/router/router"
import React from "react"
import theme from "../theme"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
      <Container 
      borderRadius="sm"
      backgroundColor="primary" 
      boxShadow="md" 
      margin="auto"
      marginY={20} 
      maxWidth="container.xl" 
      padding={4}>
        <VStack marginBottom={6}>
          <Image borderRadius={9999} src="//placehold.it/128x128" alt="logo"></Image>
          <Heading>ECOMERCADO</Heading>
          <Text>RED KINTU</Text>
        </VStack>
        
      <Component {...pageProps} />
      </Container>
      </Box>
    </ChakraProvider>
  )
}
export default App