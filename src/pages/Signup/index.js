import { useState } from 'react';

import Header from '@components/Header';
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

  const handleSignupSubmit = (password) => {
    console.log({
      password,
      ...userInfo,
    });
  };
  return (
    <div>
      <Header />
      { step === STEP.FIRST && <SignupFirstStep handleNextStep={handleNextStep} /> }
      { step === STEP.SECOND
        && <SignupSecondStep userInfo={userInfo} handleSignupSubmit={handleSignupSubmit} />}
    </div>
  );
}

export default Signup;
