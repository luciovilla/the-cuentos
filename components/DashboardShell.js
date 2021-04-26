import React from 'react'
import { Box, Heading, Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import AddCuentoModal from './AddCuentoModal'
import Nav from './Nav'

const title = 'The Cuentos – Dashboard'
const url = 'https://thecuentos.com/dashboard'

const DashboardShell = ({ children }) => {
  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      <Nav />
      <Box mt="20" maxW="1000px" mx="auto">
        <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
          <Flex justifyContent="space-between">
            <Heading mb={8}>My Cuentos</Heading>
            <AddCuentoModal>+ Add Cuento</AddCuentoModal>
          </Flex>
          {children}
        </Flex>
      </Box>
    </>
  )
}

export default DashboardShell
