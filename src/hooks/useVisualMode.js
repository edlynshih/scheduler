import { useState } from 'react';

//handle switch between different modes and keep tracks of the previous mode
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);

    if(replace) {
      setHistory(prev => [...prev.slice(0, history.length-1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  }

  function back() {
    history.pop();

    if(history.length >= 1) {
      setMode(history[history.length-1]);
    }
  }

  return { mode, transition, back };
}