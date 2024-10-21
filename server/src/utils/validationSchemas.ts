export const createUserValidationSchema = {
    email: {
        notEmpty: {
            errorMessage: "Email cannot be empty"
        },
        isString: {
            errorMessage: "Email must be a string!"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password cannot be empty"
        },
        isLength: {
            options: {
                min: 8,
                max: 100
            },
            errorMessage: "Password must be at least 8 characters with a max of 100 characters"
        }
    }
}

export const createVolunteerValidation = {
    name: {
        notEmpty: {
            errorMessage: "Name cannot be empty",
        },
        isString: {
            errorMessage: "Name must be a string",
        }
    },
    email: {
        notEmpty: {
            errorMessage: "Email cannot be empty",
        },
        isString: {
            errorMessage: "Email must be a string",
        },
        isEmail: {
            errorMessage: "Email must be a valid email address",
        }
    },
    address1: {
        notEmpty: {
            errorMessage: "Address line 1 cannot be empty",
        },
        isString: {
            errorMessage: "Address line 1 must be a string",
        }
    },
    address2: {
        optional: true, // Optional field
        isString: {
            errorMessage: "Address line 2 must be a string",
        }
    },
    city: {
        notEmpty: {
            errorMessage: "City cannot be empty",
        },
        isString: {
            errorMessage: "City must be a string",
        }
    },
    state: {
        notEmpty: {
            errorMessage: "State cannot be empty",
        },
        isString: {
            errorMessage: "State must be a string",
        },
        isLength: {
            options: { min: 2, max: 2 },
            errorMessage: "State must be a valid 2-letter abbreviation",
        }
    },
    zip: {
        notEmpty: {
            errorMessage: "ZIP code cannot be empty",
        },
        isNumeric: {
            errorMessage: "ZIP code must be a number",
        },
        isLength: {
            options: { min: 5, max: 5 },
            errorMessage: "ZIP code must be a 5-digit number",
        }
    },
    skills: {
        notEmpty: {
            errorMessage: "Skills cannot be empty",
        }
    },
    preferences: {
        optional: true, // Optional field
        isString: {
            errorMessage: "Preferences must be a string",
        }
    },
    availability: {
        notEmpty: {
            errorMessage: "Availability cannot be empty",
        },
        isArray: {
            errorMessage: "Availability must be an array of dates",
        },
        custom: {
            options: (availability: Date[]) => availability.every(date => !isNaN(Date.parse(date.toString()))),
            errorMessage: "Each availability entry must be a valid date",
        }
    }
};

export const createEventValidation = {
    name: {
        notEmpty: {
            errorMessage: "Event name cannot be empty",
        },
        isString: {
            errorMessage: "Event name must be a string",
        }
    },
    description: {
        notEmpty: {
            errorMessage: "Event description cannot be empty",
        },
        isString: {
            errorMessage: "Event description must be a string",
        }
    },
    location: {
        notEmpty: {
            errorMessage: "Location cannot be empty",
        },
        isString: {
            errorMessage: "Location must be a string",
        }
    },
    dateTime: {
        notEmpty: {
            errorMessage: "Event date and time cannot be empty",
        }
    },
    skills: {
        notEmpty: {
            errorMessage: "Skills cannot be empty",
        }
    },
    urgency: {
        notEmpty: {
            errorMessage: "Urgency level cannot be empty",
        }
    }
};
