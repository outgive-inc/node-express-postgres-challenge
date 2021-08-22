import { Box, Checkbox, Skeleton } from "@chakra-ui/react"

export const TaskListSkeleton = () => {
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    return (
        <>
            {
                [...Array(10)].map((_, i) => (
                    <Box display="flex" boxShadow="base" p="6" rounded="2xl" bg="white" key={i}>
                        <Checkbox isDisabled mr="15px" />
                        <Skeleton height="25px" width={`${getRandomNumber(30, 80)}%`} />
                    </Box>
                ))
            }
        </>
    )
}
