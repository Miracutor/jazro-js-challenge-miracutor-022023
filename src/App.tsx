import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

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
			<Box position="relative" minHeight="100vh">
				<Box paddingBottom={{'xs':"7rem",'sm':"5rem"}}>
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
				</Box>
				<Footer>
					<Typography variant="h6" align="center" gutterBottom>
						Created by Muhammad Danial Danish Bin Roslan with{' '}
						<Box component="span" color="#f6423c">
							♥
						</Box>
					</Typography>
				</Footer>
			</Box>
		</ThemeProvider>
	);
};

export default App;

const Footer = styled('footer')(({ theme }) => ({
	width: '100%',
	backgroundColor: theme.palette.secondary.dark,
	position: 'absolute',
	bottom: 0,
	paddingTop: '10px',
	height: '3rem',
	[theme.breakpoints.down('sm')]: {
		height: '5rem',
	},
}));
