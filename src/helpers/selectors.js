import DayListItem from "components/DayListItem";
import createStatsCollector from "mocha/lib/stats-collector";

// use the state to return the appointmnets for a selected day
export function getAppointmentsForDay(state, day) {
  const result = [];
  const selectedDay = state.days.filter(d => d.name === day);

  if (!selectedDay[0]) {
    return result;
  };

  for (const appointment of selectedDay[0].appointments) {
    result.push(state.appointments[appointment]);
  };

  return result;
};

// return interviewers for a selected day
export function getInterviewersForDay(state, day) {
  const result = [];
  const selectedDay = state.days.filter(d => d.name === day);

  if (!selectedDay[0]) {
    return result;
  };

  for (const interview of selectedDay[0].interviewers) {
    result.push(state.interviewers[interview]);
  };

  return result;
};

//use interviewer to return the interview data
export function getInterview(state, interview) {
  if (interview) {
    const interviewer = state.interviewers[interview.interviewer];
    return { ...interview, interviewer };
  } 
  return null;
};
