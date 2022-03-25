import { useState, useEffect } from 'react';
import { Box, Container, Card, TextField, Typography, Button, Radio, Grid, TableContainer, Table, TableRow, TableCell } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import MultiToggle from 'react-multi-toggle'
import MuiPhoneNumber from 'material-ui-phone-number';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { connect } from 'react-redux';
import { login } from 'src/reducers/auth/action';

const OnboardingWrapper = styled(Box)(
    () => `
    overflow: auto;
    flex: 1;
    text-align: center;
    overflow-x: hidden;
    align-items: center;
`
);

const PhoneWrapper = styled(Box)(
    () => `
    padding: 16px 32px 16px 32px;
`
);

const PinInputWrapper = styled(Box)(
    () => `
    padding: 0px 32px 0px 32px;
`
);

const KeyboardTable = styled(Table)(
    ({ theme }) => `
    border: 1px solid ${theme.general.borderColor};
    border-collapse: collapse;
    `
);

const KeyboardCell = styled(TableCell)(
    ({ theme }) => `
    border: 1px solid ${theme.general.borderColor};
    border-collapse: collapse;
    padding: 0;
    width: 80px;
    `
);

const KeyboardButton = styled(Button)(
    ({ theme }) => `
    width: 100%;
    height: 100%;
    color: black;
    font-size: 18px;
    border-radius: 0;
    font-weight: 500;
    `
);

const options = [
    { displayName: 'PIN', value: 0 },
    { displayName: 'PHONE', value: 1 }
]


const pinIndexes = [0, 1, 2, 3]
const keyboards = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'B']
];


function LoginPage({ token, admin, lastLoggedIn, login }) {
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState(1);
    const [showVerify, setShowVerify] = useState(false);
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [codeErr, setCodeError] = useState(false);
    const [pinCode, setPinCode] = useState('');

    useEffect(() => {
        if (pinCode.length === 4) {
            setViewMode(1);
        }
    }, [pinCode])

    useEffect(() => {
        if (token) {
            navigate('/dashboards');
        } else if (!lastLoggedIn) {
            navigate('/onboarding');
        }
    }, [token])

    return (
        <OnboardingWrapper>
            <Helmet>
                <title>Snackr - Vendor</title>
            </Helmet>
            <Container maxWidth='sm' sx={{ mt: 10 }}>
                <Grid container spacing={4}>
                    {
                        /*
                        <Grid item xs={12} className='text-center'>
                            <Box style={{ width: 240 }} className='mx-auto'>
                                <MultiToggle options={options} selectedOption={viewMode} onSelectOption={value => {
                                    setViewMode(value);
                                }}></MultiToggle>
                            </Box>
                        </Grid>
                        */
                    }
                    <Grid item xs={12}>
                        {
                            viewMode === 0 ? (
                                <Card sx={{ p: 8, pt: 8, mb: 10, borderRadius: 0 }}>
                                    <Typography sx={{ mb: 2 }} variant="h1">
                                        Enter Your PIN
                                    </Typography>
                                    <PinInputWrapper>
                                        <Grid container spacing={1} justifyContent='center'>
                                            {
                                                pinIndexes.map(index => {
                                                    return (
                                                        <Grid item>
                                                            <Radio color='primary' checked={index < pinCode.length} />
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Grid>
                                    </PinInputWrapper>
                                    <Box style={{ textAlign: 'center', paddingTop: 24 }}>
                                        <TableContainer style={{ maxWidth: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                                            <KeyboardTable>
                                                {
                                                    keyboards.map((row, rid) => {
                                                        return (
                                                            <TableRow key={rid}>
                                                                {
                                                                    row.map((cell, cid) => {
                                                                        return (
                                                                            <KeyboardCell key={cid}>
                                                                                {
                                                                                    cell.length > 0 &&
                                                                                    <KeyboardButton onClick={() => {
                                                                                        let newPinCode = pinCode;
                                                                                        if (cell === 'B') {
                                                                                            if (pinCode.length > 0) {
                                                                                                newPinCode = pinCode.substring(0, pinCode.length - 1);
                                                                                            }
                                                                                        } else if (cell.length > 0 && pinCode.length < 4) {
                                                                                            newPinCode = pinCode + cell;
                                                                                        }
                                                                                        setPinCode(newPinCode);
                                                                                    }}>
                                                                                        {
                                                                                            cell === 'B' ? <BackspaceOutlinedIcon sx={{ p: 0 }} fontSize='small' /> : cell
                                                                                        }
                                                                                    </KeyboardButton>
                                                                                }
                                                                            </KeyboardCell>
                                                                        )
                                                                    })
                                                                }
                                                            </TableRow>
                                                        )
                                                    })
                                                }
                                            </KeyboardTable>
                                        </TableContainer>
                                    </Box>

                                </Card>
                            ) : (
                                showVerify ? (
                                    <Card sx={{ p: 8, mt: 4, mb: 10, borderRadius: 0 }}>
                                        <Typography sx={{ mb: 2 }} variant="h1">
                                            2-Step Verification
                                        </Typography>
                                        <Typography component="span" variant="subtitle1">
                                            A text message with a verificiation code<br />
                                            has been sent to <b>{phone}</b>
                                        </Typography>
                                        <PhoneWrapper>
                                            <TextField
                                                variant='outlined'
                                                label='Verification Code'
                                                fullWidth
                                                value={code}
                                                helperText={
                                                    codeErr ? 'Wrong verification code' : 'Enter 4-digit code'
                                                }
                                                inputProps={{ maxLength: 4 }}
                                                error={codeErr}
                                                style={{ fontSize: 18 }}
                                                onChange={(e) => {
                                                    setCode(e.target.value);
                                                }}
                                            />
                                        </PhoneWrapper>
                                        <PhoneWrapper>
                                            <Button variant='contained' color='primary' disabled={!code || code.length !== 4} fullWidth onClick={() => {
                                                navigate('/dashboards')
                                            }}>Verify</Button>
                                        </PhoneWrapper>
                                        <div>
                                            Didn't receive a code? <Button size='small'>Try Again</Button>
                                        </div>
                                    </Card>
                                ) : (
                                    <Card sx={{ p: 8, mt: 4, mb: 10, borderRadius: 0 }}>
                                        <Typography sx={{ mb: 2 }} variant="h1">
                                            Login With Phone
                                        </Typography>
                                        <Typography component="span" variant="subtitle1">
                                            Let’s make sure it’s really you.<br />
                                            Your phone number will be used for 2-Step Verification.
                                        </Typography>
                                        <PhoneWrapper>
                                            <MuiPhoneNumber
                                                variant='outlined'
                                                fullWidth
                                                value={phone}
                                                style={{ fontSize: 18 }}
                                                defaultCountry={'us'}
                                                disableAreaCodes={true}
                                                onChange={(value) => {
                                                    setPhone(value);
                                                }}
                                            />
                                        </PhoneWrapper>
                                        <PhoneWrapper>
                                            <Button disabled={!phone || phone.length < 8} variant='contained' color='primary' fullWidth onClick={() => {
                                                setShowVerify(true);
                                            }}>Next</Button>
                                        </PhoneWrapper>
                                    </Card>
                                )
                            )
                        }
                    </Grid>
                </Grid>
            </Container>
        </OnboardingWrapper >
    );
}

function reduxState(state) {
    return {
        ...state.auth
    }
}
export default connect(reduxState, { login })(LoginPage);
