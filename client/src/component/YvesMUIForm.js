import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ucwords } from "../Helpers";

import {
	Typography,
	Grid,
	TextField,
	Button,
	Select,
	Divider,
	InputLabel,
	FormControl,
	Fade,
	FormControlLabel,
	Checkbox,
	Modal,
	Backdrop,
	TextareaAutosize,
} from "@material-ui/core";

export default function YvesMUIForm({
	title,
	error,
	open,
	mode,
	fields,
	handleClose,
	handleSubmit,
	handleFrmFldChange,
	data,
	width,
}) {
	const useStyles = makeStyles((theme) => ({
		paper: {
			position: "absolute",
			width: "auto",
			height: "auto",
			minWidth: "500px",
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
		divider: {
			margin: "20px 0",
		},
		root: {
			flexGrow: 1,
			margin: "20px 0",
		},
		label: {
			color: "rgba(0, 0, 0, 0.54)",
			padding: 0,
			fontSize: "1rem",
			fontFamily: "Roboto, Helvetica, Arial, sans-serif",
			fontWeight: 400,
			lineHeight: 1,
			letterSpacing: "0.00938em",
		},
		select_root: { padding: "3px 0 7px", textTransform: "capitalize" },
		grid_cont: { overflow: "auto", maxHeight: "700px" },
		select_capitalize: {
			textTransform: "capitalize",
		},
		txt_capitalize: {
			textTransform: "capitalize",
		},
		form: {
			width: "100%", // Fix IE 11 issue.
			marginTop: theme.spacing(3),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
		},
		formControl: {
			margin: 0,
			width: "100%",
		},
		select: {
			width: "100%",
			textTransform: "capitalize",
		},
	}));

	const classes = useStyles();

	const validate = (e, editable) => {
		if (e.target.value === "" && editable.required) editable.error = true;
	};
	const createFormFields = (field, index, editable) => {
		const key = field[0];
		const value = field[1];

		return editable ? (
			<Grid key={index} item md={width} sm={width}>
				{chooseField(key, value, editable)}
			</Grid>
		) : (
			""
		);
	};

	const chooseField = (key, value, editable) => {
		switch (editable.type) {
			case "text":
				return createTexfield(key, value, editable);
			case "select":
				return createSelectField(key, value, editable);
			case "check_box":
				return createChkField(key, value, editable);
			case "text_area":
				return createTexArea(key, value, editable);
			case "custom":
				return createCustomField(key, editable);
		}
	};

	const createSelectField = (key, value, editable) => {
		return (
			<FormControl className={classes.formControl}>
				<InputLabel htmlFor={`outlined-${key}-native-simple`}>
					{editable.label}
				</InputLabel>
				<Select
					native
					value={value}
					onChange={(e) => {
						handleFrmFldChange(editable.key, e.target.value);
					}}
					label={editable.label}
					inputProps={{
						name: editable.label,
						id: `outlined-${key}-native-simple`,
						classes: { root: classes.select_root },
					}}
				>
					<option className={classes.select_capitalize} value={null}>
						--- Select ---
					</option>
					{editable.items.map((field, index) => {
						return (
							<option
								className={classes.select_capitalize}
								value={field.id !== undefined ? field.id : field.value}
								key={index}
							>
								{editable.dropdown_label
									? field[editable.dropdown_label]
											.replace("_", " ")
											.toLowerCase()
									: field.name.replace("_", " ").toLowerCase()}
							</option>
						);
					})}
				</Select>
			</FormControl>
		);
	};

	const createTexfield = (key, value, editable) => {
		const label = key.replace(/_/g, " ");
		return (
			<FormControl variant="outlined" className={classes.formControl}>
				<TextField
					className={classes.txt_capitalize}
					size="small"
					name={key}
					required={editable.required}
					onChange={(e) => {
						validate(e, editable);
						handleFrmFldChange(key, e.target.value);
					}}
					fullWidth
					defaultValue={value}
					id={key}
					label={label}
				/>
			</FormControl>
		);
	};

	const createTexArea = (key, value, editable) => {
		const label = key.replace(/_/g, " ");
		return (
			<FormControl variant="outlined" className={classes.formControl}>
				<label className={classes.label}>
					{ucwords(key.replace(/_/g, " "))}:
				</label>
				<TextareaAutosize
					placeholder="Add content here..."
					style={{ border: "2px solid #cacaca", padding: "10px" }}
					rowsMin={4}
					onChange={(e) => {
						validate(e, editable);
						handleFrmFldChange(key, e.target.value);
					}}
					label={label}
					defaultValue={value}
				/>
			</FormControl>
		);
	};

	const createChkField = (key, value, editable) => {
		return (
			<FormControl variant="outlined" className={classes.formControl}>
				<FormControlLabel
					className={classes.txt_capitalize}
					control={
						<Checkbox
							checked={value}
							onChange={(e) => {
								handleFrmFldChange(editable.key, e.target.checked);
							}}
							name={key}
							color="primary"
						/>
					}
					label={key.replace(/_/g, " ")}
				/>
			</FormControl>
		);
	};

	const createCustomField = (key, editable) => {
		return (
			<div>
				<InputLabel>{ucwords(key.replace(/_/g, " "))}:</InputLabel>
				{editable.component ? editable.component : null}
			</div>
		);
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<Typography component="h1" variant="h5">
							{title}
						</Typography>
						<Divider className={classes.divider}></Divider>
						<Typography
							color="secondary"
							dangerouslySetInnerHTML={{ __html: error }}
						></Typography>
						<form className={classes.form} onSubmit={handleSubmit} noValidate>
							<Grid container className={classes.grid_cont} spacing={1}>
								{data
									? Object.entries(data).map((field, index) => {
											const editable = fields.find((f) => {
												return f.key === field[0];
											});
											return createFormFields(field, index, editable);
									  })
									: ""}
							</Grid>
							<Divider className={classes.divider}></Divider>
							<Grid container spacing={2}>
								<Grid item md={6} sm={6}>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
									>
										{mode === "CREATE" ? "Add" : "Update"}
									</Button>
								</Grid>
								<Grid item md={6} sm={6}>
									<Button
										fullWidth
										variant="contained"
										color="secondary"
										className={classes.submit}
										onClick={handleClose}
									>
										Cancel
									</Button>
								</Grid>
							</Grid>
						</form>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
