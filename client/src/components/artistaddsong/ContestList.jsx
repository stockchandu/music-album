import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { contestLoading, contestSuccess, contestError } from "../../store/conteststore/action";
import axios from 'axios';
import { deleteIcon, baseURL } from "../utility/utility"
import CircularProgress from '@mui/material/CircularProgress';
export const ContestList = () => {
    const dispatch = useDispatch();
    const { data: { data_contest, loading} } = useSelector(store => store.contest);

    useEffect(() => {
        getStudentList()
    }, [])


    const getStudentList = async () => {
        dispatch(contestLoading(true));
        try {
            let { data: { allContest } } = await axios.get(`${baseURL}/get_all_contest?page=1&size=15`)
            dispatch(contestSuccess(allContest));

        } catch (err) {
            dispatch(contestError(err));
        }
    }

    const deleteContest = (id) => {
        axios.delete(`${baseURL}/contest/${id}`).then(() => getStudentList())
    }

    const contestTable = {
        title: "Title",
        deadline: "Deadline",
        tags: "Tags",
        time: "Time",
        type: "Type",
        author: "Author"

    }
    return (
        <>
            <div className="student-heading" style={{ marginTop: "-0.5%", width: "100%" }}>
                <h4>Contest Details</h4>
            </div>

            <div className="student-table">
                <div >{contestTable.title}</div>
                <div>{contestTable.deadline}</div>
                <div >{contestTable.type}</div>
                <div>{contestTable.time}</div>
                <div>{contestTable.tags}</div>
                <div>{contestTable.author}</div>
                <div>Remove Contest</div>
                {/* <div>Remove Contest</div> */}
            </div>
            {
                loading ? <div className="spinner-load">
                    <div><CircularProgress /></div>
                    <div>Loading...</div>
                </div> : data_contest === undefined ?"Data are adding ..." : data_contest.map(({ deadline, _id, title, tags, time, type, author }) => {
                    return (
                        <div className="student-table" key={_id}>
                            <div>{title}</div>
                            <div>{deadline}</div>
                            <div>{type}</div>
                            <div>{time}</div>
                            <div>{tags}</div>
                            <div>{author}</div>
                            <div onClick={() => { deleteContest(_id) }}> <img src={deleteIcon} alt="delete icon" width="20" /> </div>
                        </div>
                    )
                })

            }
        </>
    )
}