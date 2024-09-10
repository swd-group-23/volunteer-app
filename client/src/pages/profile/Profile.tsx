import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import NavBar from '../../components/NavBar';
import '../../index.css';
import { useForm, Controller, type FieldValues } from 'react-hook-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const customSelectStyles = {
    control: (provided: any) => ({
        ...provided,
        backgroundColor: '#1F1F1F', // Darker background
        color: 'white', // Text color
        border: '1px solid #333', // Darker border
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: '#1F1F1F', // Darker background for dropdown menu
        color: 'white', // Text color for dropdown options
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#333' : '#1F1F1F', // Darker background, slightly lighter on hover
        color: 'white', // Text color
        cursor: 'pointer',
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: 'white', // Text color for selected option
    }),
    multiValue: (provided: any) => ({
        ...provided,
        backgroundColor: '#333', // Darker background for selected options
        color: 'white',
    }),
    multiValueLabel: (provided: any) => ({
        ...provided,
        color: 'white', // Text color for selected options
    }),
    multiValueRemove: (provided: any) => ({
        ...provided,
        color: 'white', // Remove button color
        ':hover': {
            backgroundColor: '#FF4D4D', // Red background when hovered
            color: 'white',
        },
    }),
};


// State options for the dropdown
const stateOptions = [
    { value: 'TX', label: 'Texas' },
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    // Add more states as needed
];

// Skills options for multi-select dropdown
const skillsOptions = [
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Python', label: 'Python' },
    // Add more skills as needed
];

export default function UserProfileForm() {
    const [formMessage, setFormMessage] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Simple simulation for login check
    //const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false); // Profile completion state

    const { register, handleSubmit, formState: { errors, isSubmitting }, control, reset } = useForm();

    // Simulate user authentication check (replace with your actual authentication logic)
    useEffect(() => {
        const userLoggedIn = true; // Simulate user logged-in state
        if (userLoggedIn) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const onSubmit = async (data: FieldValues) => {
        setFormMessage(null);
    
        try {
            // Log the form data to the console for testing
            console.log("Form data submitted:", data);
    
            // Simulate server submission
            await new Promise((resolve) => setTimeout(resolve, 1000));
    
            setFormMessage("Profile updated successfully!");
            reset();
        } catch (error) {
            setFormMessage("Profile update failed, please try again.");
        }
    };
    

    if (!isAuthenticated) {
        return <p>Please log in to complete your profile.</p>; // Redirect or show login form
    }
/*
    if (isProfileComplete) {
        return <p>Your profile is complete!</p>; // Profile completion message
    }
*/
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
                {/* Full Name */}
                <label htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    {...register("fullName", {
                        required: "Full name is required",
                        maxLength: {
                            value: 50,
                            message: "Full name cannot exceed 50 characters",
                        },
                    })}
                    type="text"
                    placeholder="Full Name"
                    className="px-4 py-2 rounded"
                />
                {errors.fullName?.message && <p className="text-red-500">{String(errors.fullName.message)}</p>}

                {/* Address 1 */}
                <label htmlFor="address1">Address 1</label>
                <input
                    id="address1"
                    {...register("address1", {
                        required: "Address 1 is required",
                        maxLength: {
                            value: 100,
                            message: "Address 1 cannot exceed 100 characters",
                        },
                    })}
                    type="text"
                    placeholder="Address 1"
                    className="px-4 py-2 rounded"
                />
                {errors.address1?.message && <p className="text-red-500">{String(errors.address1.message)}</p>}

                {/* Address 2 */}
                <label htmlFor="address2">Address 2 (Optional)</label>
                <input
                    id="address2"
                    {...register("address2", {
                        maxLength: {
                            value: 100,
                            message: "Address 2 cannot exceed 100 characters",
                        },
                    })}
                    type="text"
                    placeholder="Address 2 (Optional)"
                    className="px-4 py-2 rounded"
                />
                {errors.address2?.message && <p className="text-red-500">{String(errors.address2.message)}</p>}

                {/* City */}
                <label htmlFor="city">City</label>
                <input
                    id="city"
                    {...register("city", {
                        required: "City is required",
                        maxLength: {
                            value: 100,
                            message: "City cannot exceed 100 characters",
                        },
                    })}
                    type="text"
                    placeholder="City"
                    className="px-4 py-2 rounded"
                />
                {errors.city?.message && <p className="text-red-500">{String(errors.city.message)}</p>}

                {/* State */}
                <label htmlFor="state">State</label>
                <Controller
                    name="state"
                    control={control}
                    rules={{ required: "State is required" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={stateOptions}
                            placeholder="Select State"
                            id="state"
                            styles={customSelectStyles} 
                        />
                    )}
                />
                {errors.state?.message && <p className="text-red-500">{String(errors.state?.message)}</p>}

                {/* Zip Code */}
                <label htmlFor="zipCode">Zip Code</label>
                <input
                    id="zipCode"
                    {...register("zipCode", {
                        required: "Zip code is required",
                        pattern: {
                            value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                            message: "Invalid zip code format",
                        },
                    })}
                    type="text"
                    placeholder="Zip Code"
                    className="px-4 py-2 rounded"
                />
                {errors.zipCode?.message && <p className="text-red-500">{String(errors.zipCode.message)}</p>}

                {/* Skills */}
                <label htmlFor="skills">Skills</label>
                <Controller
                    name="skills"
                    control={control}
                    rules={{ required: "Skills are required" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            isMulti
                            options={skillsOptions}
                            placeholder="Select Skills"
                            id="skills"
                            styles={customSelectStyles} 
                        />
                    )}
                />
                {errors.skills?.message && <p className="text-red-500">{String(errors.skills.message)}</p>}

                {/* Preferences */}
                <label htmlFor="preferences">Preferences (Optional)</label>
                <textarea
                    id="preferences"
                    {...register("preferences")}
                    placeholder="Preferences (Optional)"
                    className="px-4 py-2 rounded"
                />

                {/* Availability */}
                <label htmlFor="availability">Availability</label>
                <Controller
                    name="availability"
                    control={control}
                    rules={{ required: "Availability is required" }}
                    render={({ field }) => (
                        <DatePicker
                            {...field}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            placeholderText="Select Availability"
                            inline
                            id="availability"                   
                        />
                    )}
                />
                {errors.availability?.message && <p className="text-red-500">{String(errors.availability.message)}</p>}

                {/* Submit Button */}
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>

            {formMessage && (
                <p className={`mt-4 ${formMessage.includes("success") ? "text-green-500" : "text-red-500"}`}>
                    {formMessage}
                </p>
            )}
        </div>
    );
}

const rootElement = document.getElementById('root');


if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <main className='dark text-foreground bg-background'>
                <NavBar />
                <h1 className='text-3xl'>User Profile Management</h1>
                <UserProfileForm />
            </main>
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}
