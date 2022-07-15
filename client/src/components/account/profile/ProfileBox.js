import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUploadUser, uploadUser } from "../../../_actions/user_action";

import { IoSettingsSharp, IoTrash } from "react-icons/io5";
import { Pic, ProfileContainer, Image, TextBox, UploadButton, DeleteButton } from "../../../styles/account/ProfileStyle";

function ProfileBox({ user }) {
  const dispatch = useDispatch();
  const file = useRef(null);
  const form = useRef(null);
  
  //파일 서버로 전송
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

  //프로필 이미지 파일 업로드
  const handleChange = ()=> {
    //input[type=file]이 upload 버튼의 역할을 대신 하기 위해 
    //파일 업로드시 submit 이벤트 발생
    form.current.dispatchEvent(new Event('submit'));
  };

  //프로필 이미지 삭제
  const handleDelete = ()=> {
    dispatch(deleteUploadUser())
    .then(response=> {
      const data = response.payload;
      if(data.success) {
        alert("Successfully deleted!");
        window.location.replace("/account/profile");
      } else {
        alert(data.err);
      }
    });
  };

  return (
    <form 
      ref={form} 
      onSubmitCapture={handleSubmit}
    >
      <ProfileContainer>
          <Pic default={true}>
            <Image Src={user && user.profileImage} />
            {(user && user.profileImage) &&
            <DeleteButton 
              type="button"
              aria-label="Delete"
              onClick={handleDelete}
            >
              <IoTrash />
            </DeleteButton>
            }
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