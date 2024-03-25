import styled, { css } from 'styled-components';
import { LoadingButton, Radio } from '~/components';
import { PageSubtitle, Spacer } from '~/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const FPageSubtitle = styled(PageSubtitle)`
  margin-bottom: 20px;
`;

export const MotherNameRadioInput = styled(Radio)<{ isLast?: boolean; }>`
  margin-bottom: 15px;

  ${({ isLast }) => isLast && css`
    margin-bottom: 50px;
  `}
`;

export const BirthdayRadioInput = styled(MotherNameRadioInput)`
  &:last-child {
    margin-bottom: 0;
  }
`;

export const FSpacer = styled(Spacer)``;

export const SubmitButton = styled(LoadingButton)``;
