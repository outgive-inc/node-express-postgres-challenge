import React from "react";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilitySharpIcon from "@material-ui/icons/VisibilitySharp";
import { IconButton, makeStyles } from "@material-ui/core";
export default function ActionButtons({ action, data }) {
	const useStyles = makeStyles((theme) => ({
		paper: {
			maxWidth: "1600px",
			margin: "auto",
			overflow: "hidden",
		},
		button: {
			margin: "0 5px",
		},
	}));

	const classes = useStyles();

	const renderActionButtons = () => {
		switch (action.type) {
			case "view":
				return (
					<IconButton
						aria-label={action.type}
						color="primary"
						onClick={action.handleAction.bind(this, data, action.type)}
					>
						<VisibilitySharpIcon />
					</IconButton>
				);
			case "edit":
				return (
					<IconButton
						aria-label={action.type}
						color="primary"
						onClick={action.handleAction.bind(this, data, action.type)}
					>
						<EditIcon />
					</IconButton>
				);

			case "delete":
				return (
					<IconButton
						aria-label={action.type}
						color="secondary"
						onClick={action.handleAction.bind(this, data, action.type)}
					>
						<DeleteIcon />
					</IconButton>
				);
		}
	};

	return renderActionButtons();
}
