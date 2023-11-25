import { FC } from "react";
import { MainLayout } from "./layouts/MainLayout";
import "./styles.scss";
import { PublicRoutes } from "./routes/PublicRoutes";

const App: FC = () => {
  return (
    <MainLayout>
      <PublicRoutes />
    </MainLayout>
  );
};

export default App;
