import { User, Event } from './types';
export const states = [
  { value: 'TX'},
  { value: 'CA'},
  { value: 'NY'},
  // Add more states as needed
];

// Skills options for multi-select dropdown
export const skills = [
  { value: 'idk'},
  { value: 'idk2'}
  // Add more skills as needed
];

export const urgencys = [
  { value: 'low'},
  { value: 'medium'},
  { value: 'high'}
  // Add more skills as needed
];

export const volunteers: User[] = [
  {
    id: '1',
    name: 'Alan',
    email: 'aj@gmail.com',
    password: 'test',
    address1: '123',
    address2: 'drive',
    city: 'houston',
    state: 'tx',
    zip: 1234,
    skills: ['sleep', 'eat'],
    preferences: 'morning',
    availability: [new Date('2024-09-12'), new Date('2024-09-14')]
  },
  {
    id: '2',
    name: 'Alina',
    email: 'aj@gmail.com',
    password: 'test',
    address1: '123',
    address2: 'drive',
    city: 'houston',
    state: 'tx',
    zip: 1234,
    skills: ['code', 'review'],
    preferences: 'evening',
    availability: [new Date('2024-09-14'), new Date('2024-10-07')]
  },
  {
    id: '3',
    name: 'Josh',
    email: 'aj@gmail.com',
    password: 'test',
    address1: '123',
    address2: 'drive',
    city: 'houston',
    state: 'tx',
    zip: 1234,
    skills: ['test', 'code'],
    preferences: 'afternoon',
    availability: [new Date('2024-11-03'), new Date('2024-11-08')]
  },
  {
    id: '4',
    name: 'Jusvin',
    email: 'aj@gmail.com',
    password: 'test',
    address1: '123',
    address2: 'drive',
    city: 'houston',
    state: 'tx',
    zip: 1234,
    skills: ['deploy', 'code'],
    preferences: 'night',
    availability: [new Date('2024-12-01'), new Date('2024-12-05')]
  }
];

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
