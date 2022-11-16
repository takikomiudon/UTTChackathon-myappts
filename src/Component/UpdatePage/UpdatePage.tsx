import '../../App.css';
import { useState, useEffect } from "react";
import Update from './Update';
import { Link } from "react-router-dom";
import Header from '../Header';

type Props = {
  id: string
}

const UpdatePage = (props:Props) => {
  const [contributorId, setContributorId] = useState("");
  const [point, setPoint] = useState(0);
  const [message, setMessage] = useState(""); 

  const onSubmit = async (id:string, contributorId:string, point:number, message:string) => {
    if (!contributorId) {
      alert("Please enter contributor's ID");
      return;
    }

    if (point <= 0 || point > 100){
      alert("Please enter point between 1 and 100");
      return;
    }

    if (message.length > 100){
      alert("Please enter a message shorter than 100 characters")
    }

    try{
      const response = await fetch(
        "http://localhost:8000/contributionupdate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            contributorId: contributorId,
            point: String(point),
            message: message
          }),
        });

        console.log(JSON.stringify({
          id: id,
          contributorId: contributorId,
          point: point,
          message: message}))

        if (!response.ok){
          throw Error(`Failed to create user ${response.status}`);
        }

        setContributorId("");
        setPoint(0);
        setMessage("");
      } catch(err) {
        console.error(err);
    }
  };

  useEffect(() => {
    console.log("point",point)
  }, [point])

  return (
    <div className="App">
      <Header/>
      <body>
        <Update
          id={props.id} 
          contributorId={contributorId} 
          setContributorId={setContributorId} 
          point={point} 
          setPoint={setPoint} 
          message={message} 
          setMessage={setMessage} 
          onSubmit={onSubmit} 
        />
      </body>
    </div>
  );
};

export default UpdatePage;