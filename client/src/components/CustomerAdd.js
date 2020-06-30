import React, {useState} from 'react';
// import {useDispatch} from 'react-redux';
import { post } from 'axios';

// class CustomerAdd extends React.Component {
function CustomerAdd(props) {
    // constructor(props) {
    //     super(props);
    // }

    // const dispatch = useDispatch();

    const [File, setFile] = useState(null);
    const [UserName, setUserName] = useState("");
    const [Birthday, setBirthday] = useState("");
    const [Gender, setGender] = useState("");
    const [Job, setJob] = useState("");
    const [FileName, setFileName] = useState("");

    // const onFileHandler = (event) => {
    //     setFile(event.currentTarget.value);
    // };

    const onUserNameHandler = (event) => {
        setUserName(event.currentTarget.value);
    };

    const onBirthdayHandler = (event) => {
        setBirthday(event.currentTarget.value);
    };

    const onGenderHandler = (event) => {
        setGender(event.currentTarget.value);
    };

    const onJobHandler = (event) => {
        setJob(event.currentTarget.value);
    };

    const onFileNameHandler = (event) => {
        setFileName(event.target.value);
        setFile(event.target.files[0]);
        // setFileName(event.currentTarget.value)
        // setFile(event.currentTarget.value)
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        console.log('FileName', FileName);
        console.log('UserName', UserName);
        console.log('Birthday', Birthday);
        console.log('Gender', Gender);
        console.log('Job', Job);

        // let body = {
        //     fileName: FileName,
        //     userName: UserName,
        //     birthday: Birthday,
        //     gender: Gender,
        //     job: Job
        // };
        const formData = new FormData();
        formData.append('image', File);
        formData.append('username', UserName);
        formData.append('birthday', Birthday);
        formData.append('gender', Gender);
        formData.append('job', Job);
        formData.append('filename', FileName);

        const url = '/api/customers';
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        // const request = post(url, formData, config)
        post(url, formData, config)
            .then((response) => {
                console.log(response.data);
                props.stateRefresh();
            });

            setFile(null);
            setUserName("");
            setBirthday("");
            setGender("");
            setJob("");
            setFileName("");

            // window.location.reload();
            // this.props.stateRefresh();

    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={handleFormSubmit} >
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={File} value={FileName} onChange={onFileNameHandler}/><br/>
                이름: <input type="text" name="userName" value={UserName} onChange={onUserNameHandler}/><br/>
                생년월일: <input type="text" name="birthday" value={Birthday} onChange={onBirthdayHandler}/><br/>
                성별: <input type="text" name="gender" value={Gender} onChange={onGenderHandler}/><br/>
                직업: <input type="text" name="job" value={Job} onChange={onJobHandler}/><br/>
                <br/>
                <button type="submit">추가하기</button>

            </form>

        </div>
    )
}

export default CustomerAdd;
