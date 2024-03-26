import React, { FC } from 'react';
import { Dropdown, Avatar } from '@mac/shared-ui';

import UserMenu from './UserMenu.component';

const UserAvatar: FC = () => (
  <Dropdown overlay={UserMenu}>
    <Avatar size="large" icon="user" />
  </Dropdown>
);

export default UserAvatar;
