import { useEffect,useState } from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Badge} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { NotificationIcon } from '../assets/NotificationIcon';
import {useUser} from '../hooks/useUser';
import axios from 'axios';

interface Notification {
    id: string;
    userId: string;
    eventId: string;
    time: Date;
    message: string;
  }

const NavBar = () => {
    const user = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const env = import.meta.env.VITE_REACT_APP_NODE_ENV;
    const base_url = (env == 'production') ?  import.meta.env.VITE_REACT_APP_SERVER_BASE_URL : (env == 'staging') ? import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_STAGE : import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_DEV;



    useEffect(() => {
        axios.get<Notification[]>(`${base_url}/api/notifications`)
            .then(response => {
                if (response.data) {
                    setNotifications(response.data);
                }
            })
            .catch(error => {
                console.log(base_url);
                alert(error);
            })
    }
        , []);

    const menuItems = [
      "Login",
      "Profile",
      "Admin",
      "Volunteer"
    ];
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className='z-50 bg-primary-200 '>
            <NavbarContent>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand>
                <a href="/" className="font-bold text-inherit">Home</a>
            </NavbarBrand>
            </NavbarContent>

       
            <NavbarContent justify="end">
            {(user.userId)?
            <NavbarItem>
                <Link color="foreground" href="/pages/profile/">
                    {(user.userRole=="admin")?
                        <div>
                            Volunteer Profiles
                        </div>
                        :
                        <div>
                            Profile
                        </div>
                    }
                </Link>
            </NavbarItem> :
            <NavbarItem className="flex">
                <Link href="/pages/login/" className='text-foreground'>Login</Link>
            </NavbarItem>
            }
        
            <NavbarItem>
                {
                    (user.userId) ?
                    <Button onClick={() => {user.setUserId(null); user.setUserRole('na'); window.location.href='/'}} variant="flat" className='bg-primary text-foreground'>
                        Sign Out
                    </Button>:
                    <Button as={Link} href="/pages/signup/" variant="flat" className='bg-primary text-foreground'>
                        Sign Up
                    </Button>

                }
          
            </NavbarItem>
            <NavbarItem>
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Badge color="danger" content={notifications.length} isInvisible={false} shape="circle">
                            <NotificationIcon className="fill-current" size={30} />
                        </Badge>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        {
                            notifications.map((notification)=>(
                                <DropdownItem key={notification.id}>
                                    {notification.message}
                                </DropdownItem>                            
                            ))
                        }
                    </DropdownMenu>
                </Dropdown>
            </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
            {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                    color="foreground"
                    className="w-full"
                    href="#"
                    size="lg"
                >
                    {item}
                </Link>
                </NavbarMenuItem>
            ))}
            </NavbarMenu>
        </Navbar>
    )
}

export default NavBar;