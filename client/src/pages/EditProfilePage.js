import React from 'react';
import { useOutletContext } from 'react-router-dom';

import { Container } from "../styles/account/ProfileStyle";

import ProfileBox from '../components/account/profile/ProfileBox';
import ProfileForm from '../components/account/profile/ProfileForm';

function EditProfilePage() {
  const { user } = useOutletContext();
  
  return (
    <Container>
      <ProfileBox user={user} />
      <ProfileForm user={user} />
    </Container>
  )
}

export default EditProfilePage;