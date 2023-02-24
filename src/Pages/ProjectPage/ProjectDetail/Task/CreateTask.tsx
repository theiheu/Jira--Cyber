/* import router dom */
import { useNavigate, useParams } from "react-router-dom";

/* import local components */
import CreateTaskForm from "../../../../Components/Forms/Task/CreateTaskForm";

/* import local hooks for redux */
import { useAppDispatch } from "../../../../hooks/redux/useRedux";
import { IProjectDetail } from "../../../../models/Project/Project.interface";

/* import local interfaces */
import { ITask } from "../../../../models/Task/Task.Interface";
import { modalActions } from "../../../../redux/slice/modalSlice";
import PROJECT_SERVICE from "../../../../services/projectServ";

/* import local service */
import TASK_SERVICE from "../../../../services/taskServ";
import toastify from "../../../../utils/toastify/toastifyUtils";

const CreateTask = ({ project }: IProjectDetail) => {
  const dispatch = useAppDispatch();
  const handleOnFinish = (values: ITask) => {
    dispatch(modalActions.closeModal());
    TASK_SERVICE.createTask(values)
      .then((res) => {
        toastify("success", res.message);
        dispatch(PROJECT_SERVICE.getDetailsThunk(project.id));
      })
      .catch((error) => {
        setTimeout(() => {
          toastify("error", error.response.data.message);
        }, 2500);
      });
  };
  return (
    <div className="form-wrapper min-w-full">
      <div className="form-body">
        <CreateTaskForm
          layout="vertical"
          size="large"
          project={project}
          buttonText="create task"
          handleOnFinish={handleOnFinish}
        />
      </div>
    </div>
  );
};

export default CreateTask;
