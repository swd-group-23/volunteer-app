import NavBar from './components/NavBar';
import './App.css'
import { useUser } from './hooks/useUser';
import {Modal, ModalContent, ModalHeader, ModalBody, Link, Button, useDisclosure} from "@nextui-org/react";
import 'react-datepicker/dist/react-datepicker.css';
import AdminComponent from './pages/admin/AdminComponent';
import VolunteerComponent from './pages/volunteer/VolunteerComponent';
import EventManagementForm from './components/EventManagementForm';


function App() {
  const user = useUser();
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleOpen = () => {
    onOpen();
  }
  

  return (
        <>
          <NavBar/>
          <h1 className='text-3xl text-center font-bold mt-2'>Volunteer App</h1>
          {
            (user.userId)? 

            <div className='m-4'>
               <h1 className='text-xl font-bold mt-2'>Welcome, {user.userRole}</h1>

               {
                (user.userRole === 'admin') ?
                  <>
                    <div className='flex flex-row justify-around gap-3'>
                      <EventManagementForm/>
                      <AdminComponent/>
                    </div>
                    <VolunteerComponent/>
                  </> :
                  <>
                    <VolunteerComponent/>
                  </>
               }
               

            </div>
            
            : 
            <Modal backdrop={'blur'} isOpen={true} onClose={onClose}>
            <ModalContent>
                <>
                  <ModalHeader className="flex flex-col gap-1">Login or Create Account to Proceed</ModalHeader>
                  <ModalBody>
                    <div className='flex flex-col gap-3 p-6'>
                      <Button as={Link} href="/pages/login/" variant="flat" className='bg-[#21ec8a] text-foreground'>
                          Login
                      </Button>
                      <Button as={Link} href="/pages/signup/" variant="flat" className='bg-[#0A8871] text-foreground'>
                          Sign Up
                      </Button>
                    </div>
                  </ModalBody>
                </>
            </ModalContent>
          </Modal>
          }
        </>
  )
}

export default App