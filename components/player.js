import React, { useState, useEffect } from "react";
import useSound from "use-sound";

const Player = ({ url }) => {

    const [play] = useSound(url)

  return (
    <div>
      <button onClick={play}>play</button>
    </div>
  );
};

export default Player;