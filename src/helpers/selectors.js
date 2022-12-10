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
