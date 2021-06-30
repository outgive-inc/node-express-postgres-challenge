import { Fragment } from "react";

import CreateTask from "./components/createTask";
import ListTasks from "./components/listTasks";
import Store from "./store/taskStore";

function App() {
    return (
        <Fragment>
            <Store>
                <div>
                    <div className="container">
                        <CreateTask />
                        <ListTasks />
                    </div>
                </div>
            </Store>
        </Fragment>
    );
}

export default App;
