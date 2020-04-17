import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import nyt from './nyt.png';
import search from './search.png';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import NewsArticles from './News/NewsArticles';
import Spinner from './Spinner/Spinner';
import classsses from './Sidebar.module.css';
import Chart from './Chart';
import Springscript from './springScript';

const drawerWidth = 240;
const pubkey='xrp7NPZMKRQ3U8nmHM5UMXu2XwBKYXei';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  root1:{
      display:'flex',
      flexWrap:'wrap',
      width:'70%'
  },
    margin: {
    margin: theme.spacing(1),
    marginLeft:'40px',
    width:'55%',
    boxSizing:'border-box',
    border:'1px solid #d3d3d3',
    backgroundColor:'white',
    height:'40px'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor:'#d3d3d3',
    height:'60px'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor:'#d3d3d3'
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: '#d3d3d3',
    padding: theme.spacing(3)
  },
}));


const Sidebar =()=> {
  let inputt='';
  const [input,setInput]=useState('');
  const [data,setData]=useState({
 
  });
  const [fcclk,setfcclk]=useState('true');
  const [fclk,setfclk]=useState('true');
  const [pageno,setPage]=useState(0);
  const [show,setShow]=useState('false');
  const [showerr,setShowerr]=useState('false');
  const [chshowerr,setchShowerr]=useState('false');
  const [chshow,setChshow]=useState('false');
  const [loading,setLoading]=useState('false');
  const [chloading,setchLoading]=useState('false');
  const [pageArray,setPageArray]=useState([1,2,3,4,5,6,7,8,9,10]);
  const classes = useStyles();
  const [daArr,setdaArr]= useState([]);
  /*const [clck,setclck]=useState('false');*/

  const inputchangeHandler=(event)=>{
     inputt=event.target.value
  }
  const keyPressed=(event)=>{
 if(event.key==="Enter")
    searchButtonHandler();
  }
   let chartDetails;

  let newsDetails=(<div><h2>Search for breaking news from across the world,across the times</h2>
  <div style={{display:'flex',flexDirection:'row',flex:1}}>
        <img src={search} alt={'loading....'} style={{height:'50%'}}/>
         <Springscript/>
         </div>
         </div>);

  const searchButtonHandler=()=>{
       setPage(0);
       setfclk('false');
       setInput(inputt);
       setfcclk('false');
       setchShowerr('false');
       setchLoading('true');
       setPageArray([1,2,3,4,5,6,7,8,9,10]);

     }
      useEffect(()=>{
        if(fclk==='false')
        {
           setLoading('true');
     axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20110101&end_date=20201231&page='+pageno+'&q='+input+'&sort=newest&api-key='+pubkey)
       .then(response=>{
            setShow('true');
          setLoading('false');
            const gotData=response.data.response.docs;
            setData(gotData);
            setfclk('true');

       })
       .catch(error=>{
         setLoading('false');
         setShow('false');
         setfclk('true');
         setShowerr('true');
       });
      }
    },[pageno,fclk]);
    
    let dArray=new Array(5);
    useEffect(()=>{
      
      if(fcclk==='false')
      {
        setchLoading('true');
      axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20160101&end_date=20161231&q='+input+'&api-key='+pubkey)
      .then(response=>{
               dArray[0]=response.data.response.meta.hits;
          axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20170101&end_date=20171231&q='+input+'&api-key='+pubkey)
      .then(response=>{
           dArray[1]=response.data.response.meta.hits;
        axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20180101&end_date=20181231&q='+input+'&api-key='+pubkey)
      .then(response=>{
        dArray[2]=(response.data.response.meta.hits);
        axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20190101&end_date=20191231&q='+input+'&api-key='+pubkey)
      .then(response=>{
        dArray[3]=(response.data.response.meta.hits);
        axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20200101&end_date=20201231&q='+input+'&api-key='+pubkey)
      .then(response=>{
        dArray[4]=(response.data.response.meta.hits);
        setChshow('true');
        setfcclk('true');
        setdaArr(dArray);
        setchLoading('true');
      }).catch(error=>{console.log(error);setChshow('false');setchShowerr('true');setfcclk('true');setchLoading('false')})
      }).catch(error=>{console.log(error);setchShowerr('true');setchLoading('false')});
      }).catch(error=>{console.log(error);setchShowerr('true');setchLoading('false')});
      }).catch(error=>{console.log(error);setchShowerr('true');setchLoading('false')});
      }).catch(error=>{console.log(error);setchShowerr('true');setchLoading('false')});
      }},[fcclk]);

      const nextPage=()=>{
        let newArray=[];
        if(pageArray[9]!==100)
        newArray= pageArray.map(page=>page+1);
        else
        newArray=pageArray;
        setPageArray(newArray);
      }
      const prevPage=()=>{
        let newArray=[];
        if(pageArray[0]!==1)
        newArray= pageArray.map(page=>page-1);
        else
        newArray=pageArray;
        setPageArray(newArray);
        
      }
   
      if(loading==='true')
      newsDetails=<Spinner/>;
      else if(show==='true'&&loading==='false')
      newsDetails=(
        <div>
          <h5>Here are your search results for {input}:</h5>
      <div style={{width:'100%',alignItems:'center',backgroundColor:'white'}}>
           <h2 >ARTICLES</h2>
           <NewsArticles data={data}/>
           
          </div>
          <div className={classsses.flexboxContainer}>
               <button onClick={prevPage}>PREV</button>
              {
                pageArray.map(page=>{
                  let classArray=[classsses.pageContainer];
                  if(pageno===(page-1))
                  classArray.push(classsses.pageContainerd);

                  return(<h6 key={page} className={classArray.join(' ')}  onClick={()=>{setPage(page-1);setfclk('false')}}>{page}</h6>)
                })
              }
              <button onClick={nextPage}>NEXT</button>
             
           </div>
          </div>);
          else if(showerr==='true')
          {
            newsDetails=<h4>check your internet or provide correct input</h4>
          }
         
          if(chshowerr==='true')
          {
            chartDetails=<h4>Chart cant be loaded,pls check connection or reload the page</h4>
          }
          if(chloading==='true')
          {
            chartDetails=<div><h3>please wait the chart is loading.......</h3>
                                  </div>
          }
          if(chshow==='true')
          {
           chartDetails=(<Chart input={input} dArr={daArr}/>);
          }

  

 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
          <div style={{alignItems:'flex-start'}}>
       <TextField
        className={classes.margin}
        onChange={inputchangeHandler}
        onKeyPress={keyPressed}
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button onClick={searchButtonHandler} variant="contained" color="primary" style={{
          height:'40px',
          marginTop:'8px'
      }} >
       SEARCH
      </Button>
      </div>

      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
      <img src={nyt} alt="Logo" style={{
             marginTop:'10px',
             height:'30px',
             
         }}/>;
        <Divider />
        <List>
          {['Dashboard', 'Articles', 'Analytics', 'Messages','Calendar'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        
      </Drawer>
      <main className={classes.content} >
        <div className={classes.toolbar} />
        {newsDetails}
        {chartDetails}
      </main>
    </div>
  );
}
export default Sidebar;