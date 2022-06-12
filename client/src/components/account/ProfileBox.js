import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { uploadUser } from "../../_actions/user_action";
import { IoSettingsSharp } from "react-icons/io5";
import { Pic, ProfileContainer, Image, TextBox, UploadButton } from "../../styles/account/ProfileStyle";

function ProfileBox({ user }) {
  const dispatch = useDispatch();
  const file = useRef(null);
  const form = useRef(null);
  
  const handleSubmit = (e)=> {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", file.current.files[0]);
    formData.append("username", user.username);

    dispatch(uploadUser(formData))
    .then(response=> {
      const data = response.payload;
      if(data.success) {
        alert("You have successfully updated your profile image!");
        window.location.replace("/account/profile");
      } else {
        alert(data.err);
      }
    });
  };

  const handleChange = ()=> {
    //input[type=file]이 upload 버튼의 역할을 대신 하기 위해 
    //파일 업로드시 submit 이벤트 발생
    form.current.dispatchEvent(new Event('submit'));
  };

  return (
    <form 
      ref={form} 
      onSubmitCapture={handleSubmit}
    >
      <ProfileContainer>
          <Pic default={true}>
            <Image Src={user && user.profileImage} />
          </Pic>
          <TextBox>
            <h2>{user && user.username}</h2>
            <UploadButton htmlFor="profileUpload">
              <span>Change profile image</span>
              <IoSettingsSharp />
            </UploadButton>
            <input 
              type="file" 
              name="file"
              id="profileUpload"
              ref={file}
              className="hidden"
              onChange={handleChange} 
            />
          </TextBox>
      </ProfileContainer>
    </form>
  )
}

export default ProfileBox;