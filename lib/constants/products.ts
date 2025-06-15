import { ProductCardI } from "../interface/shared";

const productCardDetails: ProductCardI[] = [
    // {
    //     id: 'closetClick',
    //     cardIndex: 1,
    //     angle: -6,
    //     data: {
    //         name: 'Closet Click',
    //         description: 'managing and swapping clothes online with just a "click."',
    //         imagePath: './trencher.svg',
    //         color: '#1E86FF',
    //         redirectionPath: '/counselling',
    //     },
    // },
    {
        id: 'thrifting',
        cardIndex: 2,
        angle: -3,
        data: {
            name: 'Thrift Store',
            description: 'Brand New fashion stuff at',
            imagePath: '/images/product/thrifting.png',
            color: '#1E86FF',
            redirectionPath: '/enjoy-thrifting',
        },
    },
    {
        id: 'fashionMate',
        cardIndex: 3,
        angle: 0,
        data: {
            name: 'Fashion Mate',
            description: 'Find your',
            imagePath: '/images/product/fashionMate.png',
            color: '#F9CB4B',
            redirectionPath: '/find-your-fashion-mate',
        },
    },
    {
        id: 'thriftHost',
        cardIndex: 4,
        angle: 3,
        data: {
            name: 'Thrift Hosting',
            description: 'Host your own store at',
            imagePath: '/images/product/thriftStore.png',
            color: '#1E86FF',
            redirectionPath: '/host-your-own-thrift-store',
        },
    },
    // {
    //     id: 'ecoThreads',
    //     cardIndex: 5,
    //     angle: 6,
    //     data: {
    //         name: 'EcoThreads',
    //         description: 'Community  inspired by Sustainable Fashion',
    //         imagePath: './institute.svg',
    //         color: '#309759',
    //         redirectionPath: '/institutions',
    //     },
    // },
];

export default productCardDetails;
