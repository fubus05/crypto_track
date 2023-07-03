import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

export interface ICoins {
    rank: string;
    symbol: string;
    name: string;
    iconUrl: string;
    price: string;
    change: string;
}

export class CoinsService {
	private static instance: CoinsService;
	static getInstance(): CoinsService {
		if (!this.instance) {
			return this.instance = new CoinsService();
		}
		return this.instance;
	}
        
	constructor() {
		makeAutoObservable(this);
	}

	data: ICoins[] = [];
	isLoading = false;
	error = null;

	async setCoins() {
		const {data: res} = await axios.get('https://api.coinranking.com/v2/coins', {
			headers: {'x-access-token': 'coinranking430753de4a5d989993a989d5ef8e49666236701a10b0cb25'}
		});
		return runInAction(() => {
			this.data = [...res.data.coins];
			this.isLoading = true;
			return this.data;
		});
	}
}