import { User } from "./models/users.model";
import { Volunteer } from "./models/volunteer.model";

export const users: User[] = [
  {
    id: '1',
    email: 'test1@gmail.com',
    password: '1234',
    role: 'volunteer'
  },
  {
    id: '2',
    email: 'test2@gmail.com',
    password: '2345',
    role: 'admin'
  },
  {
    id: '3',
    email: 'test3@gmail.com',
    password: '3456',
    role: 'volunteer'
  },

]


export const volunteers: Volunteer[] = [
  {
    id: '1',
    userId: '1',
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
    userId: '2',
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
    userId: '3',
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
    userId: '4',
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

