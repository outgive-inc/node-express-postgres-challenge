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
    Center,
} from '@chakra-ui/react'
import { FormControl } from '../../Form'
import { UpdateTaskBL } from './UpdateTaskBL'

export const UpdateTaskModal = () => {
    const { 
        updateTask,

        // Form Inputs
        title,
        details,
        setTitle,
        setDetails,
        updateBtnDisabled,

        // Form Errors
        errors,
        setErrors,
        
        // Modal
        updateModalOpen, 
        closeCreateTaskModal
    } = UpdateTaskBL()
    
    return (
        <>
            <Modal isOpen={updateModalOpen} onClose={closeCreateTaskModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Task</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Box mb="15px">
                            <FormControl 
                                label="Task Name" 
                                name="title" 
                                value={title} 
                                onChange={(title) => {
                                    setTitle(title)
                                    setErrors({})
                                }}
                                errors={errors} 
                            />
                        </Box>
                        
                        <Box mb="15px">
                            <FormControl 
                                label="Task Description" 
                                name="details" 
                                textarea={true} 
                                value={details} 
                                onChange={setDetails}
                            />
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr="10px" colorScheme="gray" variant="ghost" onClick={closeCreateTaskModal}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button colorScheme="green" variant="outline" onClick={updateTask} disabled={updateBtnDisabled}>
                            {
                                !updateBtnDisabled
                                ? <Text>Update</Text>
                                : <Center><Text>Saving</Text><Spinner ml="5px" size="sm"/></Center>
                            }
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
