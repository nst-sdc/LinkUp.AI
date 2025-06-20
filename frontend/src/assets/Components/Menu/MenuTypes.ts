export type MenuLinksClickEvent = {
    e: React.MouseEvent<HTMLLIElement>;
};

export interface MenuLinksProps {
    data: {
        id?: string;
        title: string;
        link?: string;
        subMenu?: Array<{
            title: string;
            link: string;
        }>;
    };
}

export interface MenuDropDownProps {
    data: MenuLinksProps['data']['subMenu'];
}
