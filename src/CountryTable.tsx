import React, { useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridSelectionModel,
	GridToolbarContainer,
	GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import axios from 'axios';
import Image from 'mui-image';

const ChartModal = React.lazy(() => import('./ChartModal')); //Code split ChartModal

interface CountryData {
	no: number;
	name: string;
	region: string;
	capital: string;
	population: number;
	alpha3Code: string;
}

interface FlagData {
	svg: string;
	png: string;
}

//Fetch countries data using API
const fetchCountriesData = async () => {
	// The given REST endpoint do not valid: https://restcountries.eu/rest/v2/all
	const { data } = await axios.get('https://restcountries.com/v2/all');
	return processCountriesData(data);
};

//Process fetched data for table use
const processCountriesData = (data: any[]) => {
	const newData: CountryData[] = [];
	data.forEach((value, index) => {
		newData.push({ id: index + 1, ...value });
	});
	return newData;
};

//Column definition
const columns: GridColDef[] = [
	{ field: 'id', headerName: 'No.', width: 60, getApplyQuickFilterFn: undefined },
	{
		field: 'flags',
		headerName: '',
		width: 80,
		sortable: false,
		renderCell: (params: GridRenderCellParams<FlagData>) => {
			if (params.value == null) return '';

			return (
				<Image
					src={params.value.png}
					width={80}
					height={50}
					showLoading={<Skeleton width={80} height={50} variant="rectangular" />}
					loading="lazy"
				/>
			);
		},
		getApplyQuickFilterFn: undefined,
	},
	{ field: 'name', headerName: 'Name', width: 250 },
	{ field: 'region', headerName: 'Region', width: 190, getApplyQuickFilterFn: undefined },
	{ field: 'capital', headerName: 'Capital', width: 190 },
];

//Custom table toolbar because default toolbar cannot be turned off the export button
const CustomToolbar = () => {
	return (
		<GridToolbarContainer>
			<Box sx={{ flex: 1 }} />
			<GridToolbarQuickFilter />
		</GridToolbarContainer>
	);
};

const CountryTable = () => {
	const [countries, setCountries] = useState<CountryData[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
	const [openChartModal, setOpenChartModal] = useState(false);
	const [chartData, setChartData] = useState<{ country: string; population: number }[]>([]);

	useEffect(() => {
		fetchCountriesData().then((it) => {
			setCountries(it);
			setLoading(false);
		}); //Fetch country data once only when component mounted
	}, []);

	//Storage mechanism
	const jazroMuiSelectionModel: GridSelectionModel =
		localStorage
			.getItem('jazro-mui-selection-model')
			?.split(', ')
			.map((e) => Number(e)) || []; //Fecth stored data from localStorage if available

	useEffect(() => {
		setSelectionModel(jazroMuiSelectionModel); //Only load value from localStorage on first render.
		//Using localStorage directly is too slow
	}, []);

	const handleSelectionModelChange = (newSelectionModel: GridSelectionModel) => {
		setSelectionModel(newSelectionModel); //Save to state first
		localStorage.setItem('jazro-mui-selection-model', newSelectionModel.join(', '));
	};

	const handleOpenModal = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setOpenChartModal(true);
		setChartData(getPopulationChartData());
	};

	const handleCloseModal = () => {
		setOpenChartModal(false);
	};

	//For generating data for use with the chart
	const getPopulationChartData = () => {
		const selectedCountries: CountryData[] = selectionModel.map((it) => countries[Number(it) - 1]);
		return selectedCountries.map((it) => {
			return { country: it.alpha3Code, population: it.population };
		});
	};

	//For the chart tooltip label formatting, country code to full country name
	const CountryCodeData = useMemo(() => {
		const data = new Map<string, string>();
		countries.forEach((it) => {
			data.set(it.alpha3Code, it.name);
		});
		return data;
	}, [countries]);

	return (
		<>
			<div style={{ height: 450, width: '100%' }}>
				<div style={{ display: 'flex', height: '100%' }}>
					<div style={{ flexGrow: 1 }}>
						<DataGrid
							sx={{
								boxShadow: 2,
							}}
							checkboxSelection //enable selection
							disableColumnMenu
							loading={loading}
							selectionModel={selectionModel}
							onSelectionModelChange={handleSelectionModelChange}
							rows={countries}
							columns={columns}
							components={{ Toolbar: CustomToolbar, LoadingOverlay: LinearProgress }}
							componentsProps={{
								toolbar: {
									showQuickFilter: true,
									quickFilterProps: { debounceMs: 500 },
								},
							}}
						/>
					</div>
				</div>
			</div>
			<Button variant="contained" onClick={handleOpenModal} sx={{ mt: 2 }}>
				Generate Population Chart
			</Button>
			<ChartModal
				open={openChartModal}
				handleClose={handleCloseModal}
				chartData={chartData}
				codeData={CountryCodeData}
			/>
		</>
	);
};

export default CountryTable;
