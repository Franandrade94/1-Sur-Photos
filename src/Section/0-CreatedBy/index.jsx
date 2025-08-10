import "./createdby.css";
import FranLogo from "../../Assets/images/createdBy/FranLogo.png"


const CreatedBy = () => {

  const handleClickCreatedBy = () => {
    window.open(
      "https://www.franciscoandrade.com.ar"
    );
  };

  return (
    <div className="CreatedBy-Component" onClick={handleClickCreatedBy}>
        <p>Created by Francisco Andrade <img alt="" src={FranLogo}/></p>   
    </div>
   

    );
};

export default CreatedBy;