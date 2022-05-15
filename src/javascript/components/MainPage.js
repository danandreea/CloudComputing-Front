import React from 'react';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {Card, ListGroup, ListGroupItem, InputGroup, FormControl} from 'react-bootstrap'
import courtsDataService from "../../services/courtsService";
import rezervationsDataService from "../../services/rezervationsService";
import{useEffect, useState} from 'react';
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";


const MainPage = () => {

    const initialCourtState = {
      courtID: null,
      courtName: "",
      courtAdress: "",
      lat:"",
      long:"",
      surface:"",
      price:""
    };


    const initialRezervationState = {
      courtID: null,
      dateStart: "",
      hourStart: "",
      hourEnd:"",
      rezervationName: "",
      rezervationEmail:"",
      rezervationPhone:""
    };

    const [rezervation, setRezervation] = useState([]);
    const [rezervationforCourt, setRezervationforCourt] = useState([]);

    const [currentCourt, setCurrentCourt] = useState(initialCourtState);
    
    const [ClientName, setClientName] = useState(null);

    const [items, setItems] = useState([]);
   
     // handle change event
    const handleChangeName = (e) => {
      e.preventDefault(); 
      setClientName(e.target.value); 
    };
    const [Email, setEmail] = useState(null);
    
      // handle change event
    const handleChangeEmail = (e) => {
      e.preventDefault(); 
      setEmail(e.target.value); 
    };

    const [Phone, setPhone] = useState(null);
    
    // handle change event
  const handleChangePhone= (e) => {
    e.preventDefault(); 
    setPhone(e.target.value); 
  };

  const [startDate, setDate] = useState();
  
  // handle change event
const handleChangeDate= (e) => {
  e.preventDefault(); 
  setDate(e.target.value); 
};


  const [hourStart, setHourStart] = useState('10:00');
    
  // handle change event
const handleChangehourStart= (e) => {
  e.preventDefault(); 
  setHourStart(e.target.value); 
};

const [hourEnd, setHourEnd] = useState('10:00');
  
  // handle change event
const handleChangehourEnd= (e) => {
  //e.preventDefault(); 
  setHourEnd(e.target.value); 
};


  const getCourt  =  async (id) => {
    await courtsDataService.getCourt(id)
      .then(response => {
        setCurrentCourt(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getRezervationsCourt  =  async (id) => {
    await rezervationsDataService.getRezervationsCourt(id)
      .then(response => {
        setRezervationforCourt(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


    const API_URL = `${process.env.REACT_APP_API_URL}`;
  
    useEffect( () => {
        fetchItems();
    }, []);

    useEffect( () => {

      console.log('currentCourt', currentCourt)
      if (currentCourt.length>=1){
      items.courtID=currentCourt[0].courtID
      items.courtName=currentCourt[0].courtName

      }
  
  }, [currentCourt]);

 
  useEffect( () => {

    console.log('currentRezerv', rezervationforCourt)
    if(items.courtID)
    {
      rezervationsDataService.getRezervationsCourt(items.courtID)
      .then(response => {
        setRezervationforCourt(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
   // getRezervationsCourt(items.courtID)
    console.log('currentRezerv2', rezervationforCourt)
    }
  
}, [items.courtID]);


    
    const [show, setShow] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [message, setMessage] = useState(null);
    const [errormessage, setErrorMessage] = useState('');


    async function handleClose() 
    {
 
   
        var ok=1;
        if(ClientName==='' || ClientName===null || Email==='' || Email===null || Phone==='' || Phone===null || hourStart==='' || hourStart===null || hourEnd==='' || hourEnd===null  || startDate===undefined || startDate===null) 
        {
          setErrorMessage('Va rugam completati toate campurile!')
          setShowModalError(true);
        }
        else
  
          if (hourStart.slice(0, 2) < 7 || hourEnd.slice(0, 2)>23)
          {
            setErrorMessage('Programul de functionare al terenurilor este intre 07:00 si 23:00. Verificati orele de start si final pentru rezervarea dumneavoastra.')
            setShowModalError(true);
          }
  
          else
  
          if (hourStart.slice(0, 2) > hourEnd.slice(0, 2) || (hourStart.slice(0, 2) === hourEnd.slice(0, 2) && hourStart.slice(3, 5) >= hourEnd.slice(3, 5) ))
          {
            setErrorMessage('Va rugam verificati orele programarii.')
            setShowModalError(true);
          }
  
          else {
           
            if(rezervationforCourt.length>=1)
            {
              rezervationforCourt.map(rezervation => {
        
              var daterez= rezervation.dateStart
                daterez = daterez.slice(0,10)
          
                var hourStartdb=rezervation.dateStart
                hourStartdb = hourStartdb.slice(11,13)

                var hourEnddb=rezervation.dateEnd
                hourEnddb = hourEnddb.slice(11,13)


              console.log('rezervation.dateend',startDate)
              if(daterez==startDate && Number(hourStartdb)+3==Number(hourStart.slice(0,2)) && Number(hourEnddb) + 3==Number(hourEnd.slice(0,2)))
              {
                  ok=0;
                  setErrorMessage('Exista deja o rezervare pentru acest interval orar. Incercati un alt interval')
                  setShowModalError(true); 
              }

              if(daterez==startDate && Number(hourStartdb)+3==Number(hourStart.slice(0,2)) && Number(hourEnddb) + 3<Number(hourEnd.slice(0,2)))
              {
                  ok=0;
                  setErrorMessage('Exista deja o rezervare pana la ora '+ (Number(hourEnddb) + 3)+ '. Incercati un alt interval')
                  setShowModalError(true); 
              }
            })
          }
  
        if(ok==1)
       {
        console.log(ClientName, Email, Phone, hourStart, hourEnd, startDate,items.courtID)
        initialRezervationState.courtID=items.courtID;
        initialRezervationState.rezervationName=ClientName;
        initialRezervationState.rezervationEmail=Email;
        initialRezervationState.rezervationPhone=Phone;
        initialRezervationState.dateStart=startDate;
        initialRezervationState.hourStart=hourStart;
        initialRezervationState.hourEnd=hourEnd;
        console.log(initialRezervationState);
  
        axios.post(API_URL + `/rezervations`, initialRezervationState)
         .then(res => {
            setRezervation(res.data);
            let date = new Date(initialRezervationState.dateStart);
            /* Date format you have */
            let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            /* Date converted to MM-DD-YYYY format */
  
            setMessage("Rezervarea dvs. a fost efectuată cu succes. Vă așteptam pe data de "  + dateMDY + " la ora " + initialRezervationState.hourStart +" la " + items.courtName +"!")
            console.log('res', res.data)
         })
         setClientName('')
         setEmail('')
         setPhone('')
         setDate(undefined)
         setHourStart('10:00')
         setHourEnd('10:00')
  
         setShow(false);
         setShowModal2(true);
        }
            
      }
    }

    function handleCloseA() 
    {
      setShow(false);
    }

    function handleCloseModal2()
    {
      setShowModal2(false);
    }

    function handleCloseModalError()
    {
      setShowModalError(false);
    }

    async function handleShow(courtID) 
    {
      await getCourt(courtID);
      setShow(true);
    }


    const fetchItems =  async () => {

      courtsDataService.getAllCourts()
      .then(response => {
        setItems(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

      
    };

    const renderCard=() => {
 
     const card= items.map(items => {

      function Map()
      {
     
        return(
          <GoogleMap
          defaultZoom={10}
          defaultCenter={{ lat: 44.439663, lng: 26.096306 }}
        >
        <Marker
            position={{
              lat: parseFloat(items.lat),
              lng: parseFloat(items.lon)
            }}
          />
          </GoogleMap>
        );
      }
      const WrappedMap=withScriptjs(withGoogleMap(Map));
     
      return (
      <Card style={{ width: '30rem', height: "28rem"}} className="cardclass">
   
      <div className="map" style={{ width: "23vw", height: "30vw" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>

      <Card.Body>

        <Card.Title style={{fontSize:'25px'}}>{items.courtName}</Card.Title>

      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>{'Suprafata: ' + items.surface }</ListGroupItem>
        <ListGroupItem>{'Pret: ' + items.price + ' lei/ora'}</ListGroupItem>
       

      </ListGroup>

      <Button variant="primary" onClick={() => handleShow(items.courtID)}>Rezervă teren</Button>
     
      <Modal className="modal" show={show} onHide={handleCloseA}>
        <Modal.Header closeButton>
          <Modal.Title>{'Rezervă teren de tenis '} </Modal.Title>
        </Modal.Header>
       
        <div className="row">
        <Modal.Body style={{textAlign:'center'}}>Pentru a face o rezervare trebuie sa completati urmatoarele detalii: </Modal.Body>
            
        {/* <div style={{textAlign:'center',color:'red',fontWeight: 'bold'}}>Atentie! Terenurile se pot rezerva doar pe o ora.</div> */}
            <div className="col-sm" style={{marginLeft: '20px'}}>          
            
                <Form.Label>Nume: </Form.Label>
                  <FormControl aria-label="Nume" onChange={handleChangeName} value={ClientName} required/>
 
                <Form.Label>Email: </Form.Label>
                  <FormControl aria-label="Email" onChange={handleChangeEmail} value={Email} required/>

                  <Form.Label>Telefon: </Form.Label>
                  <FormControl aria-label="Phone" onChange={handleChangePhone} value={Phone} required/>
            
                </div>
                <div className="col-sm" style={{marginRight: '20px'}}> 
              <Form.Label>Data rezervarii: </Form.Label>
              <Form.Group controlId="dob">
                  <Form.Control type="date" name="startDate" placeholder="Date of Rezervation" value={startDate} onChange={handleChangeDate} required/>
                </Form.Group>
              
              <Form.Label>Ora de start: </Form.Label>
              <FormControl aria-label="hourStart" onChange={handleChangehourStart} value={hourStart} required/>
                {/* <TimePicker start="07:00" end="21:00" step={30} value={hourStart} onChange={handleChangehourStart}/> */}
              <Form.Label>Ora de final: </Form.Label>
              <FormControl aria-label="hourEnd" onChange={handleChangehourEnd} value={hourEnd} required/>
                {/* <TimePicker start="07:00" end="21:00" step={30} onChange={handleChangehourEnd} value={hourEnd}/> */}
       </div>
       </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseA}>
            Anulează
          </Button>
          <Button variant="primary" onClick={() => handleClose(currentCourt.courtID)}>
            Salvează programarea
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal className="modal" show={showModal2} onHide={handleCloseModal2}>
          
         
          <div className="row">
          <Modal.Body style={{textAlign:'center', color:'green',fontWeight: 'bold'}}>{message}</Modal.Body>
             
         </div>
          <Modal.Footer>
            <Button variant="success" onClick={handleCloseModal2}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal className="modal" show={showModalError} onHide={handleCloseModalError}>
          
         
          <div className="row">
          <Modal.Body style={{textAlign:'center', color:'red', fontWeight: 'bold'}}>{errormessage}</Modal.Body>
             
         </div>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseModalError}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>

    </Card>
      )
    });

    return (
   
      <>
  <div class="row">
  {card}
  </div>
 
         </>
    )
  }



    return ( 
      <>
    <div id="MainPage">
        <Header />

    <div class="CardContent">
         {renderCard()}
       </div>

    </div>
        

<div>
     
    </div>
    </>
    );

}

export default MainPage;