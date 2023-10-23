import { Footer } from "./footer";
import { Navbar } from "./navbar"
import { FileUploader } from "./upload";
import { Result } from "./result";


const Main = () => {
    return (
      <div style={{display: 'grid', gridTemplateRows: 'auto auto', backgroundColor: 'FFA500'}}>
        <Navbar />
        
        <FileUploader />
        <Result />
        <Footer/>
      </div>
    );
  };
  
  export {Main};