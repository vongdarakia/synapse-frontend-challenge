import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Icon from "@material-ui/core/Icon";
import HomeIcon from "@material-ui/icons/HomeRounded";
import AttachMoneyIcon from "@material-ui/icons/AttachMoneyRounded";
import AccountBalanceIcon from "@material-ui/icons/AccountBalanceRounded";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles({
    root: {
        width: "100%"
    }
});

function TabNavigation({ history }) {
    const classes = useStyles();
    const [value, setValue] = React.useState("recents");

    const handleChange = (event, newValue) => {
        setValue(newValue);

        history.push(newValue);
    };

    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            className={classes.root}
            showLabels
        >
            <BottomNavigationAction
                label="Home"
                value="/"
                icon={<HomeIcon />}
            />
            <BottomNavigationAction
                label="Advances"
                value="/advances"
                icon={<AttachMoneyIcon />}
            />
            <BottomNavigationAction
                label="Banking"
                value="/banking"
                icon={<AccountBalanceIcon />}
            />
        </BottomNavigation>
    );
}

export default withRouter(TabNavigation);
