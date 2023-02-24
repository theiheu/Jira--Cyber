import React, { useState, useRef } from "react";

// import redux
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/useRedux";
import { useNavigate } from "react-router-dom";

// import custom Hooks
import projectHooks from "../../../hooks/ProjectHooks/projectHooks";

// import local interface
import { InterfaceProject } from "../../../models/Project/Project.interface";

// import local components
import SectionWrapper from "../../../Components/SectionWrapper/SectionWrapper";
import ProjectActionButtons from "./ProjectActionButtons";
import ButtonLocal from "../../../Components/Utils/ButtonLocal";

// import antd type
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { InputRef } from "antd";

// import antd components
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";

// import Highlighter component
import Highlighter from "react-highlight-words";

// import other library
import clsx from "clsx";

export default function ProjectManagement() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const projectList = useAppSelector(
    (state) => state.projectReducer.projectList
  );

  projectHooks.useFetchProjectList(dispatch, null);

  const handleOpenCreateProject = () => {
    navigate("create-project");
  };

  //antd control
  type ProjectIndex = keyof InterfaceProject;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    projectIndex: ProjectIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(projectIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    projectIndex: ProjectIndex
  ): ColumnType<InterfaceProject> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${
            projectIndex === "projectName" ? "Project" : projectIndex
          }`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, projectIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, projectIndex)
            }
            icon={<SearchOutlined />}
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(projectIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <div className="flex justify-center items-center">
        <SearchOutlined
          style={{ color: filtered ? "#1890ff" : undefined }}
          className="text-base"
        />
      </div>
    ),
    onFilter: (value, record) =>
      record[projectIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === projectIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<InterfaceProject> = [
    {
      title: <span className="text-lg">Name</span>,
      dataIndex: "projectName",
      key: "projectName",
      width: "20%",
      ...getColumnSearchProps("projectName"),
      sorter: (a, b) => b.projectName.localeCompare(a.projectName),
      sortDirections: ["descend", "ascend"],
      render: (projectName, project) => (
        <span
          className="projectName text-lg font-semibold cursor-pointer transition-colors duration-300"
          onClick={() => {
            window.location.href = `/project-detail/${project.id}`;
          }}
        >
          {projectName}
        </span>
      ),
    },
    {
      title: <span className="text-lg">Category</span>,
      dataIndex: "categoryName",
      key: "categoryName",
      width: "20%",
      render: (category) => <span className="text-base">{category}</span>,
    },
    {
      title: <span className="text-lg">Creator</span>,
      dataIndex: "creator",
      key: "creator",
      width: "20%",
      render: (creator) => (
        <Tag color="lime" className="text-base">
          {creator.name}
        </Tag>
      ),
    },
    {
      title: <span className="text-lg">Edit</span>,
      key: "edit",
      render: (_, project) => <ProjectActionButtons project={project} />,
    },
  ];
  // console.log("rendered");
  return (
    <SectionWrapper
      content={
        <>
          <div className="mb-2 flex justify-between items-center">
            <h3
              className={clsx(
                "title",
                "uppercase text-[#172B4D] text-2xl font-extrabold tracking-wide"
              )}
            >
              PROJECT MANAGEMENT
            </h3>
            <ButtonLocal
              baseColor="red"
              handleOnClick={handleOpenCreateProject}
            >
              Create Project
            </ButtonLocal>
          </div>
          <Table
            columns={columns}
            dataSource={projectList}
            rowKey={(project) => project.id.toString()}
          />
        </>
      }
      sectionClass="projectManagement"
      contentClass="projectManagement__content"
    />
  );
}
