import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/ validator";

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({ content: " " });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfog = {
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            },
            min: {
                message: "Имя состоит минимум из 3 символов",
                value: 3
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfog);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const clearForm = () => {
        setData({ content: " " });
        setErrors({});
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <TextAreaField
                    value={data.content || " "}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button disabled={!isValid} className="btn btn-primary">
                        Опубликовать
                    </button>
                </div>
            </form>
        </div>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
