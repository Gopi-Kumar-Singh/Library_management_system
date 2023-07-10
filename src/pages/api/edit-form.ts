import { db } from "../../../firebase/config";
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    try {
      const updatedValues = req.body; 
      const bookDocRef = doc(db, "books", updatedValues.id);

      await updateDoc(bookDocRef, updatedValues);

      return res.status(201).json({ message: "success" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "error" });
    }
  }


  else if(req.method === "DELETE") {
    try {
      
      const id = req.body; 
      const bookDocRef = doc(db, "books", id);
      console.log(bookDocRef);
      
      await deleteDoc(bookDocRef);
      return res.status(201).json({ message: "success" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "error" });
    }
  }


  else if (req.method === "GET") {
    const bookDocRef = doc(db, "books", "0S1b0PIhlVVIlomEjirq");
    const data = await getDoc(bookDocRef);
    let temp1 = data.data();
    temp1 = { ...temp1, id: data.id };

    const bookDocRef2 = doc(db, "books", "0WV22avR6UUbA68ITflv");
    const data2 = await getDoc(bookDocRef2);
    let temp2 = data2.data();
    temp2 = { ...temp2, id: data2.id };

    const temp = [temp1, temp2];

    // const querySnapshots = await getDocs(collection(db, "books"));

    // const temp: any = querySnapshots.docs.map((doc) => {
    //   const data = doc.data();
    //   data.id = doc.id;
    //   return data;
    // });

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

    return res.status(200).json(temp);
  }
}
