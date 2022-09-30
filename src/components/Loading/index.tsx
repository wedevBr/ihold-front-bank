import { Spinner, SpinnerProps } from '@chakra-ui/react';

interface LoadingProps extends SpinnerProps {
  color?: string;
}

export function Loading({ color, ...rest }: LoadingProps) {
  return (
    <Spinner
      {...rest}
      thickness="3px"
      speed="0.88s"
      emptyColor="gray.200"
      color={color || '#2E4EFF'}
      w="25px"
    />
  );
}
