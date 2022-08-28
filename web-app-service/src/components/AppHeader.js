import React, {useState} from 'react';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TaskModal from './TaskModal';
import { constants } from '../utils/constants';


function AppHeader() {

    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className={styles.appHeader}>
            <Button variant="primary" onClick={() => setModalOpen(true)}>Add Task</Button>
            {/* <SelectButton
                id="status"
                // onChange={(e) => updateFilter(e)}
                // value={filterStatus}
            >
                <option value={constants.status.all}>{constants.statusKey[constants.status.all]}</option>
                <option value={false}>{constants.statusKey[constants.status.inprogress]}</option>
                <option value={true}>{constants.statusKey[constants.status.complete]}</option>
            </SelectButton> */}
            <TaskModal type={"Add"} modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
    );
}

export default AppHeader
