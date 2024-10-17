import { User } from "./models/users.model";
import { Volunteer } from "./models/volunteer.model";
import { Notification } from "./models/notifications.model";

import { GetHistoryResponse, History } from "./models/history.model";



import { Event } from "./models/events.model";

export const states = [
  { value: 'AL'}, { value: 'AK'}, { value: 'AZ'}, { value: 'AR'}, 
  { value: 'CA'}, { value: 'CO'}, { value: 'CT'}, { value: 'DE'}, 
  { value: 'FL'}, { value: 'GA'}, { value: 'HI'}, { value: 'ID'}, 
  { value: 'IL'}, { value: 'IN'}, { value: 'IA'}, { value: 'KS'}, 
  { value: 'KY'}, { value: 'LA'}, { value: 'ME'}, { value: 'MD'}, 
  { value: 'MA'}, { value: 'MI'}, { value: 'MN'}, { value: 'MS'}, 
  { value: 'MO'}, { value: 'MT'}, { value: 'NE'}, { value: 'NV'}, 
  { value: 'NH'}, { value: 'NJ'}, { value: 'NM'}, { value: 'NY'}, 
  { value: 'NC'}, { value: 'ND'}, { value: 'OH'}, { value: 'OK'}, 
  { value: 'OR'}, { value: 'PA'}, { value: 'RI'}, { value: 'SC'}, 
  { value: 'SD'}, { value: 'TN'}, { value: 'TX'}, { value: 'UT'}, 
  { value: 'VT'}, { value: 'VA'}, { value: 'WA'}, { value: 'WV'}, 
  { value: 'WI'}, { value: 'WY'}
];

export const skills = [
  { value: 'Project Management' },
  { value: 'Fundraising' },
  { value: 'Event Planning' },
  { value: 'Public Speaking' },
  { value: 'Marketing and Social Media' },
  { value: 'Grant Writing' },
  { value: 'Community Outreach' },
  { value: 'Volunteer Coordination' },
  { value: 'Conflict Resolution' },
  { value: 'Teaching and Mentoring' },
  { value: 'Web Development' },
  { value: 'Graphic Design' },
  { value: 'Data Analysis' },
  { value: 'First Aid and CPR' },
  { value: 'Nonprofit Administration' }
];




export const users: User[] = [
  {
    id: '1',
    email: 'admin@gmail.com',
    password: '12345678',
    role: 'admin'
  },
  {
    id: '2',
    email: 'volunteer@gmail.com',
    password: '12345678',
    role: 'volunteer'
  },
  {
    id: '3',
    email: 'test3@gmail.com',
    password: '3456',
    role: 'volunteer'
  },

];

export const volunteers: Volunteer[] = [
  {
    id: '1',
    userId: '1',
    name: 'Alan',
    email: 'alan@gmail.com',
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
    userId: '2',
    name: 'Alina',
    email: 'alina@gmail.com',
    password: 'test',
    address1: '123',
    address2: 'drive',
    city: 'houston',
    state: 'tx',
    zip: 1234,
    skills: [skills[2].value],
    preferences: 'evening',
    availability: [new Date('2024-09-14'), new Date('2024-10-07')]
  },
  {
    id: '3',
    userId: '3',
    name: 'Josh',
    email: 'josh@gmail.com',
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
    userId: '4',
    name: 'Jusvin',
    email: 'jusvin@gmail.com',
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

export const notifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    time: new Date('2024-12-01'),
    eventId: "1",
    message: "Your Houston Food Bank Shift is coming up!",
  },
  {
    id: "2",
    userId: "1",
    time: new Date('2024-12-01'),
    eventId: "2",
    message: "Your Homeless Shelter Shift is coming up!",
  },
  {
    id: "3",
    userId: "2",
    time: new Date('2024-12-01'),
    eventId: "3",
    message: "Your Shift at the Public Library is coming up!",
  },
  {
    id: "4",
    userId: "2",
    time: new Date('2024-12-01'),
    eventId: "1",
    message: "Your Houston Food Bank Shift is coming up!",
  },
  {
    id: "5",
    userId: "3",
    time: new Date('2024-12-01'),
    eventId: "3",
    message: "Your Shift at the Public Library is coming up!",
  },

  {
    id: "6",
    userId: "3",
    time: new Date('2024-12-01'),
    eventId: "4",
    message: "Your Blood Drive Shift is coming up!",
  },
  {
    id: "7",
    userId: "3",
    time: new Date('2024-12-01'),
    eventId: "5",
    message: "Your Donation Shift is coming up!",
  },
  {
    id: "8",
    userId: "3",
    time: new Date('2024-12-01'),
    eventId: "5",
    message: "Donation Shift is coming up!",
  },


   ];

   export const histories: History[] = [
    {
      id: "1",
      volunteerId: "1",
      eventId: "1",
      status: ["Participated"],
    },
    {
      id: "2",
      volunteerId: "2",
      eventId: "2",
      status: ["Participated"],
    },
    {
      id: "3",
      volunteerId: "1",
      eventId: "3",
      status: ["Canceled"],
    },
    {
      id: "4",
      volunteerId: "3",
      eventId: "4",
      status: ["No show"],
    },
  ];






/*
export const histories: History[] = [
  {
    id: '1',
    volunteerId: '1',
    volunteerName: "Lindsey Lohan",
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
    eventName: 'Blood Drive', 
    eventDescription: 'Organizing a blood donation drive to support local hospitals and medical facilities.',
    location: '500 Donation Dr, Houston, TX 77003',
    skills: ['organization', 'attention to detail'], 
    urgency: 'High',
    eventDate: new Date('2024-05-01'),
    status: ['No show']
  
  }

  
  ];
*/
 
  
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
]
