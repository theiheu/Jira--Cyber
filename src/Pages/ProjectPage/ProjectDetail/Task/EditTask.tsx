/* import local components */
import EditTaskForm from "../../../../Components/Forms/Task/EditTaskForm";

import { InterfaceProject } from "../../../../models/Project/Project.interface";

/* import local interfaces */
import { ITask } from "../../../../models/Task/Task.Interface";

interface IEditTask {
  project?: InterfaceProject;
  task: ITask;
}

const EditTask = ({ project, task }: IEditTask) => {
  return (
    <div className="form-wrapper min-w-full">
      <div className="form-body">
        <EditTaskForm
          layout="vertical"
          size="large"
          project={project}
          task={task}
          buttonText="create task"
        />
      </div>
    </div>
  );
};

export default EditTask;
