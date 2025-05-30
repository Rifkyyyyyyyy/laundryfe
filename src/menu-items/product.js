// assets
import {
    IconBox,
    IconDiscount,
    IconShirt
    

} from '@tabler/icons-react';

// constant
const icons = {
    IconBox,
    IconDiscount,
    IconShirt

};

// ==============================|| product MENU ITEMS ||============================== //

const product = {
    id: 'ProductFeatures',
    title: 'Product Management',
    type: 'group',
    children: [

        {
            id: 'product',
            title: 'Product',
            type: 'item',
            url: '/product',
            icon: icons.IconBox,
            breadcrumbs: false
        },

        {
            id: 'discount',
            title: 'Discount',
            type: 'item',
            url: '/discount',
            icon: icons.IconDiscount,
            breadcrumbs: false
        },

        {
            id: 'service',
            title: 'Service',
            type: 'item',
            url: '/service',
            icon: icons.IconShirt,
            breadcrumbs: false
        },


    ]
};

export default product;
