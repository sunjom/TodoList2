import { useState } from "react";
import NewProject from "./component/NewProject";
import NoProjectSelected from "./component/NoProjectSelected";
import ProjectSidebar from "./component/ProjectSidebar";
import SelectedProject from "./component/SelectedProject";

function App() {
  const [projectsState, setProjectState] = useState({
    selectedProjectId:undefined, // 아무것도 안하고 있음
    projects: [],
    tasks:[],
  });

  function handleAddTask(text){
    setProjectState(prevState =>{
      const taskId = Math.random();
      const newTask ={
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      }

      return{
        ...prevState,
        tasks:[newTask, ...prevState.tasks]
      }
    })
  }
  function handleDeleteTask(id){
    setProjectState(prevState =>{
      return{
        ...prevState,
        tasks:prevState.tasks.filter((task) => task.id !==id)
      }
    });
  }

  function handleStartAddProject(){
    setProjectState(prevState =>{
      return{
        ...prevState,
        selectedProjectId : null, // 프로젝트 추가할 예정
      }
    });
  }
  function handleDeleteProejct(){
    setProjectState(prevState =>{
      return{
        ...prevState,
        selectedProjectId : undefined,
        projects:prevState.projects.filter((project) => project.id !==prevState.selectedProjectId)
      }
    });
  }
  function handleCancelAddProject(){
    setProjectState(prevState =>{
      return{
        ...prevState,
        selectedProjectId : undefined,
      }
    });
  }
  function handleAddProject(projectData){
    setProjectState(prevState =>{
      const projectId = Math.random();
      const newProject ={
        ...projectData,
        id:projectId
      }

      return{
        ...prevState,
        selectedProjectId: undefined,
        projects:[...prevState.projects, newProject]
      }
    })
  }
  function handleSelectProject(id){
    setProjectState(prevState =>{
      return{
        ...prevState,
        selectedProjectId : id,
      }
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id == projectsState.selectedProjectId);

  let content =<SelectedProject 
  project={selectedProject} 
  onDelete={handleDeleteProejct} 
  onAddTask={handleAddTask}
  onDeleteTask={handleDeleteTask}
  tasks={projectsState.tasks}/>;

  if(projectsState.selectedProjectId ===null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar 
      onStartAddProject={handleStartAddProject}
      projects = {projectsState.projects}
      onSelectProject={handleSelectProject}
      selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
