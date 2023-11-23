import { ReactNode, FC } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BrowserRouter } from "react-router-dom";
import styles from "../styles/global.module.scss";

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
