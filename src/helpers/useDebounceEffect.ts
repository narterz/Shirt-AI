import { useEffect, DependencyList } from 'react';

//The cropping of an image will require frequent updates so it needs to be debounced to imporve performance

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList,
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn();
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps || []);
}