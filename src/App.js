import { useState } from 'react';
import { Button, Nav, Pagination, Table } from 'react-bootstrap';
import './App.css';

function App() {

  //1 hook variables
  const [data, setData] = useState({
    data:[]
  });


/* let pagination1 = ()=>{
   try {
      fetch('https://pacific-beyond-49685.herokuapp.com/api/students?pagination[start]=10&pagination[limit]=20')
      .then((res)=>{
        console.log(res);
        return res.json();
      })
      .then((data)=>{
        //console.log(data.data);

        setData(data);


        //console.log(data.data);
        //console.log(data.meta.pagination);
        
      })
      .catch()
      
    } catch (error) {
      console.log(error);
      
    }
  
} */

  //2.function
  let page = (e,d=0)=>{
      e.preventDefault();
      console.log(e.target.innerHTML);
      var n = e.target.innerHTML
      getData(parseInt(n)+parseInt(d));

  }
  let prev = (e)=>{
      var n = data.meta.pagination.start - 10;
      if( n => data.meta.pagination.total){
        getData(n);
        console.log('gdc',next);
      }
      
  }
  let next = (e)=>{
      var n = data.meta.pagination.start + 10;
      if( n <= data.meta.pagination.total){
        getData(n);
        console.log('gdc',next);
      }
      
  }
  let getData = ( n=0 )=>{
    console.log(`this is n = ${n}`);
    //alert('ok')
    //var x=0;
    try {
      fetch(`https://pacific-beyond-49685.herokuapp.com/api/students?pagination[start]=${n}&pagination[limit]=10`)
      .then((res)=>{
        console.log(res);
        return res.json();
      })
      .then((data)=>{
        //console.log(data.data);

        setData(data);

       // console.log(data.data);
        //console.log(data.meta.pagination);
        
      })
      .catch()
      
    } catch (error) {
      console.log(error);
      
    }
  }



  //return statement
  return (
    <>
    <h1>Read opration</h1>
    <Button onClick={()=>{ getData() }}>Get data</Button>
    <br/>

    { console.log('current Data',data) }
    <br/>
      { data.data.length != 0 &&
        <>
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>surName</th>
                <th>createdAt</th>
              
              </tr>
            </thead>
            <tbody>
              {
                data.data.map((currentValue,index,arr) =>{
                  //console.log(currentValue);


                  return  <tr key={index}>
                              <td>{currentValue.id}</td>
                              <td>{currentValue.attributes.Name}</td>
                              <td>{currentValue.attributes.Email}</td>
                              <td>{currentValue.attributes.createdAt}</td>
                          </tr>
                
                })
              }
              

            </tbody>
            </Table>
            { console.log(data.meta) }
            <Nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item"><a className="page-link" href="#" onClick={(e)=>{ prev(e) }}>Previous</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#" onClick={(e)=>{ page(e)  }}>
                      {(data.meta.pagination.start)+1}
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" onClick={(e)=>{ page(e,Math.ceil(data.meta.pagination.total/data.meta.pagination.limit)+10)  }}>
                      {  Math.ceil(data.meta.pagination.total/data.meta.pagination.limit)}
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#" onClick={(e)=>{ next(e) }}>Next</a></li>
                </ul>
            </Nav>
        </>
      }
    </>
    
  );
}

export default App;
