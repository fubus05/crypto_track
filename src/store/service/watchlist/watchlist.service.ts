import { makeAutoObservable } from 'mobx';
import { ICoins } from '../../../pages/dashboard/dashboard.interface';

export class WatchListService{
	private static instance: WatchListService;
	static getInstance(): WatchListService {
		if (!this.instance) {
			return this.instance = new WatchListService();
		}
		return this.instance;
	}
    
	favorite: ICoins[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	handleFavorite = (element: ICoins) => {
		if(this.favorite.includes(element)){
			this.favorite = this.favorite.filter((row) => row !== element);
		}else{
			this.favorite = [...this.favorite, element];
		}
	};
}