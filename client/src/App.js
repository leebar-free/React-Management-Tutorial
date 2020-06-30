import React, { Component } from 'react';
// import logo from './logo.svg';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
});

// const customers = [
//  {
//   'id': '1',
//   'image': 'https://placeimg.com/64/64/1',
//   'name': '유관순',
//   'birthday': '961221',
//   'gender': '여자',
//   'job': '대학생'
// },
// {
//   'id': '2',
//   'image': 'https://placeimg.com/64/64/2',
//   'name': '홍길동',
//   'birthday': '961222',
//   'gender': '남자',
//   'job': '대학생2'
// },
// {
//   'id': '3',
//   'image': 'https://placeimg.com/64/64/3',
//   'name': '이순신',
//   'birthday': '961223',
//   'gender': '남자',
//   'job': '대학생3'
// }
// ];

/**
 * Component API Life Cycle
 * (기본적으로 리액트 라이브러리가 처음 컴포넌트를 실행할 때는 다음의 순서를 따릅니다.)
 * 
 * 1) constructor()
 * 
 * 2) componentWillMount()
 * 
 * 3) render()
 * 
 * 4) componentDidMount()
 * 
**/

/**
 * 상태 변경시 아래 함수 자동 호출
 * 
 * props or state => shouldComponentUpdate()
**/

// function App() {
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: "",
      completed: 0
    }  
  }

  stateRefresh = () => {
    console.log("stateRefresh........................");
    this.setState({
      customers: '',
      completed: 0
    })
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);

    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    // console.log("progress...::" + this.state.completed );
    const { completed } = this.props;
    this.setState({ completed: this.state.completed >= 100 ? 0 : this.state.completed + 1 });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                // customers.map(c => {
                this.state.customers ? this.state.customers.map(c => {
                  return ( <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} /> );
                }) : /*null*/
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }
}

// export default App;
export default withStyles(styles)(App);
