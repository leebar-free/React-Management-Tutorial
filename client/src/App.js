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

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
// import { fade, makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexFrow: 1
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },

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
      completed: 0,
      searchKeyword: ''
    }  
  }

  stateRefresh = () => {
    console.log("stateRefresh........................");
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword: ''
    });
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
    // const { completed } = this.props;
    this.setState({ completed: this.state.completed >= 100 ? 0 : this.state.completed + 1 });
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.value] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
      });
    }
    const { classes } = this.props;
    // const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];
    const cellList = [
      {id:1, title:"번호"},
      {id:2, title:"프로필 이미지"},
      {id:3, title:"이름"},
      {id:4, title:"생년월일"},
      {id:5, title:"성별"},
      {id:6, title:"직업"},
      {id:7, title:"설정"}
    ];
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              고객 관리 시스템
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh}/>
        </div>

        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map((c) => {
                  return <TableCell className={classes.tableHead} key={c.id}>{c.title}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                // customers.map(c => {
                this.state.customers ? 
                  filteredComponents(this.state.customers) :
                //   this.state.customers.map(c => {
                //   return ( <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} /> );
                // }) :
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

// export default App;
export default withStyles(styles)(App);
