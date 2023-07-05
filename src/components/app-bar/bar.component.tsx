import React from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';
import { styled } from '@material-ui/styles';
import { common } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export interface IDrawer{ 
    id: string
    path: string
    label: string
}

export const menu: IDrawer[] = [
	{
		id: '1',
		label: 'Dashboard',
		path: '/',
	},
	{
		id: '2',
		label: 'News',
		path: '/news',
	},
	{
		id: '3',
		label: 'Watchlist',
		path: '/watchlist',
	},
];

const CustomButton = styled(Button)({
	color: common['white'],
	backgroundColor: common['black'],
	margin: 12,
	'&:hover': {
		backgroundColor: common['white'],
		color: common['black'],
	},
});
  

const BarComponent: React.FC = () => {
	const navigate = useNavigate();

	return(
		<AppBar position="static" variant="outlined" style={{ backgroundColor: 'black'}}>
			<Toolbar style={{ margin: 'auto' }}>
				{menu.map((item: IDrawer) => {
					const { label, path, id } = item;
					return(
						<CustomButton key={id} variant="contained" onClick={() => navigate(path)}>{label}</CustomButton>
					);
				})}
			</Toolbar>
		</AppBar>
	);};

export default BarComponent;