import React from 'react';
import io from "socket.io-client";

export const CTX = React.createContext();

const initState = {
  general : [
    {from: 'aaron', msg: 'Ayyy'},
    {from: 'paul', msg: 'Ayyyooo'},
    {from: 'john', msg: 'Ayyyyy'}
  ],

  python : [
    {from: 'aaron', msg: 'Ayyy'},
    {from: 'sarah', msg: 'Agggggy'},
    {from: 'paul', msg: 'goalaso'}
  ]
}

function reducer(state, action) {
  const {from, msg, topic} = action.payload;

  switch(action.type) {
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        [topic] : [
          ...state[topic]
        , { from, msg }
      ]
    }
    default:
      return state
  };
}

let socket;

const sendChatAction = (value) => {
  socket.emit('chat message', value)
}


export default function Store(props) {

  const [allChats, dispatch] = React.useReducer(reducer, initState)

  if(!socket){
    socket = io(':3001')
    socket.on('chat message', (msg) => {
      dispatch({type: 'RECEIVE_MESSAGE', payload: msg});
    })
  }

  const user = 'Lester' + Math.random(100).toFixed(2)


  return (
    <CTX.Provider value={{allChats, sendChatAction, user}}>
      {props.children}
    </CTX.Provider>
  )
}
