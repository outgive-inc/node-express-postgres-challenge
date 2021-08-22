import '../../../styles/custom-pagination.css'
import { SimpleGrid } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { TaskListItem, TaskListSkeleton } from '..'
import { EmptyState } from '../../EmptyState'
import ReactPaginate from 'react-paginate'
import { TaskListBL } from './TaskListBL'

export const TaskList = () => {
    const { tasks, totalPage, handlePageClick } = TaskListBL()

    return (
        <>
            <SimpleGrid spacing={2}>
                {
                    !tasks
                        // Show skeleton loader if tasks is being fetch
                        ? <TaskListSkeleton />
                        : tasks.length !== 0
                            // Display task list if tasks is not empty
                            ? tasks.map((task, i) => (
                                <TaskListItem task={task} key={i} />
                            )) 
                            // Else, display empty state if there are no tasks
                            : <EmptyState />
                }
            </SimpleGrid>

            {
                totalPage > 1
                ? <ReactPaginate
                        previousLabel={<ChevronLeftIcon />}
                        nextLabel={<ChevronRightIcon />}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={totalPage}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                : null
            }
        </>
    )
}
