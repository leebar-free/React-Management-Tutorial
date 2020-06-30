import React, {useState} from 'react';
// import {useDispatch} from 'react-redux';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
      display: 'none'
    }
});

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
    const [Open, setOpen] = useState(false);

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

    // const onJobHandler = (event) => {
    //     setOpen(event.currentTarget.value);
    // };

    const handleFormSubmit = (event) => {
        event.preventDefault();

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

                // 등록 후 초기화
                setFile(null);
                setUserName("");
                setBirthday("");
                setGender("");
                setJob("");
                setFileName("");
                setOpen(false);
                
                // 등록 후 재조회
                props.stateRefresh();
            });

            // window.location.reload();
            // this.props.stateRefresh();

    }

    const handleClickOpen = (e) => {
        setOpen(true);
    }

    const handleClose = (e) => {
        setFile(null);
        setUserName("");
        setBirthday("");
        setGender("");
        setJob("");
        setFileName("");
        setOpen(false);
    }

    const { classes } = props;

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen} >
                고객 추가하기
            </Button>
            <Dialog open={Open} onClose={handleClose} >
                <DialogTitle>고객 추가</DialogTitle>
                <DialogContent>
                    <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={File} value={FileName} onChange={onFileNameHandler}/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {FileName === "" ? "프로필 이미지 선택" : FileName}
                        </Button>

                    </label>
                    <br/>
                    <TextField label="이름" type="text" name="userName" value={UserName} onChange={onUserNameHandler}/><br/>
                    <TextField label="생년월일" type="text" name="birthday" value={Birthday} onChange={onBirthdayHandler}/><br/>
                    <TextField label="성별" type="text" name="gender" value={Gender} onChange={onGenderHandler}/><br/>
                    <TextField label="직업" type="text" name="job" value={Job} onChange={onJobHandler}/><br/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleFormSubmit}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>

        // <div style={{
        //     display: 'flex', justifyContent: 'center', alignItems: 'center'
        //     , width: '100%', height: '100vh'
        // }}>
        //     <form style={{ display: 'flex', flexDirection: 'column' }}
        //         onSubmit={handleFormSubmit} >
        //         <h1>고객 추가</h1>
        //         프로필 이미지: <input type="file" name="file" file={File} value={FileName} onChange={onFileNameHandler}/><br/>
        //         이름: <input type="text" name="userName" value={UserName} onChange={onUserNameHandler}/><br/>
        //         생년월일: <input type="text" name="birthday" value={Birthday} onChange={onBirthdayHandler}/><br/>
        //         성별: <input type="text" name="gender" value={Gender} onChange={onGenderHandler}/><br/>
        //         직업: <input type="text" name="job" value={Job} onChange={onJobHandler}/><br/>
        //         <br/>
        //         <button type="submit">추가하기</button>
        //     </form>
        // </div>

    )
}

export default withStyles(styles)(CustomerAdd);
