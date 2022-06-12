import React from 'react';

import { Container } from "../../styles/account/ProfileStyle";

import ProfileBox from './ProfileBox';
import ProfileForm from './ProfileForm';


function Profile({ user }) {
  return (
    <Container>
      <ProfileBox user={user} />
      <ProfileForm user={user} />
    </Container>
  )
}

export default Profile;