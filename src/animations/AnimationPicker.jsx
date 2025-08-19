import React, { useEffect } from "react";
import Confetti from "react-confetti";
import Lottie from "react-lottie-player";
import dogAnimation from "../animations/RocketDog.json";
import clapAnimation from "../animations/Clap.json";
import violinAnimation from "../animations/violin.json";

const animations = [
  { type: "confetti" },
  { type: "lottie", data: dogAnimation, width: 300, height: 300 },
  { type: "lottie", data: clapAnimation, width: 300, height: 300 },
  { type: "lottie", data: violinAnimation, width: 300, height: 300 },
];

export default function AnimationPicker({ trigger }) {
  const [animation, setAnimation] = React.useState(null);

  useEffect(() => {
    if (trigger) {
      const random = animations[Math.floor(Math.random() * animations.length)];
      setAnimation(random);
      const timeout = setTimeout(() => setAnimation(null), 3000); // show 3s
      return () => clearTimeout(timeout);
    }
  }, [trigger]);

  if (!animation) return null;

  if (animation.type === "confetti") {
    return <Confetti recycle={false} numberOfPieces={150} />;
  }

  if (animation.type === "lottie") {
    return (
      <Lottie
        loop={false}
        play
        animationData={animation.data}
        style={{ width: animation.width, height: animation.height }}
      />
    );
  }

  return null;
}
