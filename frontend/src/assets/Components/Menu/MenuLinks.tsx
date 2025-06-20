import { MenuDropDown } from '@/assets/Components/Menu/MenuDropDown';
import {
    MenuLinksClickEvent,
    MenuLinksProps,
} from '@/assets/Components/Menu/MenuTypes';

const ArrowIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        fill="transparent"
        className="arrow-icon"
    >
        <path
            d="M4 6L8 10L12 6"
            stroke="#16191d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export function MenuLinks({ data }: MenuLinksProps) {
    return (
        <li
            className={'menu-list_container'}
            onClick={(e) => handleOnClick({ e })}
        >
            {data.title}
            {data.subMenu && data.subMenu.length > 0 && ArrowIcon}
            {data.subMenu && data.subMenu.length > 0 && (
                <MenuDropDown data={data.subMenu} />
            )}
        </li>
    );
}

/**
 * When a dropdown is active, it will close other dropdowns
 */
function handleOnClick({ e }: MenuLinksClickEvent) {
    e.preventDefault();
    const dropdowns = document.querySelectorAll('.menu-list_container');
    dropdowns.forEach((dropdown) => {
        if (dropdown !== e.currentTarget) {
            dropdown.classList.remove('active');
        } else {
            dropdown.classList.toggle('active');
        }
    });
}
