import { useEffect, useRef, useState } from "react";

type UseRevealOptions = {
  rootMargin?: string;
  threshold?: number;
};

export const useReveal = <T extends Element>(options?: UseRevealOptions) => {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: options?.rootMargin ?? "0px 0px -10% 0px",
        threshold: options?.threshold ?? 0.15,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options?.rootMargin, options?.threshold]);

  return { ref, isVisible };
};
