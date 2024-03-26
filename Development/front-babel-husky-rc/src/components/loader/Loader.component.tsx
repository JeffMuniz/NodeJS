import React, { FC } from 'react';
import { Spin as macSpin } from '@mac/shared-ui';
import styled from 'styled-components';

interface LoaderProps {
  isLoading: boolean;
}

const Spin = styled(macSpin)`
  &.ant-spin-spinning.ant-spin {
    max-height: 100%;
  }
`;

const Loader: FC<LoaderProps> = ({ children, isLoading }) => (
  <Spin spinning={isLoading} mac>
    {children}
  </Spin>
);

export default Loader;
