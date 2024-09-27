export interface User {
    id: string;
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

export interface Volunteer {
    id: string;
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


export interface Event {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    dateTime: Date;
    skills: string[];
    urgency: string;
};

export interface History {
    id: string;
    eventName: string;
    eventDescription: string;
    location: string;
    skills: string[];
    urgency: string;
    eventDate: Date;
    status: string[];

};


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

  
  export const urgencys = [
    { value: 'low'},
    { value: 'medium'},
    { value: 'high'}
  ];