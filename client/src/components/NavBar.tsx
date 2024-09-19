import { useState } from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Badge} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";

const notifications = [
    {
      id: 1,
      description: 'Notification #1',
    },
    {
      id: 2,
      description: 'Notification #2',
    },
    {
      id: 3,
      description: 'Notification #3',
    }
  ];

import { NotificationIcon } from '../assets/NotificationIcon';
const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = [
      "Login",
      "Profile",
      "Admin",
      "Volunteer"
    ];
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand>
        
                <a href="/" className="font-bold text-inherit">SWD</a>
            </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
                <Link color="foreground" href="/pages/profile/">
                Profile
                </Link>
            </NavbarItem>
            <NavbarItem>
                <Link color="foreground" href="/pages/admin/">
                Admin
                </Link>
            </NavbarItem>
            <NavbarItem>
                <Link color="foreground" href="/pages/volunteer/">
                Volunteer
                </Link>
            </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
                <Link href="/pages/login/">Login</Link>
            </NavbarItem>
            <NavbarItem>
                <Button as={Link} color="primary" href="/pages/signup/" variant="flat">
                Sign Up
                </Button>
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
                                    {notification.description}
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