import React, { useEffect, useState } from "react";
import moment from "moment";
import {
	makeStyles,
	Backdrop,
	CircularProgress,
	Snackbar,
	Modal,
	Fade,
	Divider,
	Grid,
	Button,
	Typography,
	Checkbox,
} from "@material-ui/core";
import YvesMUIFilters from "./YvesMUIFilters";
import YvesMUITable from "./YvesMUITable";
import YvesMUIForm from "./YvesMUIForm";
import TaskApi from "../api/TaskApi";
import { Alert } from "@material-ui/lab";

export default function Task() {
	const useStyles = makeStyles((theme) => ({
		paper: {
			maxWidth: "1600px",
			margin: "auto",
			overflow: "hidden",
		},
		title: {
			color: "rgba(0, 0, 0, 0.54)",
			padding: 0,
			fontSize: "1rem",
			fontFamily: "Roboto, Helvetica, Arial, sans-serif",
			fontWeight: 400,
			lineHeight: 1,
			letterSpacing: "0.00938em",
		},
		view_paper: {
			position: "absolute",
			width: "auto",
			height: "auto",
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
			outline: "none",
			borderRadius: "10px",
			overflow: "auto",
			top: `50%`,
			left: `50%`,
			transform: `translate(-50%, -50%)`,
		},
		view_details: {
			margin: "20px 0",
			padding: "20px",
		},
		view_button: {
			margin: "20px 0",
		},
		searchBar: {
			borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
		},

		searchInput: {
			fontSize: theme.typography.fontSize,
		},

		block: {
			display: "block",
		},

		addUser: {
			marginRight: theme.spacing(1),
		},

		contentWrapper: {
			margin: "40px 16px",
		},

		cell_break_word: { maxWidth: "400px", wordWrap: "break-word" },

		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: "#fff",
		},

		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},

		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	}));

	const classes = useStyles();

	const [raw_data, setRawData] = useState();
	const [rows, setRows] = useState([]);
	const [headers, setHeaders] = useState([]);
	const [page_count, setPageCount] = useState(0);
	const [form, setForm] = useState({
		open: false,
		mode: "CREATE",
		title: "Create Task",
		data: { title: "", details: "", completed: false },
		fields: [],
	});

	const [filter, setFilter] = useState({
		search: "",
		from: moment(new Date("2000-01-01T00:00:00")).format("MM/DD/YYYY, hh:mm A"),
		to: moment(new Date(Date.now())).format("MM/DD/YYYY HH:mm A"),
		page: 1,
		rows_per_page: 10,
	});
	const [filters, setFilters] = useState([]);
	const [extra_buttons, setExtraButtons] = useState([]);

	const [loader, setLoader] = useState(true);

	const [snack_bar, setSnackBar] = useState({
		open: false,
		result: false,
		message: "",
	});

	const [view, setView] = useState({
		open: false,
		title: "",
		details: "",
	});

	useEffect(() => {
		const init = () => {
			setHeaders(["Title", "Details", "Completed", "Action"]);

			setForm((prevState) => {
				return {
					...prevState,
					fields: [
						{ key: "title", required: true, type: "text" },
						{ key: "details", required: true, type: "text_area" },
						{ key: "completed", required: true, type: "check_box" },
					],
				};
			});

			// For csv export and create buttons
			setExtraButtons([
				{
					type: "create_button",
					mode: "CREATE",
					trigger: showForm,
					title: "Add New Task",
				},
			]);
		};
		init();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			if (loader === false) return;
			const { data } = await TaskApi.getAll(filter);
			if (!data.paginated) {
				setLoader(false);
				return;
			}
			setRawData(data.paginated.data);

			const datas = [];

			data.paginated.data.map((item) => {
				datas.push({
					id: item.id,
					Title: item.title,
					Details: item.details,
					Completed: item.completed ? (
						<Typography color="primary">Yes</Typography>
					) : (
						<Typography color="secondary">No</Typography>
					),
				});
			});

			setForm((prevState) => {
				return {
					...prevState,
					data: data.paginated.data[0],
				};
			});

			setRows(datas);

			setLoader(false);
			setPageCount(data.paginated.last_page);
		};
		fetchData();
	}, [filter, loader]);

	const showForm = (data, mode, e) => {
		let current_data = { title: "", details: "", completed: false };

		if (mode !== "CREATE") {
			current_data = raw_data.find((item) => {
				return item.id === data.id;
			});
		}

		setForm((prevState) => {
			return {
				...prevState,
				data: current_data,
				mode: mode,
				open: true,
				title: mode === "CREATE" ? "Create Task" : "Edit Task",
			};
		});
	};

	const handleChkChange = (data, e) => {
		console.log(data, e, raw_data);
	};

	const createChk = (item) => {
		return (
			<Checkbox
				onChange={(e) => {
					console.log(item, e, raw_data);
				}}
				checked={item.completed}
			/>
		);
	};
	const handleFilterChange = (field, e) => {
		let value = null;
		switch (field.type) {
			case "date_picker":
				value = moment(e.target.value).format("YYYY-MM-DD hh:mm:ss");
				break;
			case "check_box":
				value = e.target.checked;
			default:
				value = e.target.value;
		}

		setFilter((prevState) => {
			return {
				...prevState,
				page: field.type === "search" ? 1 : prevState.page,
				[field.key]: value,
			};
		});
	};

	const handleChangePage = (event, newPage) => {
		setFilter((prevState) => {
			return {
				...prevState,
				page: newPage,
			};
		});
	};

	const handleChangeRowsPerPage = (event) => {
		setFilter((prevState) => {
			return {
				...prevState,
				rows_per_page: parseInt(event.target.value, 10),
				page: 1,
			};
		});
	};

	const handleAction = (data, type, e) => {
		console.log(data);
		switch (type) {
			case "view":
				setView({ open: true, title: data.Title, details: data.Details });
				break;
			case "edit":
				showForm(data, "EDIT");
				break;
			case "delete":
				handleDelete(data);
				break;
		}
	};

	const handleFormClose = () => {
		setForm((prevState) => {
			return {
				...prevState,
				open: false,
			};
		});
	};

	const handleFrmFldChange = (state_name, value) => {
		const data = form.data;

		data[state_name] = value;
		setForm((prevState) => {
			return {
				...prevState,
				error: "",
				data,
			};
		});

		const check = validate(data);

		if (check.error) {
			console.log(check);

			setForm((prevState) => {
				return {
					...prevState,
					error: check.error,
				};
			});
		}
	};

	const validate = (data) => {
		const dont_validate = [
			"created_at",
			"completed",
			"deleted_at",
			"updated_at",
		];

		let error = "";
		Object.entries(data).map(([key, value]) => {
			if (
				!dont_validate.includes(key) &&
				(!value || value === "" || value === undefined)
			) {
				error += `${key.toUpperCase()} is required. <br/>`;
			}
		});

		if (error || error !== "" || error !== undefined) return { error };

		return true;
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		const data = form.data;

		const check = validate(data);

		if (check.error) {
			console.log(check);

			setForm((prevState) => {
				return {
					...prevState,
					error: check.error,
				};
			});
		} else {
			if (form.mode === "CREATE") {
				const { data } = await TaskApi.insert(form.data);
				setSnackBar({
					open: true,
					result: data.result,
					message: data.message,
				});
				setLoader(true);
			} else {
				const { data } = await TaskApi.update(form.data);
				setSnackBar({
					open: true,
					result: data.result,
					message: data.message,
				});
				setLoader(true);
			}

			handleFormClose();
		}
	};

	const handleDelete = async (data) => {
		const res = await TaskApi.delete(data);
		setLoader(true);
	};

	const handleSnackbarClose = () => {
		setSnackBar({ ...snack_bar, open: false });
	};

	const handleViewClose = () => {
		setView({ open: false });
	};

	return (
		<div className="App">
			<Typography component="h1" variant="h5">
				Todo App
			</Typography>
			<YvesMUIFilters
				filters={filters}
				extra_buttons={extra_buttons}
				is_loading={loader}
				handleFilterChange={handleFilterChange}
			/>
			<YvesMUITable
				rows={rows}
				filter={filter}
				headers={headers}
				page_count={page_count}
				handleChangePage={handleChangePage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				with_actions={[
					{ type: "view", handleAction },
					{ type: "edit", handleAction },
					{ type: "delete", handleAction },
				]}
			/>
			<YvesMUIForm
				data={form.data}
				title={form.title}
				error={form.error}
				mode={form.mode}
				open={form.open}
				fields={form.fields}
				handleClose={handleFormClose}
				handleFrmFldChange={handleFrmFldChange}
				handleSubmit={handleFormSubmit}
				width={12}
			/>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={view.open}
				onClose={handleViewClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={view.open}>
					<div className={classes.view_paper}>
						<Typography component="h1" variant="h5">
							{view.title}
						</Typography>
						<Divider className={classes.divider}></Divider>
						<Grid container spacing={2}>
							<Grid item md={12} sm={12}>
								<Typography className={classes.view_details}>
									{view.details}
								</Typography>
							</Grid>
							<Divider className={classes.divider}></Divider>
							<Grid item md={12} sm={12}>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="secondary"
									className={classes.view_button}
									onClick={handleViewClose}
								>
									Close
								</Button>
							</Grid>
						</Grid>
					</div>
				</Fade>
			</Modal>
			<Snackbar
				open={snack_bar.open}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
			>
				{snack_bar.result ? (
					<Alert
						onClose={handleSnackbarClose}
						elevation={6}
						severity="success"
						variant="filled"
					>
						{snack_bar.message}
					</Alert>
				) : (
					<Alert
						onClose={handleSnackbarClose}
						elevation={6}
						severity="error"
						variant="filled"
					>
						{snack_bar.message}
					</Alert>
				)}
			</Snackbar>
			<Backdrop className={classes.backdrop} open={loader}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
}
