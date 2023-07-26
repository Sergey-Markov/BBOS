import { ReactNode } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const scrollToComponentHandler = (
  node: ReactNode,
  scrollRef: React.RefObject<KeyboardAwareScrollView>
) => {
  if (scrollRef.current && node) {
    scrollRef.current.scrollToFocusedInput(node, 120);
  }
};
