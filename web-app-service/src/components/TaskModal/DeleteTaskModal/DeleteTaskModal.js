import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Spinner,
    Text,
    Center
} from '@chakra-ui/react'
import { DeleteTaskBL } from './DeleteTaskBL'

export const DeleteTaskModal = () => {
    const { 
        deleteTask,
        deleteSubTask,

        // Form Inputs
        deleteBtnDisabled,
        
        // Modal
        deleteModalOpen, 
        closeDeleteTaskModal
    } = DeleteTaskBL()   

    return (
        <>
            <Modal isOpen={deleteModalOpen} onClose={closeDeleteTaskModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete {!deleteSubTask ? 'Task' : 'Sub Task'}</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Box mb="15px">
                            <Text>Are you sure you want to delete this {!deleteSubTask ? 'task' : 'sub task'}?</Text>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr="10px" colorScheme="gray" variant="ghost" onClick={closeDeleteTaskModal}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button colorScheme="red" onClick={deleteTask} disabled={deleteBtnDisabled}>
                            {
                                !deleteBtnDisabled
                                ? <Text>Delete</Text>
                                : <Center><Text>Deleting</Text><Spinner ml="5px" size="sm"/></Center>
                            }
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
