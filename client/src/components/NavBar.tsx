import { useState } from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";



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
                <Button as={Link} color="primary" href="/pages/login/" variant="flat">
                Sign Up
                </Button>
            </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
            {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                    color={
                    index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                    }
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