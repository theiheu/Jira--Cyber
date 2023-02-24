import { useNavigate } from "react-router-dom";

// import redux
import { useAppDispatch } from "../../../hooks/redux/useRedux";
import { projectActions } from "../../../redux/slice/projectSlice";

// import local Interface
import { InterfaceProject } from "../../../models/Project/Project.interface";

// import local component
import SectionWrapper from "../../../Components/SectionWrapper/SectionWrapper";
import ProjectForm from "../../../Components/Forms/ProjectForm";

// import local Services
import PROJECT_SERVICE from "../../../services/projectServ";

// import utils
import toastify from "../../../utils/toastify/toastifyUtils";

const CreateProjectPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnFinish = (values: InterfaceProject) => {
    const newProject = { ...values };
    if (!values.description) {
      newProject.description = "";
    }
    PROJECT_SERVICE.createProject(newProject)
      .then((res) => {
        dispatch(projectActions.putProjectDetail(res.content));
        setTimeout(() => {
          navigate("/", { replace: true });
          toastify("success", "Create project successfully !");
        }, 2500);
      })
      .catch((err) => {
        setTimeout(() => {
          toastify("error", err.response.data.content);
        }, 2500);
      });
  };

  const pageContent = (
    <div className="form-wrapper">
      <div className="form-body">
        <ProjectForm
          layout="vertical"
          size="large"
          confirmText="Create Project"
          handleOnFinish={handleOnFinish}
        />
      </div>
    </div>
  );
  return (
    <div className="create-project-page h-full">
      <SectionWrapper
        title="Add project-details"
        subTitle="You can change these details anytime in your project settings."
        content={pageContent}
        sectionClass="create-project-section"
      />
    </div>
  );
};

export default CreateProjectPage;
