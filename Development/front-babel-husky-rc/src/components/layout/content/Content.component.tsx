

import React, { ReactNode } from 'react';
import { FC } from 'react';
import { LContent, Heart } from './Content.style';

const Content: FC<{ children: ReactNode }> = ({ children }) => (
  <LContent>
    <Heart />
    { children }
  </LContent>
);

export default Content;
