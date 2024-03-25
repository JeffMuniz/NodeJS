
import styled from 'styled-components';

import { PageSubtitle, PageTitle } from '~/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: -15px;
`;

export const HPageTitle = styled(PageTitle)`
  margin-bottom: 15px;
`;

export const HPageSubtitle = styled(PageSubtitle)`
  margin-bottom: 30px;
`;
