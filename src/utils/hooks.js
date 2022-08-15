import { useNavigate, useLocation } from 'react-router-dom';
import { getTabByLink, getTabByKey, hasTabs } from './constants';

export const useCurTab = () => {
  const location = useLocation();
  return getTabByLink(location.pathname);
};

export const useGoTo = () => {
  const navigate = useNavigate();
  return (key) => {
    if (!key) {
      return navigate(-1);
    }
    const curTab = getTabByKey(key);
    if (!curTab) return navigate('/');
    return navigate(curTab.link);
  };
};

export const useHasTabs = () => {
  const location = useLocation();
  return hasTabs(location.pathname);
};
