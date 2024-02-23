import { useState } from "react";
import "../styles/form.css";
import { useAddUserMutation } from "../../store";

function UserForm() {
    const [addUser, addUserRes] = useAddUserMutation();
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name.trim() === "" || job.trim() === "") {
            setSubmitted(true);
            return;
        }

        addUser({
            first_name: name,
            job: job,
            avatar: "https://reqres.in/img/faces/1-image.jpg",
        });

        setName("");
        setJob("");
        setSubmitted(false);
    };

    return (
        <div className="user-form">
            <h4 className="form-header">Add User</h4>
            <form onSubmit={handleSubmit}>
                <div className="field-group">
                    <div className="field">
                        <label className="label">Name</label>
                        <input
                            className={`input ${
                                submitted && name.trim() === "" && "invalid"
                            }`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                        />
                    </div>
                    <div className="field">
                        <label className="label">Job</label>
                        <input
                            className={`input ${
                                submitted && job.trim() === "" && "invalid"
                            }`}
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                            type="text"
                        />
                    </div>
                    <div className="field">
                        <button className="button">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UserForm;
