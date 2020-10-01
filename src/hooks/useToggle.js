import { useState } from "react";

function useToggle(initialVal = false) {
  // call useState
  const [state, setState] = useState(initialVal);
  const toggle = () => {
    setState(!state);
  };
  // return a piece with to call state and a func to toggle it
  return [state, toggle];
}

export default useToggle;
