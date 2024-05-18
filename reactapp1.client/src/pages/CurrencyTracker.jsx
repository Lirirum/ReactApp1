import { useEffect, useState } from 'react';

import { HubConnectionBuilder, HttpTransportType, LogLevel } from '@microsoft/signalr';
import { Container, Typography, Select, MenuItem, FormControl, InputLabel, Box, TextField, Button, useTheme, } from '@mui/material';
import Header from "../components/Admin/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../theme";

const CurrencyTracker = () => {
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [targetCurrency, setTargetCurrency] = useState('UAH');
    const [amount, setAmount] = useState(1);

    const [exchangeRate, setExchangeRate] = useState(null);
    const [connection, setConnection] = useState(null);
    const [connectionId, setConnectionId] = useState(null);

    const [isConnected, setIsConnected] = useState(false);

    const [currencyList, setCurrencyList] = useState([]);
    const isNonMobile = useMediaQuery("(min-width:600px)");
   

    useEffect(() => {
        getCurrency();
        const newConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:5172/hub", {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
            }).configureLogging(LogLevel.Information)
            .build();
        setConnection(newConnection)

       
        return () => {
            if (isConnected) {
                connection.stop();
            }
        };
    }, []);


    useEffect(() => {
        if (connection && currencyList) {

            startConnection();

        }


    }, [connection]);


    const startConnection = async () => {

            connection.start()
                .then(() => {
                    console.log('Connected to SignalR Hub');
                    setIsConnected(true);
                    setConnectionId(connection.connectionId)
                    connection.on('ReceiveCurrencyUpdate', (newRate) => {
                        setExchangeRate(newRate);
                    });
                    invokeSubscription();
                })
                .catch((error) => {
                    console.error('Error connecting to SignalR Hub:', error);
                });

        

    };


    async function getCurrency (){
       


        const response = await fetch(`currency/currencies/`, {
            method: 'GET',
            headers: {
                Accept: "application/json"
            }

        });
        if (response.ok) {
            const data = await response.json();
            setCurrencyList(data);
         

        } else {
            console.log(response.status);
        }

    }



    const invokeSubscription = async () => {
        if (connection) {
            await connection.invoke('SubscribeToCurrencyUpdates', baseCurrency, targetCurrency, amount);
        }

    };

    const changeSubscription = async () => {
        await connection.invoke("ChangeCurrencySubscription", baseCurrency, targetCurrency, amount)
            .then(() => {
                console.log("Subscription changed successfully");
            })
            .catch(error => {
                console.error("Error changing subscription:", error);
            });

    };


  const unsubscribeFromUpdates = async () => {
    try {
        if (connection) {

            await connection.invoke('UnsubscribeFromCurrencyUpdates');
         
        }
    } catch (error) {
        console.error("Error unsubscribing from updates:", error);
    }
};


    const handleBaseCurrencyChange = (event) => {
        setBaseCurrency(event.target.value);
    };

    const handleTargetCurrencyChange = (event) => {
        setTargetCurrency(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };



    const handleSubscribe = (values) => {
  
        connection.stop().then(() => {
            setBaseCurrency(values.baseCurrency);
            setTargetCurrency(values.targetCurrency)
            setAmount(10)
            console.log(values.targetCurrency)
            startConnection();
        });
        
        console.log(connection.state)
       
       
       
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
            <Header title="CREATE PRODUCT" subtitle="Create a New Product Profile" />
            <Formik
                onSubmit={handleSubscribe}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                "& .MuiSelect-select": {
                                    backgroundColor: `${colors.primary[400]} !important`
                                }
                            }}
                        >
                            
                            <FormControl sx={{
                                gridColumn: "span 2",
                            }}>
                                <InputLabel id="baseCurrency-label">Currency Name</InputLabel>
                                <Select

                                    value={values.baseCurrency}
                                    onChange={handleChange}
                                    name="baseCurrency"
                                    displayEmpty
                                    labelId="baseCurrency-label"

                                >
                                    <MenuItem value="" disabled>
                                        Select an option
                                    </MenuItem>
                                    {currencyList.map((item, key) => (
                                        <MenuItem key={key} value={item}>{item}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>


                            <FormControl sx={{
                                gridColumn: "span 2",
                            }}>
                                <InputLabel id="targetCurrency-label">Currency Name</InputLabel>
                                <Select
                                  
                                    value={values.targetCurrency}
                                    onChange={handleChange}
                                    name="targetCurrency"
                                    displayEmpty
                                    labelId="targetCurrency-label"

                                >
                                    <MenuItem value="" disabled>
                                        Select an option
                                    </MenuItem>                           
                                    {currencyList.map((item, key) => (
                                        <MenuItem key={key} value={item}>{item}</MenuItem>
                                    ))}
                                  
                                </Select>
                            </FormControl>
                        
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="I have"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.amount}
                                name='amount'              
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                disabled
                                fullWidth
                                variant="filled"
                                type="number"
                          
                                onBlur={handleBlur}                            
                                value={exchangeRate}
                                name='exchangeRate'                         
                                sx={{ gridColumn: "span 2" }}
                            />

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained" >
                                Subscribe
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>

       

       
    );
};
const checkoutSchema = yup.object().shape({

    amount: yup.number()
 

});
const initialValues = {
    baseCurrency: 'USD',
    targetCurrency: 'UAH',
    amount: 1,

};

export default CurrencyTracker;
