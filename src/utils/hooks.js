import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, generatePath } from 'react-router-dom';
import { getTabByLink, getTabByKey, hasTabs } from './constants';

export const useCurTab = () => {
  const location = useLocation();
  return getTabByLink(location.pathname) || {};
};

export const useGoTo = () => {
  const navigate = useNavigate();
  return (key, params, state) => {
    if (!key) {
      return navigate(-1);
    }
    const curTab = getTabByKey(key);
    if (!curTab) return navigate('/');
    let { link } = curTab;
    if (params) {
      link = generatePath(curTab.link, params);
    }
    return navigate(link, state);
  };
};

export const useHasTabs = () => {
  const location = useLocation();
  return hasTabs(location.pathname);
};

/**
 * my customized pulltorefresh hook, not used in this app:
 * 1. scrollTop === 0 document.documentElement.scrollTop === 0;
   2. touchstart touchmove touchend
   3. Y: touch move distance from page top
   4. maxY: max touch move distance from page top
 */
const MAXY = 100;

export const usePullToRefresh = () => {
  const y = useRef(0);
  const [tip, setTip] = useState('');

  useEffect(() => {
    window.ontouchstart = (e) => {
      if (document.documentElement.scrollTop === 0) {
        y.current = e.touches[0].pageY;
      }
    };

    window.ontouchmove = (e) => {
      if (document.documentElement.scrollTop === 0) {
        if (e.touches[0].pageY - y.current > MAXY) {
          setTip('release to refresh');
          return;
        }
        if (e.touches[0].pageY - y.current > 0) {
          setTip('pull to refresh');
        }
      }
    };
    return () => {
      window.ontouchstart = null;
      window.ontouchmove = null;
    };
  }, []);

  useEffect(() => {
    window.ontouchend = () => {
      if (document.documentElement.scrollTop === 0) {
        if (tip === 'release to refresh') {
          setTip('loading...');
          setTimeout(() => {
            setTip('refreshed');
            setTimeout(() => {
              setTip('');
            }, 500);
          }, 1000);
          return;
        }
        setTip('');
      }
    };
    return () => {
      window.ontouchend = null;
    };
  }, [tip]);

  return tip;
};

/**
 * my customized infiniteScroll hook, not used in this app:
 * when to getFeeds: 50px before scrolled to content bottom
 * - scrolled to content bottom condition: scrollTop + browser height = content height;
 *   1. document.documentElement.scrollTop
     2. browser height: document.documentElement.clientHeight
     3. content height: document.body.scrollHeight
*/
const OFFSET = 50;
export const useInfiniteScroll = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.onscroll = () => {
      if (loading) {
        return;
      }
      const { clientHeight, scrollTop } = document.documentElement;
      const { scrollHeight } = document.body;
      if (scrollTop + clientHeight >= scrollHeight - OFFSET) {
        setLoading(true);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        console.log('loading finished');
        setLoading(false);
      }, 2000);
    }
  }, [loading]);
  return loading;
};
