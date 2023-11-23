import { FC } from "react";
import { MainLayout } from "./layouts/MainLayout";
import "./styles.scss";
import { MainRoutes } from './components/MainRoutes/MainRoutes';

const App: FC = () => {
  return (
    <MainLayout>
      <MainRoutes />
    </MainLayout>
  );
};

export default App;
