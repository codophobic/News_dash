import React from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';


const NewsArticles =(props)=>{

    const gotData= props.data;
    const dataArray=[];
for(let index in gotData)
{
   dataArray.push({   
    pubDate:gotData[index].pub_date.substr(0,10),
    headline:gotData[index].headline.main.substr(0,100),
    abstract:gotData[index].abstract,
    weburl:<a href={gotData[index].web_url}>{gotData[index].web_url}</a>,
    source:gotData[index].source});
}
const columns=[
    {
        Header:'Published Date',
        accessor:'pubDate',
        width:150,
        style:{height:'30px'}
    
        
    },
     {
        Header:'Headline',
        accessor:'headline'
    },
     {
        Header:'Summary',
        accessor:'abstract'
    },
     {
        Header:'Url',
        accessor:'weburl'
    },
     {
        Header:'Source',
        accessor:'source'
    }
]
let classes=['-striped','-highlight'];
return(
    <div>
        <ReactTable className={classes[0]}
                    columns={columns}
                    data={dataArray}
                    defaultPageSize={10}
                    showPagination={false}></ReactTable>
    </div>
)
}

export default NewsArticles;