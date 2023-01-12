import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(intial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  //set the current day
  const setDay = day => setState({ ...state, day });

  //using axios to get data from the database to set up the initial state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

 
  //Update spots remaining
  const updateSpots = (day, increment) => {

    //make a copy of days array so we are not making changes directly to the state
    const days = state.days;
    let dayIndex= -1;

    //find the index of day and return the individual day object
    const dayToUpdate = days.find((item, index) => {
      if (item.name === day) {
        dayIndex = index;
        return item;
      }
    })

    if (increment) {
      dayToUpdate.spots++
    } else {
      dayToUpdate.spots--
    }
    //replace the existing day object with the new day obj (dayToUpdate)
    days.splice(dayIndex, 1, dayToUpdate);
    //returns an array of days
    return days;
  }

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
      .then(() => { setState({ ...state, appointments, days: updateSpots(state.day, false) }) })
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
      .then(() => { setState({ ...state, appointments, days: updateSpots(state.day, true) }) })

  };

  return { state, setDay, bookInterview, cancelInterview };

}