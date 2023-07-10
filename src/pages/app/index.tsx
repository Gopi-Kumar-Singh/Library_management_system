import { collection, getDocs } from "firebase/firestore";
import App from "../../../components/general/App/App";
import { db } from "../../../firebase/config";

const app = () => {

  return (
    <>
      <App />
    </>
  );
};


export default app;

export const getServerSideProps = async () => {
  const docRef = getDocs(collection(db, "Userdata"));
  const data = (await docRef).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(data);
  return {
    props: {
      data,
    },
  };
}