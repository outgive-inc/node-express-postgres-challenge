import React from "react";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import ActionButtons from "./YvesMUIButtons";
import clsx from "clsx";
import {
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	makeStyles,
	FormControl,
	Select,
	MenuItem,
	Grid,
	FormHelperText,
} from "@material-ui/core";

export default function YvesMUITable({
	rows,
	filter,
	headers,
	page_count,
	handleChangePage,
	handleChangeRowsPerPage,
	with_actions = null,
}) {
	const useStyles = makeStyles((theme) => ({
		paper: {
			maxWidth: "1600px",
			margin: "auto",
			overflow: "hidden",
		},
		table_cell: {
			maxWidth: "340px",
		},
		contentWrapper: {
			margin: "40px 16px",
		},
		cell_break_word: { wordWrap: "break-word" },
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: "#fff",
		},
		th: {
			fontWeight: "bold",
		},
		td: {
			padding: "8px",
			fontSize: "12px",
			maxWidth: "340px",
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
		grid_root: {
			flexGrow: 1,
			marginTop: "20px",
		},
		pagination: {
			"& > *": {
				marginTop: theme.spacing(2),
			},
		},
	}));

	const classes = useStyles();

	const checkStringLength = (str) => {
		if (!str) return "";
		return str.length > 50 ? classes.cell_break_word : "";
	};

	return (
		<div className={classes.contentWrapper}>
			{rows && rows.length > 0 ? (
				<TableContainer>
					<Table size="small">
						<TableBody>
							<TableRow>
								{headers.map((header, index) => {
									return (
										<TableCell
											key={index}
											className={clsx(
												checkStringLength(header),
												classes.td,
												classes.th
											)}
											component="th"
											scope="row"
										>
											{header}
										</TableCell>
									);
								})}
							</TableRow>
						</TableBody>
						<TableBody>
							{rows.map((row, idx) => {
								return (
									<TableRow key={idx}>
										{Object.entries(row).map((col, index) => {
											const col_name = col[0];

											const value = col[1];

											if (col_name === "id") return null;

											return (
												<TableCell
													key={index}
													className={clsx(checkStringLength(value), classes.td)}
													component="td"
													scope="row"
												>
													{value}
												</TableCell>
											);
										})}
										<TableCell component="td" scope="row">
											{with_actions
												? with_actions.map((action, index) => {
														const { render: Render } = action;
														if (action.type === "custom") {
															// return (
															// 	<Render
															// 		key={index}
															// 		onClick={action.handleAction.bind(
															// 			this,
															// 			row,
															// 			action.type
															// 		)}
															// 	/>
															// );
														} else {
															return (
																<ActionButtons
																	key={index}
																	action={action}
																	data={row}
																/>
															);
														}
												  })
												: ""}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					<Grid container className={classes.grid_root}>
						<Grid item xs={12}>
							<Grid container justify="center">
								<Grid item>
									<FormControl className={classes.formControl}>
										{/* <InputLabel id="demo-simple-select-label">
											Rows per page:
										</InputLabel> */}
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={filter.rows_per_page}
											onChange={handleChangeRowsPerPage}
										>
											<MenuItem value={5}>5</MenuItem>
											<MenuItem value={10}>10</MenuItem>
											<MenuItem value={15}>15</MenuItem>
											<MenuItem value={20}>20</MenuItem>
										</Select>
										<FormHelperText>Rows per page</FormHelperText>
									</FormControl>
								</Grid>
								<Grid item>
									<Pagination
										onChange={handleChangePage}
										count={page_count}
										defaultPage={1}
										color="primary"
										showFirstButton
										showLastButton
										className={classes.pagination}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</TableContainer>
			) : (
				<Typography color="textSecondary" align="center">
					No data
				</Typography>
			)}
		</div>
	);
}
