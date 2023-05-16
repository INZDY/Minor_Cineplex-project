//for things in sidebar

import React from 'react'
// import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi"
import * as GiIcons from "react-icons/gi"
import * as MdIcons from "react-icons/md"
// import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Customer',
        path: '/customer',
        icon: <AiIcons.AiOutlineUser />,
        cName: 'nav-text'
    },
    {
        title: 'Staff',
        path: '/staff',
        icon: <BiIcons.BiSupport/>,
        cName: 'nav-text'
    },
    {
        title: 'Branch',
        path: '/branch',
        icon: <BiIcons.BiGitBranch />,
        cName: 'nav-text'
    },
    {
        title: 'Theatre',
        path: '/theatre',
        icon: <GiIcons.GiTheater />,
        cName: 'nav-text'
    },
    {
        title: 'Member Type',
        path: '/memtype',
        icon: <MdIcons.MdHotelClass />,
        cName: 'nav-text'
    },
    {
        title: 'Seat',
        path: '/seat',
        icon: <MdIcons.MdEventSeat />,
        cName: 'nav-text'
    },
    {
        title: 'Movies',
        path: '/movies',
        icon: <MdIcons.MdLocalMovies />,
        cName: 'nav-text'
    }
]