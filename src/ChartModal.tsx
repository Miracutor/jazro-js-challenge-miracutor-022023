import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const ChartModal = ({
	open,
	handleClose,
	chartData,
	codeData,
}: {
	open: boolean; //Modal open state
	handleClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void; //handle closing modal
	chartData: { country: string; population: number }[]; //data for chart
	codeData: Map<string, string>; //country code data for chart label reference
}) => {
	return (
		<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					minWidth: { xs: 400, sm: 750 },
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					p: 4,
				}}
			>
				<Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 4 }}>
					Population Chart
				</Typography>
				<ResponsiveContainer width="100%" height={400}>
					<BarChart data={chartData}>
						<CartesianGrid />
						<XAxis dataKey="country" />
						<YAxis
							tickFormatter={(value: number) =>
								new Intl.NumberFormat('en-US', {
									notation: 'compact',
									compactDisplay: 'short',
								}).format(value)
							}
						/>
						<Tooltip
							formatter={(value: any, name: any) => [
								new Intl.NumberFormat('en-US').format(Number(value)),
								name,
							]}
							labelFormatter={(value: string) => codeData.get(value)}
							labelStyle={{ color: 'black' }}
						/>
						<Bar dataKey="population" fill="#ef9e41" name="Population" />
					</BarChart>
				</ResponsiveContainer>
			</Box>
		</Modal>
	);
};

export default ChartModal;
