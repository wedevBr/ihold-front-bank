import { extendTheme } from '@chakra-ui/react';
import Badge from './components/Badge';
import colors from './foundations/colors';

export const theme = extendTheme({
  colors,
  components: {
    Badge,
  },
});
