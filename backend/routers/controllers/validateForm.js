const Yup = require('yup');

const formSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").min(6, "Username too short").max(20, "Username too long!"),
    password: Yup.string().required("Password is required").min(6, "Password too short").max(20, "Password too long!"),
});

const validateForm = (req, res) => {
    const formData = req.body;
    formSchema
        .validate(formData) // Validate the form data
        .catch(err => { // If there is an error, send it back to the client
            res.status(422).send(); // Send a 422 status code to the client
            console.log(err.errors); // Log the errors to the console
        })
        .then(valid => { // If the form data is valid, then the promise will resolve
            if (valid) {
                console.log("Form is valid");
            }
        });
}

module.exports = validateForm;