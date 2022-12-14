import { VStack, ButtonGroup, FormControl, FormLabel, Button, FormErrorMessage, Input, Heading, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { AccountContext } from '../AccountContext';

const SignUp = () => {

    const {setUser} = useContext(AccountContext); // get the setUser function from the AccountContext
    const navigate = useNavigate();
    const [errorMessage, setError] = useState(null);
    const formik = useFormik({ // formik is a library that helps creating forms
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({ // Yup is a library that helps with form validation
            username: Yup.string().required('Username required!').min(6, "Username must be at least 6 characters").max(28, "Username must be at most 28 characters"),
            password: Yup.string().required('Password required!').min(6, "Password must be at least 6 characters").max(28, "Password too long!")
        }),
        onSubmit: (values, actions) => { // when the form is submitted..
            const vals = {...values} // copy the values
            actions.resetForm(); // reset the form
            fetch('http://localhost:4000/auth/signup', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(vals) // post vals as a JSON string
                }).catch(err => {
                    return; // if there is an error, return
                }).then(res => {
                    if (!res || !res.ok || res.status >= 400) {
                        return; // if there is no response, or the response is not ok, or the status is >= 400, return
                    }
                    return res.json(); // if non of the above, return the response as JSON
                })
                .then(data => {
                    if (!data) return; // if no data, return
                    console.log(data); // log the data in the browser console
                    setUser({ ...data}) // set the user to the data
                    if (data.status) {
                        setError(data.status); // if there is a status, set the error to the status
                    } else if (data.loggedIn){
                        navigate('/home'); // if the user is logged in, navigate to the home page
                    }
                })
        }
    })

    return <VStack as="form" w={{base: "90%", md: "500px"}} m="auto" justify="center" h="100vh" spacing="1rem" onSubmit={formik.handleSubmit}>
        <Heading as="h1" size="2xl">Sign Up</Heading>
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
            <Button type="submit" colorScheme="teal">Create Account</Button>
            <Button onClick={() => navigate("/")} leftIcon={<ArrowBackIcon />}>Back</Button>
        </ButtonGroup>
    </VStack>
}

export default SignUp;
