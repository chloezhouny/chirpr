// import { useEffect } from 'react';
import { TabBar } from 'antd-mobile';
// import { useAppContext } from '@utils/context';
import { useCurTab, useGoTo } from '@utils/hooks';
// import { tabs, getTabByKey } from '@utils/constants';
import { tabs } from '@utils/constants';
import styles from './index.module.scss';

const BottomBar = () => {
  // const [store, setStore] = useAppContext();
  const curTab = useCurTab();
  const goTo = useGoTo();

  // useEffect(() => {
  //   if (curTab) {
  //     setStore({
  //       title: curTab.title,
  //     });
  //   }
  // }, []);
  const handleTabItemChange = (key) => {
    // const newTab = getTabByKey(key);
    // setStore({ title: newTab.title });
    // console.log(store);
    goTo(key);
  };

  if (curTab.hideAppHeader) {
    return null;
  }
  return (
    <div className={styles.container}>
      <TabBar onChange={handleTabItemChange}>
        {tabs.map((item) => (
          item.isMenu && <TabBar.Item key={item.key} icon={item.icon} />
        ))}
      </TabBar>
    </div>
  );
};

export default BottomBar;
