import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Styled = styled.div`
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #btn-join {
        width: 195px;
        margin-top: 12px;
    }
`;

const SignUp = ({ onClickJoin, loading, error }) => {
    const [phone = "", setPhone] = useState();
    const [firstName = "", setFirstName] = useState();
    const [lastName = "", setLastName] = useState();
    const [email = "", setEmail] = useState();
    const [password = "", setPassword] = useState();

    return (
        <Styled>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    onClickJoin({
                        firstName,
                        lastName,
                        email,
                        password,
                        phone
                    });
                }}
            >
                <TextField
                    id="input-first-name"
                    label="First Name"
                    type="text"
                    margin="dense"
                    variant="outlined"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    id="input-last-name"
                    label="Last Name"
                    type="text"
                    margin="dense"
                    variant="outlined"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    id="input-email"
                    label="Email"
                    type="email"
                    margin="dense"
                    variant="outlined"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    id="input-password"
                    label="Password"
                    type="password"
                    margin="dense"
                    variant="outlined"
                    autoComplete="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    id="input-phone"
                    label="Mobile number"
                    type="tel"
                    margin="dense"
                    variant="outlined"
                    autoComplete="phone"
                    value={phone}
                    onChange={e => {
                        var n = e.target.value
                            .replace(/\D/g, "")
                            .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                        const number = !n[2]
                            ? n[1]
                            : "(" +
                              n[1] +
                              ") " +
                              n[2] +
                              (n[3] ? "-" + n[3] : "");
                        setPhone(number);
                    }}
                    disabled={loading}
                />
                {error && <div>{error}</div>}
                <Button
                    id="btn-join"
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={
                        !email || !password || phone.length !== 14 || loading
                    }
                >
                    {loading ? "Signing up..." : "Join Dave"}
                </Button>
            </form>
        </Styled>
    );
};

export default SignUp;
