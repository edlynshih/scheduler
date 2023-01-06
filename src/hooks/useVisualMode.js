import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //handle switch between different modes and keep tracks of the previous mode
  function transition(newMode, replace = false) {
    setMode(newMode);
    //if replace is true, remove the last element in the array
    replace ? setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]) : setHistory(prev => [...prev, newMode]);
  }

  function back() {

    if (history.length > 1) {
      // Making a new copy of the history array
      const newHistory = [...history];
      //Remove the last element from the array
      newHistory.pop();
      //set mode to the last element in the hsitory array
      setMode(newHistory[newHistory.length - 1]);
      //set history to the array that doesnt have the last element
      setHistory(newHistory);
    }
  };

  return { mode, transition, back };
}