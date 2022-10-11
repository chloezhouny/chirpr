import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@utils/context';
import SignupAPI from '@utils/SignupAPI';
import Show from '@components/Show';
import SignupFirstStep from './components/SignupFirstStep';
import SignupSecondStep from './components/SignupSecondStep';
import styles from './index.module.scss';

const STEP = {
  FIRST: 1,
  SECOND: 2,
};

function Signup() {
  const [userInfo, setUserInfo] = useState({});

  const [store, setStore] = useAppContext();
  const navigate = useNavigate();
  const setSigupFirstStepStore = () => {
    setStore({
      handleClose: () => navigate('/login'),
      step: STEP.FIRST,
    });
  };

  useEffect(() => {
    if (store.step === null || STEP.FIRST) {
      setSigupFirstStepStore();
    }
    if (store.step === STEP.SECOND) {
      setStore({
        handleClose: setSigupFirstStepStore,
        step: store.step,
      });
    }
  }, [store.step]);

  const handleNextStep = (data) => {
    setUserInfo(data);
    setStore({
      step: STEP.SECOND,
    });
  };

  const handleSignupSubmit = async (password) => {
    const res = await SignupAPI({
      password,
      name: '',
      ...userInfo,
      profile_image_url: 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640',
    });
    if (res.success) {
      Toast.show("Good job! You're all set and ready to explore the app.");
      navigate('/login');
    }
    Toast.show('Oops, that definitely should not happen.');
  };

  return (
    <>
      <Helmet><title>Sign up for Twittuer / Twittuer</title></Helmet>
      <div className={styles.container}>
        {/*      <Header handleClose={handleClose} step={step} /> */}
        <Show visible={store.step === STEP.FIRST}>
          <SignupFirstStep handleNextStep={handleNextStep} />
        </Show>
        <Show visible={store.step === STEP.SECOND}>
          <SignupSecondStep
            userInfo={userInfo}
            setSigupFirstStepStore={setSigupFirstStepStore}
            handleSignupSubmit={handleSignupSubmit}
          />
        </Show>
      </div>
    </>
  );
}

export default Signup;
