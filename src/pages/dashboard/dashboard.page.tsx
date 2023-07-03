import React, { useEffect, useState } from 'react';
import { useInstance } from '../../hooks/use-instance.hook';
import { CoinsService } from '../../store/service/coins/coins.service';
import { observer } from 'mobx-react';
import { Card, Typography, Box, Checkbox } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { FavoriteBorder, Favorite, TrendingDownOutlined, TrendingUpOutlined } from '@mui/icons-material';
import { red, green } from '@mui/material/colors';

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
		background: 'rgba(114, 122, 135, 0.5)',
	},
	table: {
		'& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer': {
			display: 'none'
		},
		background: 'rgba(114, 122, 135, 0.5)',
		borderRadius: 0,
		border: 'none',      
		'& .MuiDataGrid-cell': {
			border: 'none'
		}
	}
});

const CheckboxWrapper = (props:any) =>(
	<Checkbox
		icon={<FavoriteBorder style={{ color: red[50] }} fontSize='small' />}
		checkedIcon={<Favorite style={{ color: red[500] }} />}
	/>
);

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

const fields: GridColDef[] = [
	{
		field: 'rank',
		headerName: '#'
	},
	{
		field: 'name',
		headerName: 'Name',
		width: 400,
		renderCell: ({row: {iconUrl, name, symbol}}) => (
			<Box display='flex' >
				<img src={iconUrl} width={25} height={25} style={{ margin: 'auto'}}/>
				<Typography whiteSpace='normal' marginLeft={2}>{name} / {symbol}</Typography>
			</Box>
		)
	}, 
	{
		field: 'price',
		headerName: 'Price',
		renderCell: ({value}) => addCommas(value),
		width: 100
	},
	{
		field: '24hVolume',
		headerName: 'Volume (24h)',
		renderCell: ({value}) => addCommas(value),
		width: 150
	},
	{
		field: 'change',
		headerName: 'Change',
		renderCell: ({value}) => (
			<Box display='flex'>
				{ value < 0 ? <TrendingDownOutlined style={{ color: red[500] }}/> : <TrendingUpOutlined style={{ color: green[500] }}/>}
				<Typography color={ value < 0 ?red[500] : green[500]}>{value}%</Typography>
			</Box>
		)
	}
];

const test = (prop:any) => console.log(prop);

const Dashboard: React.FC = observer(() => {
	const [favorite, setFavorite] = useState<GridRowSelectionModel>([]);
	const classes = useStyles();
	const coinsService = useInstance(CoinsService);
	const limArray = coinsService.data.slice(0, 4);

	useEffect(() => {
		coinsService.setCoins();
	}, []);

	console.log(favorite);

	return coinsService.isLoading ? 
		<div>
			<div className={classes.sub_container}>
				{
					limArray.map((el:any) => (
						<Card key={el.rank} className={classes.card}>
							<Typography fontSize={20}>{el.name}/{el.symbol}</Typography>
							<Box>
								<Typography style={{ fontSize: '15px'}}>Currency: {addCommas(el.price)}$</Typography>
								<Typography style={{ fontSize: '15px' }} color={ el.change < 0 ?red[500] : green[500]}>{el.change}%</Typography>
							</Box>
						</Card>
					))
				}
			</div>
			<Box margin={4}>
				<DataGrid
					rows={coinsService.data}
					columns={fields}
					getRowId={({rank}) => rank}
					hideFooter
					checkboxSelection
					
					rowSelectionModel={favorite}
					className={classes.table}
					components={{
						BaseCheckbox: CheckboxWrapper
					}}
				/>
			</Box>
		</div>
		: <div>Loading....</div>;
});

export default Dashboard;