import { useState } from "react";
import NewProject from "./component/NewProject";
import NoProjectSelected from "./component/NoProjectSelected";
import ProjectSidebar from "./component/ProjectSidebar";

function App() {
  const [projectsState, setProjectState] = useState({
    selectedProjectId:undefined, // 아무것도 안하고 있음
    projects: []
  })

  function handleStartAddProject(){
    setProjectState(prevState =>{
      return{
        ...prevState,
        selectedProjectId : null, // 프로젝트 추가할 예정
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
    
  }

  
  let content;
  if(projectsState.selectedProjectId ===null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddProject={handleStartAddProject} projects = {projectsState.projects}/>
      {content}
    </main>
  );
}

export default App;
