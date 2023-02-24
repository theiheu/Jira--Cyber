import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SectionWrapper from "../../../Components/SectionWrapper/SectionWrapper";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/useRedux";
import { InterfaceProject } from "../../../models/Project/Project.interface";
import { projectActions } from "../../../redux/slice/projectSlice";
import PROJECT_SERVICE from "../../../services/projectServ";
import DetailHeader from "./DetailHeader";
import DetailIssueBoard from "./DetailIssueBoard";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    PROJECT_SERVICE.getDetails(projectId)
      .then((res) => {
        dispatch(
          projectActions.putProjectDetail({
            id: res.content.id,
            projectName: res.content.projectName,
            description: res.content.description,
            categoryName: res.content.projectCategory.name,
            categoryId: res.content.projectCategory.id,
            projectCategory: res.content.projectCategory,
            creator: res.content.creator,
            lstTask: res.content.lstTask,
            members: res.content.members,
            alias: res.content.alias,
          })
        );
        setTimeout(() => {}, 1000);
      })
      .catch((err) => {
        setTimeout(() => {}, 1000);
        console.log(err);
      });
  }, []);

  let projectDetailInfo = useAppSelector(
    (state) => state.projectReducer.project as InterfaceProject
  );

  const pageContent = () => {
    if (projectDetailInfo) {
      return (
        <>
          <DetailHeader project={projectDetailInfo} />
          <DetailIssueBoard project={projectDetailInfo} />
        </>
      );
    }
  };

  return (
    <div className="project-detail-page h-full">
      <div className="page-header">{/* breadcrumb */}</div>
      <SectionWrapper
        title={`${projectDetailInfo?.projectName}`}
        content={pageContent()}
        sectionClass="project-detail-section"
      />
    </div>
  );
};

export default ProjectDetail;
