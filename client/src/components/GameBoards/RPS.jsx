import React, { useState, useEffect } from "react";
import rockIcon from "../../assets/images/RPS/rock.svg";
import paperIcon from "../../assets/images/RPS/paper.svg";
import scissorsIcon from "../../assets/images/RPS/scissors.svg";
import { io } from "socket.io-client";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

const RPS = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [socket, setSocket] = useState(null);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    newSocket.emit("joinRoom","RPS");
    newSocket.on("result", (gameResult) => {
      setResult(gameResult.result);
      setOpponentChoice(gameResult.opponentChoice);
    });
    newSocket.on("joined",()=>{
     
        alert(newSocket.id+"User Joined the Room")
    })
    

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, []);

  const handleUserChoice = (choice) => {
    setUserChoice(choice);
    if (socket) socket.emit("choice", choice);
  };

  const handlePlayAgain = () => {
    setUserChoice(null);
    setOpponentChoice(null);
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center text-center text-white">
      {userChoice ? (
        <>
          <h1 className="text-5xl">Your choice: {userChoice}</h1>
          {opponentChoice && (
            <h1 className="text-5xl">Opponent's choice: {opponentChoice}</h1>
          )}
          <h1 className="text-5xl">
            Result: {result || "Waiting for opponent..."}
          </h1>
          <button
            onClick={handlePlayAgain}
            className="text-4xl text-white mt-8 border-4 border-white"
          >
            Play Again
          </button>
        </>
      ) : (
        <div className="flex gap-10 justify-center items-center h-[95%]">
          {["Rock", "Paper", "Scissors"].map((choice) => (
            <button
              key={choice}
              onClick={() => handleUserChoice(choice)}
              className="bg-amber-500 rounded-md p-2 border-4"
            >
              <img
                src={
                  choice === "Rock"
                    ? rockIcon
                    : choice === "Paper"
                    ? paperIcon
                    : scissorsIcon
                }
                alt={choice}
                className="w-12 h-12"
              />
            </button>
          ))}
          {result && <div className="text-4xl mt-8">{result}</div>}
        </div>
      )}
    </div>
  );
};

export default RPS;
