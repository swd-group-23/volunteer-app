//hook to store userID using zustand!
import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface User {
    userId?: number;
    userRole: 'volunteer' | 'admin' | 'na';
    setUserId: (id: number | undefined) => void;
    setUserRole: (role: 'volunteer' | 'admin' | 'na') => void;


}



export const useUser = create<User>()(
    persist(
        (set) => ({
            userId: undefined,
            userRole: 'na',
            setUserId: (id: number | undefined) => set({ userId: id }),
            setUserRole: (role: 'volunteer' | 'admin' | 'na') => set({ userRole: role }),
        }),
        {
            name: 'userDetails'
        }
    )
)



