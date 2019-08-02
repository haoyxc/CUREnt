import React, {useState, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';


export default function HomePage() {
  const [questions, setQuestions] = useState([]);

  const getAllQuestions = async () => {
    const response = await axios.get('http://localhost:5000/quiz', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    })
    const content = await response.json();
    setQuestions(content);
  }

  useEffect(() => {
    getAllQuestions()
  },[]);
  

  return <div>HomePage</div>;
}
