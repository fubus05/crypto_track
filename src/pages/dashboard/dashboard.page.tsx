import React, { useEffect } from 'react';
import { useInstance } from '../../hooks/use-instance.hook';
import { CoinsService } from '../../store/service/coins/coins.service';
import { ICoins } from './dashboard.interface';
import { observer } from 'mobx-react';
import { Card, Typography, Box } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { red, green } from '@mui/material/colors';
import { TableComponent } from '../../components/table/table.component';
import { TrendingDownOutlined, TrendingUpOutlined } from '@mui/icons-material';
import { WatchListService } from '../../store/service/watchlist/watchlist.service';
import { HeadCell } from './dashboard.interface';

const useStyles = makeStyles({
	sub_container: {
		display: 'flex',
		width: '100%', 
		justifyContent: 'space-between'
	},
	card: {
		width: 250, 
		margin: 10, 
		padding: 15,
		background: 'rgba(114, 122, 135, 0.1)',
	}
});

const addCommas = (number: number): string => {
	const numberFloor = Math.floor(number);
	const numberStr = numberFloor.toString();
	const numberArray = numberStr.split('').reverse();
	const result: string[] = [];
  
	for (let i = 0; i < numberArray.length; i++) {
		if (i !== 0 && i % 3 === 0) {
			result.push(',');
		}
		result.push(numberArray[i]);
	}
  
	return result.reverse().join('');
};

const headCells: HeadCell[] = [
	{
		field: 'rank',
		headerName: '#'
	},
	{
		field: 'name',
		headerName: 'Name',
		renderCell: ({iconUrl, name, symbol}:ICoins): JSX.Element => (
			<Box display='flex'>
				<img src={iconUrl} width={25} height={25}/>
				<Typography whiteSpace='normal' marginLeft={2}>{name} / {symbol}</Typography>
			</Box>
		)
	}, 
	{
		field: 'price',
		headerName: 'Price',
	},
	{
		field: 'change',
		headerName: 'Change',
		renderCell: ({change}:ICoins): JSX.Element => (
			<Box display='flex'>
				{ Number(change) < 0 ? <TrendingDownOutlined style={{ color: red[500] }}/> : <TrendingUpOutlined style={{ color: green[300] }}/>}
				<Typography color={ Number(change) < 0 ?red[500] : green[300]}>{change}%</Typography>
			</Box>
		)
	},
	{
		field: 'marketCap',
		headerName: 'Market Cap'
	},
	{
		field: '24hVolume',
		headerName: 'Volume (24h)',
	},
];

const Dashboard: React.FC = observer(() => {
	const classes = useStyles();
	const coinsService = useInstance(CoinsService);
	const favoriteService = useInstance(WatchListService);
	const limArray = coinsService.data.slice(0, 4);

	useEffect(() => {
		coinsService.setCoins();
	}, []);
	
	return coinsService.isLoading ? 
		<div>
			<div className={classes.sub_container}>
				{
					limArray.map((el) => (
						<Card key={el.rank} className={classes.card}>
							<Typography fontSize={20}>{el.name}/{el.symbol}</Typography>
							<Box>
								<Typography style={{ fontSize: '15px'}}>Currency: {addCommas(Number(el.price))}$</Typography>
								<Typography style={{ fontSize: '15px' }} color={ Number(el.change) < 0 ?red[500] : green[300]}>{el.change}%</Typography>
							</Box>
						</Card>
					))
				}
			</div>
			<TableComponent 
				headCells={headCells} 
				cells={coinsService.data} 
				checkbox
				onFavorite={favoriteService.handleFavorite}
			/>
		</div>
		: <div>Loading....</div>;
});

export default Dashboard;