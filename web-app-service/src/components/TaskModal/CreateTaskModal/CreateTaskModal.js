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
import { CreateTaskBL } from './CreateTaskBL'

export const CreateTaskModal = () => {
    const { 
        createTask,
        subTaskTaskId,
        
        // Form Inputs
        setTitle,
        setDetails,
        createBtnDisabled,

        // Form Errors
        errors,
        setErrors,
        
        // Modal
        createModalOpen, 
        closeCreateTaskModal,
    } = CreateTaskBL()   
    
    return (
        <>
            <Modal isOpen={createModalOpen} onClose={closeCreateTaskModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create { !subTaskTaskId ? 'Task' : 'Sub Task' }</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Box mb="15px">
                            <FormControl 
                                label="Task Name" 
                                name="title" 
                                onChange={(title) => {
                                    setTitle(title)
                                    setErrors({})
                                }}
                                errors={errors} 
                            />
                        </Box>
                        
                        {
                            !subTaskTaskId
                            ? <Box mb="15px">
                                <FormControl 
                                    name="details" 
                                    label="Task Description" 
                                    onChange={setDetails}
                                    textarea={true} 
                                />
                            </Box>
                            : ''
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button mr="10px" colorScheme="gray" variant="ghost" onClick={closeCreateTaskModal}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button colorScheme="green" variant="outline" onClick={createTask} disabled={createBtnDisabled}>
                            {
                                !createBtnDisabled
                                ? <Text>Create</Text>
                                : <Center><Text>Saving</Text><Spinner ml="5px" size="sm"/></Center>
                            }
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
