import '@fontsource/roboto'
import { Box, ChakraProvider, Container } from '@chakra-ui/react'
import theme from './theme'
import { TasksPage as Tasks } from './pages'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="gray.50" sx={{ height: '100vh' }}>
        <Container maxW="container.md">
          
          <Tasks />

        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App
