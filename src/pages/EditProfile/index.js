import { useState } from 'react';
import Header from '@components/Header';
import TInput from '@components/TInput';
import TButton from '@components/TButton';
import { fileByBase64 } from '@utils/';
import { useAppContext } from '@utils/context';
import { LoginAPI } from '@utils/LoginAPI';
import { useGoTo } from '@utils/hooks';
import cameraIcon from '@assets/camera.svg';
import styles from './index.module.scss';

const EditProfile = () => {
  const [store] = useAppContext();
  const [name, setName] = useState(null);
  const [avatar, setAvatar] = useState('');
  const goTo = useGoTo();

  const handleNameChange = (val) => {
    setName(val);
  };

  const handleFileChange = (e) => {
    const files = Object.values(e.target.files);
    fileByBase64(files[0]).then((res) => {
      setAvatar(res);
    });
  };

  const handleSaveProfile = async () => {
    if (name || avatar) {
      const res = await LoginAPI.updateUser(store.user?.id, {
        ...store.user,
        name: name || store.user.name,
        profile_image_url: avatar || store.user.profile_image_url,
      });
      if (res.data) {
        window.location.reload();
        goTo();
      }
    }
  };
  return (
    <>
      <Header title="Edit profile">
        <TButton handleOnClick={handleSaveProfile} isBlack>Save</TButton>
      </Header>
      <div className={styles.container}>

        <div className={styles.banner} />
        <div className={styles.avatarContainer}>
          <div className={styles.iconContainer}>
            <img className={styles.cameraIcon} src={cameraIcon} alt="" />
          </div>
          <input
            type="file"
            className={styles.uploadAvatarInput}
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
          />
          <img
            className={styles.avatar}
            src={avatar || store.user?.profile_image_url}
            alt=""
          />
        </div>
        <div className={styles.content}>
          <TInput
            label="Name"
            onChange={handleNameChange}
            value={name?.length >= 0 ? name : store.user?.name}
            length={50}
          />
        </div>

      </div>
    </>
  );
};

export default EditProfile;
