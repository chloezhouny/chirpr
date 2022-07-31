import { useState } from 'react';
import { Toast } from 'antd-mobile';
import Header from '@components/Header';
import Show from '@components/Show';
import SignupAPI from '@utils/SignupAPI';
import SignupFirstStep from './components/SignupFirstStep';
import SignupSecondStep from './components/SignupSecondStep';

const STEP = {
  FIRST: 1,
  SECOND: 2,
};

function Signup() {
  const [step, setStep] = useState(STEP.FIRST);
  const [userInfo, setUserInfo] = useState({});
  const handleNextStep = (data) => {
    setUserInfo(data);
    setStep(STEP.SECOND);
  };

  const handleSignupSubmit = async (password) => {
    const res = await SignupAPI({
      password,
      ...userInfo,
    });
    if (res.success) {
      Toast.show("Good job! You're all set and ready to explore the app.");
    }
    Toast.show('Oops, that definitely should not happen.');
  };

  const handleClose = () => {
    setStep(STEP.FIRST);
  };

  return (
    <div>
      <Header handleClose={handleClose} step={step} />
      <Show visible={step === STEP.FIRST}>
        <SignupFirstStep handleNextStep={handleNextStep} />
      </Show>
      <Show visible={step === STEP.SECOND}>
        <SignupSecondStep
          userInfo={userInfo}
          handleSignupSubmit={handleSignupSubmit}
          setStep={setStep}
        />
      </Show>
    </div>
  );
}

export default Signup;
