"use client"
import { usePathname } from "next/navigation"
import { NavButton } from "./NavButton";



const routes = [
    {
        href:'/',
        label:"Overview",
    },
    {
        href:'/projects',
        label:"Projects",
    },
    {
        href:'/filters',
        label:"Filters",
    },
    {
        href:'/terms',
        label:"Terms",
    },
    {
        href:'/plans',
        label:"Plans",
    },
    {
        href:'/finance',
        label:"Fianance",
    },
    
]
const Navigation = () => {

    const pathname = usePathname();




  return (
    <nav className="flex items-center gap-x-4 overflow-x-auto">
        {routes.map((route)=>(
            <NavButton
                key={route.href}
                href={route.href}
                label={route.label}
                isActive={pathname === route.href}
            />
        ))}
    </nav>
)
}

export default Navigation