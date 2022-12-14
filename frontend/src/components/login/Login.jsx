import { VStack, ButtonGroup, FormControl, FormLabel, Button, FormErrorMessage, Input, Heading, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { AccountContext } from '../AccountContext';


const Login = () => {

    const navigate = useNavigate();
    const {setUser} = useContext(AccountContext);
    const [errorMessage, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username required!').min(6, "Username must be at least 6 characters").max(28, "Username must be at most 28 characters"),
            password: Yup.string().required('Password required!').min(6, "Password must be at least 6 characters").max(28, "Password too long!")
        }),
        onSubmit: (values, actions) => {
            const vals = {...values} // copy the values
            actions.resetForm(); // reset the form
            fetch('http://localhost:4000/auth/login', { // post the values to the login route
                method: 'POST',
                credentials: 'include', // include the cookies
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(vals) // post vals as a JSON string
                }).catch(err => {
                    return;
                }).then(res => {
                    if (!res || !res.ok || res.status >= 400) {
                        return;
                    }
                    return res.json();
                })
                .then(data => {
                    if (!data) return; // if no data, return
                    console.log(data); // log the data in the browser console
                    setUser({ ...data}) // set the user to the data
                    if (data.status) {
                        console.log(data.status)
                        setError(data.status); // if there is a status, set the error to the status
                    } else if (data.loggedIn){
                        navigate('/home'); // if the user is logged in, navigate to the home page
                    }
                })
        }
    });
    
    return <VStack as="form" w={{base: "90%", md: "500px"}} m="auto" justify="center" h="100vh" spacing="1rem" onSubmit={formik.handleSubmit}>
        <Heading as="h1" size="2xl">Log In</Heading>
        console.log(errorMessage)
        <Text as="p" color="red.500">{errorMessage}</Text>
        <FormControl isInvalid={formik.errors.username && formik.touched.username}>
            <FormLabel fontSize="lg">Username</FormLabel>
            <Input
              name="username"
              placeholder="Enter Username"
              autoComplete="off"
              size="lg"
              {...formik.getFieldProps('username')}
            />
            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.errors.password && formik.touched.password}>
            <FormLabel fontSize="lg">Password</FormLabel>
            <Input
              name="password"
              placeholder="Enter Password"
              autoComplete="off"
              size="lg"
              type="password"
              {...formik.getFieldProps('password')}
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        <ButtonGroup paddingTop="1rem">
            <Button type="submit" colorScheme="teal">Login</Button>
            <Button onClick={() => navigate("/signup")}>Create Account</Button>
        </ButtonGroup>
    </VStack>
}

export default Login;


