import React from 'react'
import { Box } from '@chakra-ui/react'

import Nav from './Nav'
import Footer from './Footer'

const DocsLayout = ({ children }) => (
  <>
    <Nav />
    <Box maxW="650px" mx="auto" px={8} mt="40">
      {children}
    </Box>
    <Footer />
  </>
)

export default DocsLayout
