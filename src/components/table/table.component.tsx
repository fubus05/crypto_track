import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Box, Checkbox } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { ICoins } from '../../pages/dashboard/dashboard.interface';
import { HeadCell } from '../../pages/dashboard/dashboard.interface';

interface ITableProp {
	headCells: HeadCell[];
	cells: ICoins[];
	checkbox: boolean;
	onFavorite: (element: ICoins) => void;
}

const useStyle = makeStyles({
	cells_base: {
		border: 'none'
	}
});

export const TableComponent = ({headCells, cells, checkbox, onFavorite}:ITableProp) => {
	const classes = useStyle();
		
	return(
		<Box paddingX={5}>
			<TableContainer>
				<Table 
					sx={{ minWidth: 750 }}
					size='medium'>
					<TableHead>
						<TableRow>
							{ checkbox && <TableCell padding="checkbox" style={{ visibility: 'hidden'}}/> }
							{headCells.map((item) => (
								<TableCell key={item.field}>
									{item.headerName}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{cells.map((element, index) => (
							<TableRow key={index}>
								{ checkbox && <TableCell padding="checkbox" className={classes.cells_base}>
									<Checkbox
										icon={<FavoriteBorder style={{ color: red[50] }} fontSize='small' />}
										checkedIcon={<Favorite style={{ color: red[500] }} />}
										onChange={() => onFavorite(element)}
									/>
								</TableCell>}
								{headCells.map((item) => (
									<TableCell key={item.field} className={classes.cells_base}>
										{item.renderCell ? item.renderCell(element) : element[item.field]}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};