
import React, { FC } from 'react';
import { Layout as AntLayout } from '@mac/shared-ui';

import Content from './content/Content.component';
import Header from '../header/Header.component';

const Layout: FC = ({ children }) => (
  <AntLayout>
    <Header />
    <AntLayout>
      <Content>{children}</Content>
    </AntLayout>
  </AntLayout>
);

export default Layout;
