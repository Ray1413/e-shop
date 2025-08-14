// https://github.com/tanem/react-nprogress/blob/master/examples/plain-js/src/Progress.js

import React from "react";
import { useNProgress } from "@tanem/react-nprogress";

export default function Progress({
  isAnimating,
  animationDuration = 300,
  incrementDuration = 300,
  minimum = 0.35,
}: {
  isAnimating: boolean;
  animationDuration?: number;
  incrementDuration?: number;
  minimum?: number;
}) {
  const {
    animationDuration: duration,
    isFinished,
    progress,
  } = useNProgress({
    isAnimating,
    animationDuration,
    incrementDuration,
    minimum,
  });

  return (
    <Container animationDuration={duration} isFinished={isFinished}>
      <Bar animationDuration={duration} progress={progress} />
    </Container>
  );
}

const Container = ({
  animationDuration,
  isFinished,
  children,
}: {
  animationDuration: number;
  isFinished: boolean;
  children: React.ReactNode;
}) => (
  <div
    style={{
      opacity: isFinished ? 0 : 1,
      pointerEvents: "none",
      transition: `opacity ${animationDuration}ms linear`,
    }}
  >
    {children}
  </div>
);

const Bar = ({ animationDuration, progress }: { animationDuration: number; progress: number }) => (
  <div
    style={{
      background: "#29d",
      height: 2,
      left: 0,
      marginLeft: `${(-1 + progress) * 100}%`,
      position: "fixed",
      top: 0,
      transition: `margin-left ${animationDuration}ms linear`,
      width: "100%",
      zIndex: 1031,
    }}
  >
    <div
      style={{
        boxShadow: "0 0 10px #29d, 0 0 5px #29d",
        display: "block",
        height: "100%",
        opacity: 1,
        position: "absolute",
        right: 0,
        transform: "rotate(3deg) translate(0px, -4px)",
        width: 100,
      }}
    />
  </div>
);
