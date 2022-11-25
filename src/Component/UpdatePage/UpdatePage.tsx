import '../../App.css';
import Update from './Update';
import Header from '../Header';
import {useUserInfo} from "../../Context/UserContext";
import {url} from "../../type";

const UpdatePage = () => {
  const {userInfo,setUserInfo} = useUserInfo();

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
        url+"/contributionupdate",
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
        setUserInfo({...userInfo, contributorId: "", point: 0, message: ""})
      } catch(err) {
        console.error(err);
    }
  };

  return (
    <div className="App">
      {/* <Header/> */}
      <body>
        <Update onSubmit={onSubmit} 
        />
      </body>
    </div>
  );
};

export default UpdatePage;