import { Center, Text } from "@chakra-ui/react"

export const EmptyState = () => {
    return (
        <Center h="250px">
            <Text size="3xl" color="gray.400">You don't have any tasks</Text>
        </Center>
    )
}
