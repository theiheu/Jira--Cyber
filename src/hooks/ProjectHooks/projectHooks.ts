import { useEffect } from "react";

// import redux
import { projectActions } from "../../redux/slice/projectSlice";
import { AppDispatch } from "../../redux/store/store";

// import local services
import PROJECT_SERVICE from "../../services/projectServ";

// import antd component
import { message } from "antd";

const projectHooks = {
  useFetchProjectList: (
    dispatch: AppDispatch,
    successMessage: string | null
  ) => {
    useEffect(() => {
      PROJECT_SERVICE.getAll()
        .then((res) => {
          dispatch(projectActions.updateProjectList(res.content));
          if (successMessage) {
            message.success(successMessage);
          }
        })
        .catch((err) => {
          console.log(err);
          message.error(err.response.data.content);
        });
    }, []);
  },
};

export default projectHooks;
