//hook to store userID using zustand!
import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface User {
    userId?: string | null;
    userRole: 'volunteer' | 'admin' | 'na';
    setUserId: (id: string | null) => void;
    setUserRole: (role: 'volunteer' | 'admin' | 'na') => void;


}



export const useUser = create<User>()(
    persist(
        (set) => ({
            userId: undefined,
            userRole: 'na',
            setUserId: (id: string | null) => set({ userId: id }),
            setUserRole: (role: 'volunteer' | 'admin' | 'na') => set({ userRole: role }),
        }),
        {
            name: 'userDetails'
        }
    )
)



