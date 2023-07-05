export interface HeadCell {
	field: string;
	headerName: string;
	renderCell?: any;
}

export interface ICoins {
	[key: string]: string | number | boolean;
    rank: string;
    symbol: string;
    name: string;
    iconUrl: string;
    price: string;
    change: string;
}