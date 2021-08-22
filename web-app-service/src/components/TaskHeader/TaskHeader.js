import { Box, Button, Heading } from "@chakra-ui/react"
import { useContext } from "react"
import { TaskListContext } from "../../pages"

export const TaskHeader = () => {
    const { createModalOpen, setCreateModalOpen } = useContext(TaskListContext)
    
    return (
        <Box display="flex" pt="50px" pb="25px">
            <Heading size="lg">My Task List</Heading>
            <Button colorScheme="green" ml="auto" onClick={() => setCreateModalOpen(!createModalOpen)}>Add Task</Button>
        </Box>
    )
}
