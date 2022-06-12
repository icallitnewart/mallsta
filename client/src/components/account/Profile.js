import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkEmailUser, editUser } from '../../_actions/user_action';
import { IoSettingsSharp } from "react-icons/io5";
import useInputs from '../../hooks/useInputs';

import { Container, Pic, ProfileBox, Image, TextBox, UploadButton, ErrMsg, Td } from "../../styles/account/ProfileStyle";
import { Table, Tr, Button } from "../../styles/account/FormStyle";


function Profile({ user }) {
  const dispatch = useDispatch();
  const initialValue = {
    username : "",
    passwordCurrent : "",
    passwordNew : "",
    passwordConfirm : "",
    email : "",
    phone : "",
    address1 : "",
    address2 : ""
  };
  const [img, setImg]=useState("");

  const [ values, handleChange, setValues ] = useInputs(initialValue);
  const [ err, setErr ] = useState({});

  //폼 유효성 검사
  const checkForm = (body)=> {
    let messages = {};
    const {
      passwordCurrent, 
      passwordNew, 
      passwordConfirm,
      email,
      phone
    } = body;

    //이메일 빈칸 체크
    if(!email) { 
      messages.email = "Please fill in the blank.";
    } else {
      //이메일 형식 체크 
      if(!/\S+@\S+\.\S+/.test(email)) {
        messages.email = "Please enter a proper email address.";
      } else {
        //이메일 중복 체크
        if(user.email !== email) {
          dispatch(checkEmailUser(body))
          .then(response=> {
            if(response.payload.isExist) {
              const message = `${response.payload.message} Please try another one.`;

              setErr(prev=> ({ ...prev, email : message }));
            }
          });
        }
      }
    }
    
    //전화번호 검사
    if(phone) {
      //최소 길이 체크
      const minLen = 9;
      if(phone.length < minLen) {
        messages.phone = `Requires ${minLen} numbers at minimum.`;
      }
      //숫자 체크
      if(!/^[0-9]+$/.test(phone)) {
        messages.phone = "Please enter numbers only.";
      }
    }

    //비밀번호 검사
    if(passwordNew) {
      //현재 비밀번호 빈칸 체크
      if(!passwordCurrent) {
        messages.passwordCurrent = "Please enter a current password.";
      }
      //최소 길이 체크
      const minLen = 8;
      if(passwordNew.length < minLen) {
        messages.passwordNew = `Requires ${minLen} letters at minimum.`;
      }
      //비밀번호 확인과 일치하는지 확인
      if(passwordNew !== passwordConfirm) {
        messages.passwordConfirm = "Please enter the same password as above.";
      }
    }

    return messages;
  };

  const handleSubmit = (e)=> {
    e.preventDefault();

    const body = { ...values };
    const errors = (Object.keys(checkForm(body)).length > 0) && checkForm(body);

    //폼 유효성 검사
    if(errors) {
      return setErr(errors);
    } else {
      //에러 없으면 에러 메시지 삭제
      setErr({});

      //회원정보 업데이트
      dispatch(editUser(body))
      .then(response=> {
        if(!response.payload.success) {
          setErr(prev=> ({
            ...prev, 
            passwordCurrent : response.payload.message
          }));
        } else {
          alert("Your personal details have been successfully updated!");

          window.location.replace("/account/profile");
        }
      });
    }
  };

  //첫 로드시 불러온 유저 데이터 넣기
  useEffect(()=> {
    if(user) {
      const { username, email, phone, address } = user;
      const dataValue = { ...initialValue };

      dataValue.username = username;
      dataValue.email = email;
      dataValue.address1 = address[0];
      dataValue.address2 = address[1];
      dataValue.phone = phone;
      setImg(user.profileImage);
      setValues(dataValue);
    }
  }, [user]);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <ProfileBox>
          <Pic default={true}>
            <Image Src={user && user.profileImage} />
            {/* <img src={process.env.PUBLIC_URL + img} alt="" /> */}
          </Pic>
          <TextBox>
            <h2>{user && user.username}</h2>
            <UploadButton type="button">
              <span>Change profile image</span>
              <IoSettingsSharp />
            </UploadButton>
          </TextBox>
        </ProfileBox>
        <Table>
          <tbody>
            <Tr>
              <th>
                <label htmlFor="username">
                  Username
                </label>
              </th>
              <Td>
                <input 
                  type="text" 
                  value={values && values.username}
                  onChange={handleChange}
                  id="username"
                  name="username"
                  disabled
                />
              </Td>
            </Tr>
            <Tr>
              <th>
                <label htmlFor="passwordCurrent">
                  Current Password
                </label>
              </th>
              <Td>
                <input 
                  type="password" 
                  value={values && values.passwordCurrent}
                  onChange={handleChange}
                  placeholder="Current Password"
                  id="passwordCurrent"
                  name="passwordCurrent"
                />
                <ErrMsg>{err && err.passwordCurrent}</ErrMsg>
              </Td>
            </Tr>
            <Tr>
              <th>
                <label htmlFor="passwordNew">
                  New Password
                </label>
              </th>
              <Td>
                <input 
                  type="password" 
                  value={values && values.passwordNew}
                  onChange={handleChange}
                  placeholder="Password (over 8 letters)"
                  id="passwordNew"
                  name="passwordNew"
                />
                <ErrMsg>{err && err.passwordNew}</ErrMsg>
              </Td>
            </Tr>
            <Tr>
              <th>
                <label htmlFor="passwordConfirm">
                  Confirm Password
                </label>
              </th>
              <Td>
                <input 
                  type="password" 
                  values={values && values.passwordConfirm}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                />
                <ErrMsg>{err && err.passwordConfirm}</ErrMsg>
              </Td>
            </Tr>
            <Tr>
              <th>
                <label htmlFor="email">
                  Email
                </label>
              </th>
              <Td>
                <input 
                  type="email"
                  value={values && values.email}
                  onChange={handleChange}
                  id="email"
                  name="email" 
                />
                <ErrMsg>{err && err.email}</ErrMsg>
              </Td>
            </Tr>
            <Tr>
              <th>
                <label htmlFor="phone">
                  Phone Number
                </label>
              </th>
              <Td>
                <input 
                  type="text" 
                  value={values && values.phone}
                  onChange={handleChange}
                  placeholder="Phone Number (number only)"
                  id="phone"
                  name="phone" 
                />
                <ErrMsg>{err && err.phone}</ErrMsg>
              </Td>
            </Tr>
            <Tr>
              <th>
                <label htmlFor="address">
                  Shipping Address
                </label>
              </th>
              <Td>
                <input 
                  type="text" 
                  value={values && values.address1}
                  onChange={handleChange}
                  placeholder="Address Line 1"
                  id="address"
                  name="address1" 
                  style={{ margin : "15px 0px 10px"}}
                />
                <input 
                  type="text" 
                  value={values &&  values.address2 }
                  onChange={handleChange}
                  placeholder="Address Line 2 (Optional)"
                  name="address2" 
                  style={{ marginBottom : "15px"}}
                />
              </Td>
            </Tr>
            <Tr style={{ textAlign: "right" }}>
              <th colSpan={2} style={{ width: "100%" }}>
                <Button 
                  type="reset"
                  color={"#ff5e62"} 
                  bgColor={"#fff"}
                >Cancel</Button>
                <Button 
                  type="submit"
                  color={"#fff"} 
                  bgColor={"#ff5e62"}
                >Save</Button>
              </th>
            </Tr>
          </tbody>
        </Table>
      </form>
    </Container>
  )
}

export default Profile;