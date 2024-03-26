import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { navigateToUrl } from 'single-spa';
import { Menu } from '@mac/shared-ui';

const { Item } = Menu;

const UserMenu: FC = () => (
  <Menu>
    <Item>
      <Link to="/login" onClick={navigateToUrl}>Sair</Link>
    </Item>
  </Menu>
);

export default UserMenu;
