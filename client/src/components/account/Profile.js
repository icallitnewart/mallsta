import React, { useEffect } from 'react';
import { IoSettingsSharp } from "react-icons/io5";
import useInputs from '../../hooks/useInputs';

import { Container, Pic, ProfileBox, Image, TextBox, UploadButton } from "../../styles/account/ProfileStyle";
import { Table, Tr, Button } from "../../styles/account/FormStyle";


function Profile({ user }) {
  const initialValue = {
    username : "",
    password : "",
    password2 : "",
    email : "",
    phNum : "",
    address : "",
  };

  const [ values, handleChange, setValues ] = useInputs(initialValue);

  //첫 로드시 불러온 유저 데이터 넣기
  useEffect(()=> {
    if(user) {
      const { username, email } = user;
      const dataValue = { ...initialValue };

      dataValue.username = username;
      dataValue.email = email;

      setValues(dataValue);
    }
  }, [user]);

  return (
    <Container>
      <form>
        <ProfileBox>
          <Pic>
            <Image />
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
              <td>
                <input 
                  type="text" 
                  value={values && values.username}
                  onChange={handleChange}
                  id="username"
                  name="username"
                  disabled
                />
              </td>
            </Tr>
            <Tr>
              <th>
                <label htmlFor="password">
                  Password
                </label>
              </th>
              <td>
                <input 
                  type="password" 
                  onChange={handleChange}
                  placeholder="Password (over 8 letters)"
                  id="password"
                  name="password"
                />
              </td>
            </Tr>
            <Tr>
              <th>
                <label htmlFor="password2">
                  Confirm Password
                </label>
              </th>
              <td>
                <input 
                  type="password" 
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  id="password2"
                  name="password2"
                />
              </td>
            </Tr>
            <Tr>
              <th>
                <label htmlFor="email">
                  Email
                </label>
              </th>
              <td>
                <input 
                  type="email"
                  value={values && values.email}
                  onChange={handleChange}
                  id="email"
                  name="email" 
                />
              </td>
            </Tr>
            <Tr>
              <th>
                <label htmlFor="phNum">
                  Phone Number
                </label>
              </th>
              <td>
                <input 
                  type="number" 
                  //value={values && values.phNum}
                  onChange={handleChange}
                  placeholder="Phone Number (number only)"
                  id="phNum"
                  name="phNum" 
                />
              </td>
            </Tr>
            <Tr>
              <th>
                <label htmlFor="address">
                  Shipping Address
                </label>
              </th>
              <td>
                <input 
                  type="text" 
                  //value={values && values.address}
                  onChange={handleChange}
                  placeholder="Address Line 1"
                  id="address"
                  name="address" 
                  style={{ margin : "15px 0px 10px"}}
                />
                <input 
                  type="text" 
                  //value={values && values.address}
                  //onChange={handleChange}
                  placeholder="Address Line 2 (Optional)"
                  name="address2" 
                  style={{ marginBottom : "15px"}}
                />
              </td>
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