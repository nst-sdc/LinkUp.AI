import './Navbar.css';
import logo from '../../../assets/Images/logo.png';
import searchIcon from '../../../assets/Images/search-iconW.png';
import { Button } from '@/assets/Components/Buttons/Button';
import menuList from '@data/NavHeaderLists/navBarLists.json';
import { MenuList } from '@/assets/Components/Menu/MenuList';

const Navbar = () => {
    return (
        <div className="navbar">
            <img src={logo} alt="LinkUp.AI Logo" className="logo" />

            <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <img src={searchIcon} alt="" />
            </div>
            <MenuList data={menuList} />
            <Button>Sign in</Button>
        </div>
    );
};

export default Navbar;
