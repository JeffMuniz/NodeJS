
import { FC } from 'react';
import { Icon, Wrapper } from './back-button.component.styles';

const BackButton: FC<BackButton.Props> = ({
  onClick,
  className,
}) => (
  <Wrapper className={className} onClick={onClick}>
    <Icon />
  </Wrapper>
);

export default BackButton;
