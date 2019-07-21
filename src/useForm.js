import React, {useState,useEffect} from 'react'

const useForm = (callback, validate) => {

    // form values
    const [values, setValues] = useState({});

    // from errors
    const [errors, setErrors] = useState({});

    // submit handler
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
          callback();
        }
    }, [errors]);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
        console.log(values)
      };
    
      const handleChange = (event) => {
        event.persist();
        setValues(values => 
            ({ 
                ...values, 
                [event.target.name]: event.target.value 
            }));
      };
    
      return {
        handleChange,
        handleSubmit,
        values,
        errors,
      }
}

export default useForm;