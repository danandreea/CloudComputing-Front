import logo from './logo.svg';
import './App.css';
import MainPage from './javascript/components/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from './media/img1.jpg'; 


function App() {

  const myStyle={
            backgroundImage:`url(${img1})`,
            height:'auto',
            marginTop:'0px',
            fontSize:'50px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            };


  return (
    <div className='App' style={myStyle}>
     <MainPage />
    </div>
  );
}

export default App;
