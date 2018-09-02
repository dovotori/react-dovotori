import Home from "../components/Home";
import ProjectContainer from "../containers/ProjectContainer";
import Cv from "../components/Cv";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/cv",
    component: Cv,
    exact: true
  },
  {
    path: "/:slug",
    component: ProjectContainer,
    exact: false
  }
];

export default routes;
