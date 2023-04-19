import { useSpring, animated } from '@react-spring/web';

export interface ScrollProgressProps {
  progress: number;
}

export const ScrollProgress = ({ progress }: ScrollProgressProps) => {
  const props = useSpring({
    progress,
  });

  return (
    <div className="sticky top-0 z-10 h-1.5 w-full bg-red-900">
      <animated.div
        className="sticky top-0 z-10 h-1.5 w-full bg-red-600"
        style={{
          width: props.progress.to((x) => `${x * 100}%`),
        }}
      />
    </div>
  );
};

export default ScrollProgress;
