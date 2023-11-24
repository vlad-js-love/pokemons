import { ReactNode, FC } from "react";
import { BrowserRouter } from "react-router-dom";
import styles from "../styles/global.module.scss";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

interface IProps {
  children: ReactNode;
}

export const MainLayout: FC<IProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <Header />
      <div className={styles.main}>{children}</div>
      <Footer />
    </BrowserRouter>
  );
};
