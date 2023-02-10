import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';

//Code split CountryTable
const CountryTable = React.lazy(() => import('./CountryTable'));

const theme = createTheme({
	palette: {
		primary: {
			main: '#ef9e41',
		},
		secondary: {
			main: '#4192ef',
		},
		background: { default: '#00234f' },
		mode: 'dark',
	},
});

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container maxWidth="md">
				<Box component="header" sx={{ mb: 5 }}>
					<Typography variant="h2" component="h1">
						JAZRO JavaScript Challenge
					</Typography>
					<Typography variant="h3" component="h2">
						Miracutor - 02/2023
					</Typography>
				</Box>
				<CountryTable />
			</Container>
			<Box component="footer" sx={{ bgcolor: 'secondary.dark', py: 4, mt: 5 }}>
				<Container maxWidth="lg">
					<Typography variant="h6" align="center" gutterBottom>
						Created by Muhammad Danial Danish Bin Roslan with{' '}
						<Box component="span" color="#f6423c">
							♥
						</Box>
					</Typography>
				</Container>
			</Box>
		</ThemeProvider>
	);
};

export default App;
