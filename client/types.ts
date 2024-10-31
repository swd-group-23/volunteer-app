export interface User {
    _id: string;
    email: string;
    password: string;
    role: 'volunteer' | 'admin';
}

export interface Volunteer {
    _id: string;
    userId: string;
    name: string;
    email: string;
    password: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: number;
    skills: string[];
    preferences?: string;
    availability: Date[];
};

export interface Notification {
    _id: string;
    userId: string;
    eventId: string;
    time: Date;
    message: string;
  }

export interface Event {
    _id: string;
    name: string;
    description: string;
    location: string;
    dateTime: Date;
    skills: string[];
    urgency: string;
};

export interface History {
    id: string;
    volunteerId: string;
    volunteerName: string;
    eventName: string;
    eventDescription: string;
    location: string;
    skills: string[];
    urgency: string;
    eventDate: Date;
    status: string[];

};


export const states = [
    { value: 'AL', id: '6716e4d6daa3a6f650baf82b' }, { value: 'AK', id: '6716e4d6daa3a6f650baf82c' },
    { value: 'AZ', id: '6716e4d6daa3a6f650baf82d' }, { value: 'AR', id: '6716e4d6daa3a6f650baf82e' },
    { value: 'CA', id: '6716e4d6daa3a6f650baf82f' }, { value: 'CO', id: '6716e4d6daa3a6f650baf830' },
    { value: 'CT', id: '6716e4d6daa3a6f650baf831' }, { value: 'DE', id: '6716e4d6daa3a6f650baf832' },
    { value: 'FL', id: '6716e4d6daa3a6f650baf833' }, { value: 'GA', id: '6716e4d6daa3a6f650baf834' },
    { value: 'HI', id: '6716e4d6daa3a6f650baf835' }, { value: 'ID', id: '6716e4d6daa3a6f650baf836' },
    { value: 'IL', id: '6716e4d6daa3a6f650baf837' }, { value: 'IN', id: '6716e4d6daa3a6f650baf838' },
    { value: 'IA', id: '6716e4d6daa3a6f650baf839' }, { value: 'KS', id: '6716e4d6daa3a6f650baf83a' },
    { value: 'KY', id: '6716e4d6daa3a6f650baf83b' }, { value: 'LA', id: '6716e4d6daa3a6f650baf83c' },
    { value: 'ME', id: '6716e4d6daa3a6f650baf83d' }, { value: 'MD', id: '6716e4d6daa3a6f650baf83e' },
    { value: 'MA', id: '6716e4d6daa3a6f650baf83f' }, { value: 'MI', id: '6716e4d6daa3a6f650baf840' },
    { value: 'MN', id: '6716e4d6daa3a6f650baf841' }, { value: 'MS', id: '6716e4d6daa3a6f650baf842' },
    { value: 'MO', id: '6716e4d6daa3a6f650baf843' }, { value: 'MT', id: '6716e4d6daa3a6f650baf844' },
    { value: 'NE', id: '6716e4d6daa3a6f650baf845' }, { value: 'NV', id: '6716e4d6daa3a6f650baf846' },
    { value: 'NH', id: '6716e4d6daa3a6f650baf847' }, { value: 'NJ', id: '6716e4d6daa3a6f650baf848' },
    { value: 'NM', id: '6716e4d6daa3a6f650baf849' }, { value: 'NY', id: '6716e4d6daa3a6f650baf84a' },
    { value: 'NC', id: '6716e4d6daa3a6f650baf84b' }, { value: 'ND', id: '6716e4d6daa3a6f650baf84c' },
    { value: 'OH', id: '6716e4d6daa3a6f650baf84d' }, { value: 'OK', id: '6716e4d6daa3a6f650baf84e' },
    { value: 'OR', id: '6716e4d6daa3a6f650baf84f' }, { value: 'PA', id: '6716e4d6daa3a6f650baf850' },
    { value: 'RI', id: '6716e4d6daa3a6f650baf851' }, { value: 'SC', id: '6716e4d6daa3a6f650baf852' },
    { value: 'SD', id: '6716e4d6daa3a6f650baf853' }, { value: 'TN', id: '6716e4d6daa3a6f650baf854' },
    { value: 'TX', id: '6716e4d6daa3a6f650baf855' }, { value: 'UT', id: '6716e4d6daa3a6f650baf856' },
    { value: 'VT', id: '6716e4d6daa3a6f650baf857' }, { value: 'VA', id: '6716e4d6daa3a6f650baf858' },
    { value: 'WA', id: '6716e4d6daa3a6f650baf859' }, { value: 'WV', id: '6716e4d6daa3a6f650baf85a' },
    { value: 'WI', id: '6716e4d6daa3a6f650baf85b' }, { value: 'WY', id: '6716e4d6daa3a6f650baf85c' }
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

  
  export const urgencys = [
    { value: 'low'},
    { value: 'medium'},
    { value: 'high'}
  ];