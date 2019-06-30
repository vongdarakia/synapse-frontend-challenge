import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useAuthState } from "../../common/AuthContext";
import SynapseAPI from "../../../api/synapse-api";
import UnauthenticatedHome from "./UnauthenticatedHome";
import AuthenticatedHome from "./AuthenticatedHome";

const HomeView = ({ history }) => {
    const { user, userBalance } = useAuthState();
    const [transactionsByMonth, setTransactionsByMonth] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTransactions = async () => {
            const data = await SynapseAPI.viewTransactions(user._id);

            if (data.trans) {
                const months = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ];
                const abrMonths = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ];
                const daysOfWeek = [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat"
                ];
                const transactionTable = {};

                // Organizes the transactions so that they can be grouped
                // by months and days
                data.trans.forEach(transaction => {
                    const date = new Date(
                        transaction.timeline[
                            transaction.timeline.length - 1
                        ].date
                    );
                    const month = date.getMonth();
                    const day = date.getDate();
                    const dayOfWeek = date.getDay();

                    if (transactionTable[month]) {
                        if (transactionTable[month][day]) {
                            transactionTable[month][day].transactions.push(
                                transaction
                            );
                        } else {
                            transactionTable[month][day] = {
                                dayOfWeek,
                                transactions: [transaction]
                            };
                        }
                    } else {
                        transactionTable[month] = {
                            [day]: {
                                dayOfWeek,
                                transactions: [transaction]
                            }
                        };
                    }
                });

                // Remap data into an array list of those objects. This makes it easier to
                // render
                const transactionsByMonth = Object.keys(transactionTable).map(
                    month => ({
                        month,
                        groupName: `${months[month]} Transactions`,
                        transactionsByDay: Object.keys(
                            transactionTable[month]
                        ).map(day => {
                            const {
                                dayOfWeek,
                                transactions
                            } = transactionTable[month][day];
                            return {
                                day,
                                groupName: `${daysOfWeek[dayOfWeek]}, ${
                                    abrMonths[month]
                                } ${day}`,
                                transactions
                            };
                        })
                    })
                );
                setTransactionsByMonth(transactionsByMonth);
            } else if (data.error) {
                setError(data.error.en);
            }
        };

        if (user) {
            loadTransactions();
        }
    }, [user]);

    if (user) {
        return (
            <AuthenticatedHome
                userBalance={userBalance}
                error={error}
                transactionsByMonth={transactionsByMonth}
            />
        );
    }

    const login = () => {
        history.push("/login");
    };

    const signUp = () => {
        history.push("/sign-up");
    };

    return <UnauthenticatedHome onClickLogin={login} onClickSignUp={signUp} />;
};

export default withRouter(HomeView);
