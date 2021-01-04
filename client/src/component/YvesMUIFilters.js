import React, { Fragment } from "react";

import {
	makeStyles,
	Checkbox,
	Grid,
	FormControlLabel,
	RadioGroup,
	Radio,
	FormLabel,
	Box,
	Typography,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	InputAdornment,
	Button,
	IconButton,
} from "@material-ui/core";
import "date-fns";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import SearchIcon from "@material-ui/icons/Search";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ReplayIcon from "@material-ui/icons/Replay";
import ClearIcon from "@material-ui/icons/Clear";
import DataUsageIcon from "@material-ui/icons/DataUsage";

export default function TableFilters({
	filters,
	extra_buttons = null,
	handleFilterChange,
}) {
	const useStyles = makeStyles((theme) => ({
		paper: {
			padding: theme.spacing(2),
			width: "100%",
		},

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

		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		toolbar: { backgroundColor: "#ffffff", padding: theme.spacing(2) },
		select: {
			width: "100%",
			textTransform: "capitalize",
		},
		buttons: {
			margin: "5px",
		},
	}));

	const classes = useStyles();

	const createFormFields = (field, index) => {
		return field ? (
			<Grid key={index} item>
				{chooseField(field)}
			</Grid>
		) : (
			""
		);
	};
	const chooseField = (field) => {
		switch (field.type) {
			case "text":
				return createTexfield(field);
			case "search":
				return createSearchField(field);
			case "select":
				return createSelectField(field);
			case "date_picker":
				return createDatePicker(field);
			case "check_box":
				return createCheckbox(field);
			case "radio_group":
				return createRadioGroup(field);
		}
	};

	const createCheckbox = (field) => {
		return (
			<FormControlLabel
				control={
					<Checkbox
						checked={field.value}
						onChange={handleFilterChange.bind(this, field)}
						name={field.key}
						color="primary"
					/>
				}
				label={field.label}
			/>
		);
	};

	const createSearchField = (field) => {
		return (
			<FormControl className={classes.formControl}>
				<TextField
					id="input-withcreate-icon-textfield"
					label={field.label}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon color="inherit" />
							</InputAdornment>
						),
					}}
					onBlur={handleFilterChange.bind(this, field)}
				/>
			</FormControl>
		);
	};

	const createSelectField = (field) => {
		return (
			<FormControl className={classes.formControl}>
				<InputLabel
					className={classes.select_capitalize}
					id="demo-simple-select-label"
				>
					{field.label
						? field.label.replace("_", " ").toLowerCase()
						: field.key.replace("_", " ").toLowerCase()}
				</InputLabel>
				<Select
					className={classes.select}
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={field.value}
					onChange={handleFilterChange.bind(this, field)}
				>
					<MenuItem key={0} value="all">
						All
					</MenuItem>
					{field.items.map((item, item_idx) => {
						let label = "";
						if (item.value) label = item.value;
						if (item.name) label = item.name;
						return (
							<MenuItem
								className={classes.select_capitalize}
								key={item_idx}
								value={item[field.key_value]}
							>
								{label.replace("_", " ").toLowerCase()}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		);
	};

	const createTexfield = (field) => {
		return (
			<FormControl className={classes.formControl}>
				<TextField
					className={classes.txt_capitalize}
					size="small"
					name={field.key}
					onChange={handleFilterChange.bind(this, field)}
					fullWidth
					defaultValue={field.value}
					id={field.key}
					label={field.key.replace(/_/g, " ")}
				/>
			</FormControl>
		);
	};

	const createDatePicker = (field) => {
		return field.show ? (
			<TextField
				label={field.label}
				type="datetime-local"
				defaultValue={field.value}
				className={classes.textField}
				onChange={handleFilterChange.bind(this, field)}
				InputLabelProps={{
					shrink: true,
				}}
			/>
		) : (
			""
		);
	};

	const createRadioGroup = (field) => {
		return (
			<FormControl component="fieldset">
				<FormLabel component="legend">{field.label}</FormLabel>
				<RadioGroup
					aria-label={field.key}
					name={field.key}
					value={field.value}
					onChange={handleFilterChange.bind(this, field)}
				>
					<Box display={field.display}>
						{field.radios.map((radio) => {
							return (
								<FormControlLabel
									value={radio.value}
									control={<Radio />}
									label={radio.label}
								/>
							);
						})}
					</Box>
				</RadioGroup>
			</FormControl>
		);
	};

	const createExtraButtons = (extra_buttons) => {
		const refund_button = extra_buttons.find((button) => {
			return button.type === "refund_button";
		});

		const create_button = extra_buttons.find((button) => {
			return button.type === "create_button";
		});

		const clear_filter = extra_buttons.find((button) => {
			return button.type === "clear_filter";
		});
		const generate_report = extra_buttons.find((button) => {
			return button.type === "generate_report";
		});
		return (
			<Grid item>
				{refund_button ? (
					<Tooltip title={refund_button.title}>
						<IconButton
							onClick={refund_button.trigger.bind(this, refund_button.data)}
						>
							<ReplayIcon color="inherit" />
						</IconButton>
					</Tooltip>
				) : (
					""
				)}
				{create_button ? (
					<Tooltip title={create_button.title}>
						<IconButton
							onClick={create_button.trigger.bind(
								this,
								null,
								create_button.mode
							)}
							size="medium"
							color="primary"
						>
							<AddBoxIcon color="inherit" />
						</IconButton>
					</Tooltip>
				) : (
					""
				)}
				{generate_report ? (
					<Fragment>
						<Tooltip title={generate_report.title}>
							<Button
								variant="contained"
								startIcon={<DataUsageIcon />}
								onClick={generate_report.generate}
							>
								Generate Report
							</Button>
						</Tooltip>
					</Fragment>
				) : (
					""
				)}

				{clear_filter ? (
					<Tooltip title={clear_filter.title}>
						<IconButton onClick={clear_filter.trigger}>
							<ClearIcon color="inherit" />
						</IconButton>
					</Tooltip>
				) : (
					""
				)}
			</Grid>
		);
	};

	return (
		<AppBar
			className={classes.searchBar}
			position="static"
			color="default"
			elevation={0}
		>
			<Toolbar className={classes.toolbar}>
				<Grid container spacing={2} alignItems="center">
					<Grid item md={12} sm={12}>
						<Typography>Table Filters</Typography>
					</Grid>

					{filters
						? filters.map((field, index) => {
								return createFormFields(field, index);
						  })
						: ""}

					{extra_buttons ? createExtraButtons(extra_buttons) : ""}
				</Grid>
			</Toolbar>
		</AppBar>
	);
}
