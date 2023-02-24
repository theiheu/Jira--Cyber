// import local interface
import {
  InterfaceProjectEditComponent,
  InterfaceProjectUpdate,
} from "../../../models/Project/Project.interface";

// import redux
import { useAppDispatch } from "../../../hooks/redux/useRedux";
import { generalActions } from "../../../redux/slice/generalSlice";

// import local Services
import PROJECT_SERVICE from "../../../services/projectServ";

// import local component
import ProjectForm from "../../../Components/Forms/ProjectForm";

// import utils
import toastify from "../../../utils/toastify/toastifyUtils";
import SectionWrapper from "../../../Components/SectionWrapper/SectionWrapper";

export default function ProjectEdit({
  project,
}: InterfaceProjectEditComponent) {
  // console.log(project);
  const dispatch = useAppDispatch();

  const handleOnFinish = (values: InterfaceProjectUpdate) => {
    const updateProject = {
      ...values,
      id: project.id,
      creator: project.creator.id,
    };
    PROJECT_SERVICE.update(project.id, updateProject)
      .then(() => {
        toastify("success", "Updated project successfully !");
        dispatch(generalActions.closeDrawer());
        setTimeout(() => {
          dispatch(PROJECT_SERVICE.getAllAndDispatch(null));
        }, 2500);
      })
      .catch((err) => {
        setTimeout(() => {
          toastify("error", err.response.data.message);
        }, 2500);
      });
  };

  return (
    <SectionWrapper
      title="Edit Project"
      content={
        <div className="form-wrapper">
          <div className="form-body">
            <ProjectForm
              layout="vertical"
              size="large"
              project={project}
              confirmText="Update Project"
              handleOnFinish={handleOnFinish}
            />
          </div>
        </div>
      }
    />
  );
}
