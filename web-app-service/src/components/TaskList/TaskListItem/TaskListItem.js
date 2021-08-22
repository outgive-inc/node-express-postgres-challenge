import { Box, Checkbox, IconButton, Text } from '@chakra-ui/react'
import { EditIcon, DeleteIcon, ChevronUpIcon, ChevronDownIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { TaskListItemBL } from './TaskListItemBL'

export const TaskListItem = ({ task, isSubTask = false }) => {
    const {
        subTasks,
        isCollapsed,
        setIsCollapsed,
        initUpdateModal,
        initDeleteModal,
        initCreateModal,
        updateTaskStatus
    } = TaskListItemBL({task})

    return (
        <>
            <Box boxShadow="base" p="6" rounded="2xl" bg={!isSubTask ? "white" : "whiteAlpha.200"} ml={!isSubTask ? '' : "50px"}>
                <Box display="flex" alignItems="center">
                    <Checkbox 
                        mr="15px" 
                        colorScheme="green" 
                        onChange={() => updateTaskStatus({
                            id: task[!isSubTask ? 'taskId' : 'subTaskId'],
                            completed: !task.completed,
                            isSubTask
                        })}
                        isChecked={task.completed}
                        defaultChecked={task.completed}
                    />
                    <Text fontSize="lg" w="100%" isTruncated as={task.completed ? "del" : ""}>{task.title}</Text>
                    
                    <Box display="flex">
                        {
                            !isSubTask 
                            ? (
                                <>
                                    <IconButton 
                                        size="sm"
                                        variant="ghost" 
                                        color="gray" 
                                        title="Add Subtask"
                                        onClick={() => initCreateModal({taskId: task.taskId})}
                                        icon={<PlusSquareIcon w="18px" h="18px" /> } 
                                    />
                                    <IconButton 
                                        size="sm"
                                        variant="ghost" 
                                        color="gray" 
                                        title="Edit Task"
                                        onClick={() => initUpdateModal(task)}
                                        icon={<EditIcon w="18px" h="18px" /> } 
                                    />
                                </>   
                            ) : ''
                        }

                        <IconButton 
                            size="sm"
                            variant="ghost" 
                            color="gray"
                            title="Delete Task"
                            onClick={() => initDeleteModal({id: task[!isSubTask ? 'taskId' : 'subTaskId'], isSubTask})}
                            icon={<DeleteIcon w="18px" h="18px" /> } 
                        />

                        {
                            !isSubTask 
                            ? (
                                <>
                                    {
                                        task.SubTasks && task.SubTasks.length !== 0
                                        ? (
                                            isCollapsed
                                            ? <IconButton 
                                                onClick={() => setIsCollapsed(!isCollapsed)} 
                                                size="sm"
                                                variant="ghost" 
                                                color="gray" 
                                                title="View Subtasks"
                                                icon={<ChevronUpIcon w="18px" h="18px" />} 
                                                />
                                            : <IconButton 
                                                onClick={() => setIsCollapsed(!isCollapsed)} 
                                                size="sm"
                                                variant="ghost" 
                                                color="gray"
                                                title="Hide Subtasks"
                                                icon={<ChevronDownIcon w="18px" h="18px" />} 
                                            />
                                        )
                                        : null
                                    }
                                </>
                            ) : ''
                        }
            
                    </Box>
                </Box>
                
                {
                    task.details 
                    ? <Box display="flex" alignItems="center" pt="10px" px="35px" color="gray.500">
                        <Text fontSize="sm" pr="5px">Details:</Text>
                        <Text fontSize="sm" isTruncated>{task.details}</Text>
                    </Box> 
                    : ''
                }
            </Box>

            {
                task.SubTasks && task.SubTasks.length !== 0 && !isCollapsed 
                ? task.SubTasks.map((subTask, i) => (
                    <TaskListItem isSubTask task={subTask} key={i} />
                ))
                : ''
            }
        </>
    )
}
