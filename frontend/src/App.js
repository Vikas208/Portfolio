import './App.css';
import { Routes, Route } from 'react-router-dom';
import Profile from "./Components/Profile";
import Main from './Components/Main';
import AboutMe from "./Components/AboutMe";
import Project from './Components/Project';
import ProjectDescription from './Components/ProjectDescription';
import ContactMe from './Components/ContactMe';
import ErrorPage from './Components/ErrorPage';
import { Navigate } from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='/' element={<Profile />}></Route>
          <Route path='/aboutMe' element={<AboutMe />}></Route>
          <Route path='/projects' element={<Project />}></Route>
          <Route path='/project/:id' element={<ProjectDescription />}></Route>
          <Route path='/contactMe' element={<ContactMe />}></Route>
          <Route path="/error" element={<ErrorPage statusCode={500} />}></Route>
          <Route path='/notfound' element={<ErrorPage statusCode={404} />} ></Route>
          <Route path="*" element={<Navigate to="/notfound" />} ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
