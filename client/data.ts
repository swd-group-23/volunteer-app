import { Event, History } from './types';

export const events: Event[] = [
  {
    id: '1',
    name: 'Houston Food Bank',
    description: 'Feeding the community',
    address: 'Portwall',
    city: 'Houston',
    state: 'Texas',
    zip: 77546,
    dateTime: new Date('2024-09-14'),
    skills: ['packing', 'carrying'],
    urgency: 'mild'
  },
  {
    id: '2',
    name: 'Homeless Shelter',
    description: 'Feeding the homeless',
    address: 'Portwall',
    city: 'Houston',
    state: 'Texas',
    zip: 77546,
    dateTime: new Date('2024-10-15'),
    skills: ['packing', 'carrying'],
    urgency: 'mild'
  },
  {
    id: '3',
    name: 'Public Library',
    description: 'Knowledge for the community',
    address: 'Portwall',
    city: 'Houston',
    state: 'Texas',
    zip: 77546,
    dateTime: new Date('2024-11-08'),
    skills: ['organizing', 'helping'],
    urgency: 'low'
  },
  {
    id: '4',
    name: 'Blood Drive',
    description: 'Saving lives',
    address: 'Portwall',
    city: 'Houston',
    state: 'Texas',
    zip: 77546,
    dateTime: new Date('2024-12-01'),
    skills: ['packing', 'assisting'],
    urgency: 'high'
  },
  {
    id: '5',
    name: 'Donation',
    description: 'Donate',
    address: 'Portwall',
    city: 'Houston',
    state: 'Texas',
    zip: 77546,
    dateTime: new Date('2024-12-01'),
    skills: ['packing', 'assisting'],
    urgency: 'high'
  }
];

export const history: History[] = [
{
  id: '1',
  volunteerId: '1',
  volunteerName: 'Alan',
  eventName: 'Houston Food Bank', 
  eventDescription: 'To provide food assistance to those in need and alleviate hunger in the community.',
  location: '535 Portwall St, Houston, TX 77029',
  skills: ['lift heavy objects', 'stand'], 
  urgency: 'Medium',
  eventDate: new Date('2024-03-12'),
  status: ['Participated']

},
{
  id: '2',
  volunteerId: '2',
  volunteerName: 'Alina',
  eventName: 'Homeless Shelter', 
  eventDescription: 'Providing meals, shelter, and support services for individuals experiencing homelessness.',
  location: '101 Homeless Way, Houston, TX 77001',
  skills: ['empathy', 'teamwork', 'basic problem-solving'], 
  urgency: 'High',
  eventDate: new Date('2024-04-05'),
  status: ['Participated']

}, 
{
  id: '3',
  volunteerId: '1',
  volunteerName: 'Alan',
  eventName: 'Public Library', 
  eventDescription: 'Hosting a reading event for children in the community to promote literacy and education.',
  location: '4500 Library Ln, Houston, TX 77002',
  skills: ['communication', 'patience', 'working with children'], 
  urgency: 'Low',
  eventDate: new Date('2024-04-20'),
  status: ['Canceled']

},
{
  id: '4',
  volunteerId: '3',
  volunteerName: 'Josh',
  eventName: 'Blood Drive', 
  eventDescription: 'Organizing a blood donation drive to support local hospitals and medical facilities.',
  location: '500 Donation Dr, Houston, TX 77003',
  skills: ['organization', 'attention to detail'], 
  urgency: 'High',
  eventDate: new Date('2024-05-01'),
  status: ['No show']

}

];




export const notifications = [
  {
    id: 1,
    description: 'Notification #1',
  },
  {
    id: 2,
    description: 'Notification #2',
  },
  {
    id: 3,
    description: 'Notification #3',
  }
];
