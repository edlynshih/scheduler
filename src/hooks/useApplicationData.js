import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(intial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  //set the current day
  const setDay = day => setState({ ...state, day });

  //using axios to get data from the database to set up the initial state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers ")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  //Add new interview obj in appointments and make a PUT req to update the local state
  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    //update the appointments object with the appointment obj above
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => { setState({ ...state, appointments }) })

  };

  //Remove the interview obj from the appointments and make a DELETE req to update local state
  const cancelInterview = id => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => { setState({ ...state, appointments }) })

  };

  return { state, setDay, bookInterview, cancelInterview };

}