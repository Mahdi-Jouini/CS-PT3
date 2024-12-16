import { Fragment } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

import { Box, Button, IconButton } from '@mui/material';

const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.color || '#3174ad',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style,
    };
  };
  const CustomToolbar = (toolbar) => {
    return (
      <Box sx={{ width: '700px', display:'flex', justifyContent:'center', alignItems: 'center', }}> 
        <Box sx={{justifySelf: 'center', p: 2}}>    
          <IconButton onClick={() => toolbar.onNavigate('PREV')}>
            <KeyboardArrowLeftRoundedIcon />
          </IconButton>
          <Button onClick={() => toolbar.onNavigate("TODAY")} >{toolbar.label}</Button>
          <IconButton onClick={() => toolbar.onNavigate('NEXT')}>
            <KeyboardArrowRightRoundedIcon />
          </IconButton>
        </Box> 
        <Box sx={{ml: 'auto', p: 2, display: 'flex', gap: 3}}> 
          <Button disableElevation size='small' variant='contained' onClick={() => toolbar.onView('day')} >day</Button>
          <Button disableElevation size='small' variant='contained' onClick={() => toolbar.onView('week')} >week</Button>
        </Box>
      </Box>
    );
  };

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: '',
    start: new Date(2024, 12, 6, 8, 0, 0),
    end: new Date(2024, 12, 6, 19, 0, 0),
  },
  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2024, 12, 7, 8, 0, 0),
    end: new Date(2024, 12, 7, 19, 0, 0),
  },
  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2024, 8, 6, 0, 0, 0),
    end: new Date(2024, 8, 13, 0, 0, 0),
  },
  {
    id: 4,
    title: 'Some Event',
    start: new Date(2024, 1, 9, 0, 0, 0),
    end: new Date(2024, 1, 9, 0, 0, 0),
  },
];

export default function ProviderAvailability() {
  function decrementMonths(events) {
    return events.map(event => ({
      ...event,
      start: new Date(
        event.start.getFullYear(),
        event.start.getMonth() - 1,
        event.start.getDate(),
        event.start.getHours(),
        event.start.getMinutes(),
        event.start.getSeconds()
      ),
      end: new Date(
        event.end.getFullYear(),
        event.end.getMonth() - 1,
        event.end.getDate(),
        event.end.getHours(),
        event.end.getMinutes(),
        event.end.getSeconds()
      ),
    }));
  }

  const adjustedEvents = decrementMonths(events);
  return (
    <Fragment>
      <Box style={{ height: '600px' }}>
        <Calendar
          defaultView={Views.WEEK}
          events={adjustedEvents}
          localizer={localizer}
          eventPropGetter={eventStyleGetter}
          selectable
          messages={{
            today: "Aujourd'hui",
            previous: 'Précédent',
            next: 'Suivant',
            week: 'Semaine',
            day: 'Jour',
            month: 'Mois',
          }}
          components={{
            toolbar: CustomToolbar,
          }}
        />
      </Box>
    </Fragment>
  );

  
}
