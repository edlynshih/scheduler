# Interview Scheduler

Interview Scheduler is a single-page application that allows users to book interviews with mentors. Each appointment is scheduled an hour, between 12PM to 5PM, Monday to Friday. The user can view the entire schedule on any day of the week. When creating a new appointment, the user can enter a student name and select an interviewer from a given list. Once saved, the user can edit or delete the appointment.

Built with React on the front-end.

## Setup

Install dependencies with `npm install`.

## Getting Started
1. Fork this repository, then clone your fork of this repository.
2. Fork and clone the [scheduler-api repository] (https://github.com/edlynshih/scheduler-api) that contains the database.
3. Install dependencies in both folders using the `npm install` command.
4. Open two terminals, one for the scheduler and the second for scheduler-api. 
5. Start both servers using the `npm start` command. The app will be served at <http://localhost:8080/>.
5. Go to <http://localhost:8000/> in your browser.

## Running Jest Test Framework

```
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
