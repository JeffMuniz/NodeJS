import React, { FC } from 'react';
import { Button } from '@mac/shared-ui';

import useExample from './useExample.hook';

const Example: FC = () => {
  const { isLoading, doSomething } = useExample();

  return (
    <>
      App
      <br />
      <Button type="primary" loading={isLoading} onClick={doSomething}>
        Click Me
      </Button>
    </>
  );
};

export default Example;
