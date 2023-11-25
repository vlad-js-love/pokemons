import { useNavigate } from "react-router-dom";

export const useBackHistory = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return {
    goBack,
  };
};
