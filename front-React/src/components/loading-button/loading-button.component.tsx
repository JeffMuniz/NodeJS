
import { FC, MouseEvent } from 'react';

import {
 Label, Loading, Wrapper,
} from './loading-button.component.styles';

const LoadingButton: FC<LoadingButton.Props> = ({
  children,
  className,
  disabled,
  id,
  isLoading,
  onClick,
  type,
}) => {

  const handleLabelClick = (event: MouseEvent) => {
    event.stopPropagation();
    onClick(event);
  };

  return (
    <Wrapper
      className={className}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
      id={id}
    >
      <Label htmlFor={id} extraMargin={isLoading} onClick={handleLabelClick}>
        {children}
      </Label>
      <Loading show={isLoading} />
    </Wrapper>
  );
};

export default LoadingButton;
