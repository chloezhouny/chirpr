import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  PullToRefresh, InfiniteScroll, SpinLoading, Toast,
} from 'antd-mobile';
import {
  List,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
} from 'react-virtualized';
import VerticalArrowIcon from '@assets/vertical-arrow.svg';
import TweetCard from '@components/TweetCard';
import { TweetAPI } from '@utils/TweetAPI';
import styles from './index.module.scss';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 50,
});

const InfiniteScrollContent = ({ hasMore }) => {
  if (hasMore) {
    return (
      <SpinLoading />
    );
  }
  return (<span>No more content</span>);
};

InfiniteScrollContent.propTypes = {
  hasMore: PropTypes.shape({
    hasMore: PropTypes.bool,
  }).isRequired,
};

const statusRecord = {
  pulling: (<img className={styles.pullingIcon} src={VerticalArrowIcon} alt="pulling" />),
  canRelease: (<img className={styles.canReleaseIcon} src={VerticalArrowIcon} alt="canRelease" />),
  refreshing: (
    <SpinLoading className={styles.refreshingIcon} style={{ '--size': '26px' }} />
  ),
  complete: 'Refreshed',
};

const Tweets = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const showToastMsg = async () => {
    const toastMsg = sessionStorage.getItem('toastMsg');
    if (toastMsg !== '') {
      await Toast.show(toastMsg);
      sessionStorage.setItem('toastMsg', '');
    }
  };

  useEffect(() => {
    const init = async () => {
      const res = await TweetAPI.getFeeds();
      setData(res);
      showToastMsg();
    };
    init();
  }, []);

  const noRowsRenderer = () => (
    <div className={styles.noRowIconContainer}>
      <SpinLoading className={styles.noRowIcon} />
    </div>
  );
  const rowRenderer = ({
    key, style: st, index, parent,
  }) => (
    <CellMeasurer
      cache={cache}
      key={key}
      columnIndex={0}
      rowIndex={index}
      parent={parent}
    >
      {({ registerChild }) => (
        <div style={{ ...st }} key={key} ref={registerChild}>
          <TweetCard
            dataSrc={data[index]}
          />
        </div>
      )}
    </CellMeasurer>
  );
  const handleLoadMore = async () => {
    const res = await TweetAPI.getFeeds();
    setData((feeds) => [...feeds, ...res]);
    if (res.length > 0) {
      setHasMore(false);
    }
  };
  return (
    <>
      <Helmet><title>Home / Chirpr</title></Helmet>
      <div className={styles.container}>
        <PullToRefresh
          onRefresh={async () => {
            const res = await TweetAPI.getFeeds();
            setData((feeds) => [...feeds, ...res]);
          }}
          renderText={(status) => <div>{statusRecord[status]}</div>}
        >
          <WindowScroller>
            {({
              width,
              height,
              isScrolling,
              registerChild,
              onChildScroll,
              scrollTop,
            }) => (
              <div ref={registerChild}>
                <List
                  deferredMeasurementCache={cache}
                  autoHeight
                  height={height}
                  width={width}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  scrollTop={scrollTop}
                  overscanRowCount={2}
                  noRowsRenderer={noRowsRenderer}
                  rowCount={data.length}
                  rowHeight={cache.rowHeight}
                  rowRenderer={rowRenderer}
                />
              </div>
            )}
          </WindowScroller>
        </PullToRefresh>
        <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore}>
          <InfiniteScrollContent hasMore={hasMore} />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Tweets;
