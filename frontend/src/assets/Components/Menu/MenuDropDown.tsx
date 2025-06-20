import { MenuDropDownProps } from '@/assets/Components/Menu/MenuTypes';
import { NavLink } from 'react-router-dom';

/**
 * MenuDropDown component renders a dropdown menu with a list of items.
 * @description This is CSS dependent to display from "none" to "block".
 *
 * @param data - Array of objects containing title and link properties.
 * @returns
 */
export function MenuDropDown({ data }: MenuDropDownProps) {
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <ul className="menu-list__content">
            {data.map((item, index) => (
                <li key={index}>
                    <NavLink to={item.link}>{item.title}</NavLink>
                </li>
            ))}
        </ul>
    );
}
