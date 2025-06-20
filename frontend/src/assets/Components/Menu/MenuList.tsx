import { MenuLinks } from '@/assets/Components/Menu/MenuLinks';
import { useOutletContext } from 'react-router-dom';
import '@css/menu.scss';

/**
 * MenuList component renders a list of menu items.
 * @description This component takes an array of menu items and renders them as a list.
 *
 * @param data - Array of menu items, each containing an id, title, link, and optional subMenu.
 */
export function MenuList({ data }) {
    // const data = useOutletContext();

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <ul className="menu-list">
            {data.map((item) => (
                <MenuLinks key={item.id} data={item} />
            ))}
        </ul>
    );
}
