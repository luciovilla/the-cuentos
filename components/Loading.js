import { SkeletonText, Stack } from '@chakra-ui/react'

export default function Loading() {
  return (
    <Stack w="100%">
      <SkeletonText mt="4" noOfLines={3} spacing="4" />
    </Stack>
  )
}
