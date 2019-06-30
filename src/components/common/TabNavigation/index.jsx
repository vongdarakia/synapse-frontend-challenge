import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/HomeRounded";
import LocalAtmIcon from "@material-ui/icons/LocalAtmRounded";
import AccountBalanceIcon from "@material-ui/icons/AccountBalanceRounded";
import PersonIcon from "@material-ui/icons/PersonRounded";

const useStyles = makeStyles({
    root: {
        width: "100%"
    }
});

function TabNavigation({ history }) {
    const [value, setValue] = React.useState("recents");
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);

        history.push(newValue);
    };

    return (
        <BottomNavigation
            id="bottom-nav"
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
                icon={<LocalAtmIcon />}
            />
            <BottomNavigationAction
                label="Banking"
                value="/banking"
                icon={<AccountBalanceIcon />}
            />
            <BottomNavigationAction
                label="Account"
                value="/account"
                icon={<PersonIcon />}
            />
        </BottomNavigation>
    );
}

export default withRouter(TabNavigation);
