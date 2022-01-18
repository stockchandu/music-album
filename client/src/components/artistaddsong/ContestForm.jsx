import { useState } from "react";
import { useDispatch } from "react-redux";
import { contestLoading,  contestError, postContest } from "../../store/conteststore/action"
import axios from 'axios';
import "../addstudent/studentform.css";
import { ContestList } from "./ContestList";
import { baseURL } from "../utility/utility";
export const ContestForm = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        title: "",
        deadline: "",
        type: "",
        tags: "",
        time: "",
        author: ""
    })

    const [load, setLoad] = useState(false)

    const handleChange = (e) => {
        let { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        })
    }

    const { title, deadline, type, tags, time, author } = input;

    const handleSubmit = () => {

        if (!title || !deadline || !type || !tags || !time || !author) {
            alert("Fill all the details of contest")
            return false
        }
        else {
            setLoad(true)
            dispatch(contestLoading(true));
            window.location.reload();
            axios.post(`${baseURL}/create_contest`, {
                title, deadline, type, tags, time, author
            }).then(({ data }) => {
                dispatch(postContest(data));
                setLoad(false);
                // window.location.reload()
            }).catch(err => {
                dispatch(contestError(err));
            })


        }

    }

    return (
        <>
            {/* <form onSubmit={handleSubmit}> */}

            <div className="main-parent">
                <div className="student-form-container" >
                    <div className="student__input">
                        <div>
                            <div>Title</div>
                            <input type="text" name="title" onChange={handleChange} placeholder="Enter Title" />
                        </div>

                        <div>
                            <div>Deadline</div>
                            <input type="date" name="deadline" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="student__input">
                        <div>
                            <div> Select Contest Types</div>
                            <select name="type" onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="dsa">DSA</option>
                                <option value="coding">Coding</option>
                                <option value="skillathon">Skillathon</option>
                            </select>
                        </div>

                        <div>
                            <div>Select Time</div>
                            <input type="time" name="time" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="student__input">
                        <div>
                            <div>Select Authors</div>
                            <select name="author" onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="Nrupul">Nrupul</option>
                                <option value="Yogesh">Yogesh</option>
                                <option value="Venu">Venu</option>
                                <option value="Ankush">Ankush</option>
                                <option value="Lohit">Lohit</option>
                                <option value="Aman">Aman</option>
                                <option value="Dhaval">Dhaval</option>
                                <option value="Swanand">Swanand</option>
                                <option value="Prabhanjan">Prabhanjan</option>
                                <option value="Albert">Albert</option>
                                <option value="Shruthi">Shruthi</option>
                                <option value="Mythri">Mythri</option>
                                <option value="Isha">Isha</option>
                            </select>
                        </div>

                        <div>
                            <div> Select Contest Tags</div>
                            <select name="tags" onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="dsa">DSA</option>
                                <option value="coding">Coding</option>
                                <option value="skillathon">Skillathon</option>
                            </select>
                        </div>
                    </div>
                    <div className="student__btn">
                        <button onClick={handleSubmit}>{load ? "Adding..." : "ADD CONTEST"}</button>
                    </div>
                </div>

                <div className="student__list">
                    <div>
                        <ContestList />
                    </div>

                </div>

            </div>
            {/* </form> */}
        </>
    )
}