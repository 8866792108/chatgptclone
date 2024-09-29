import { useEffect, useRef, useState } from 'react'
import './App.css'
import chatgpt from './assets/chatgpt.svg'
import chatgptlogo from './assets/chatgptLogo.svg'
import bookmark from './assets/bookmark.svg'
import addicon from './assets/add-30.png'
import home from './assets/home.svg'
import message from './assets/message.svg'
import rocket from './assets/rocket.svg'
import send from './assets/send.svg'
import saved from './assets/bookmark.svg'
import userlogo from './assets/user-icon.png'
import axios from 'axios'
import 'dotenv'

function App() {
  const msgEnd = useRef(null);

  const [input, setinput] = useState("");
  const [message, setmessage] = useState([
    {
      text: "ChatGPT: The AI Conversationalist, A Glimpse into the Future of Language, Unlocking the Power of Language with ChatGPT, Conversational AI Revolutionized: ChatGPT Takes Center Stage, ChatGPT: Your Creative Partner in Text and Code, Beyond the Chatbot: ChatGPT's Potential for Innovation, Mastering the Art of Conversation with ChatGPT, The Rise of the AI Writer: ChatGPT's Impact on Content Creation, ChatGPT: Bridging the Gap Between Humans and Machines, Exploring the Ethical Landscape of ChatGPT and AI",
      isBot: true,
    }
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [message])
  const handleEnter = async (e) => {
    if (e.key === 'Enter') await handlesend();
  }


  const handleQuery = async (e) => {
    const text = e.target.value;
    setinput('')
    setmessage([
      ...message,
      { text, isBot: false }
    ])
    const res = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC32cqE9ltxeWn_myn_eTeBHf3PvF1UMwU",
      method: "post",
      data: {
        contents: [
          { parts: [{ "text": text }] }
        ]
      }
    })

    setmessage([
      ...message,
      { text: text, isBot: false },
      { text: res['data']['candidates'][0]["content"]["parts"][0]["text"], isBot: true }
    ])
  }



  const handlesend = async () => {

    const text = input
    setinput('')
    setmessage([
      ...message,
      { text, isBot: false }
    ])
    const res = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC32cqE9ltxeWn_myn_eTeBHf3PvF1UMwU",
      method: "post",
      data: {
        contents: [
          { parts: [{ "text": text }] }
        ]
      }
    })

    setmessage([
      ...message,
      { text: text, isBot: false },
      { text: res['data']['candidates'][0]["content"]["parts"][0]["text"], isBot: true }
    ])

    console.log(res['data']['candidates'][0]["content"]["parts"][0]["text"]);
  }

  return (
    <div className='App'>
      <div className="sidabar">
        <div className="upperside">
          <div className="uppertop"><img src={chatgpt} alt="Logo" /><span>ChatGPT</span></div>
          <div className="uppermiddle">
            <button className='addbtn' onClick={() => { window.location.reload() }}><img src={addicon} alt="Add" /><span>New Chat</span></button>
          </div>
          <div className="upperbottom">
            <button className="msg" value="What is Programming ?" onClick={handleQuery}><img src={message} alt="" /><span>What is Programming ?</span></button>
            <button className="msg" value="How to use API ?" onClick={handleQuery}><img src={message} alt="" /><span>How to use API ?</span></button>
          </div>
        </div>
        <div className="lowerside">
          <div className="btn"><img src={home} alt="home" /><span>Home</span></div>
          <div className="btn"><img src={saved} alt="saved" /><span>Saved</span></div>
          <div className="btn"><img src={rocket} alt="upgrade" /><span>Upgrade to Pro</span></div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          {/* <div className="chat">
            <img className='chatimg' src={userlogo} alt="" /><p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quidem earum dignissimos facilis, iure doloremque voluptas dolorum asperiores sit veritatis!</p>
          </div>
          <div className="chat bot">
            <img className='chatimg' src={chatgptlogo} alt="" /><p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic esse natus, similique ea amet, repellat nulla dolor, qui ab aspernatur quibusdam debitis at nisi vero illo corporis commodi impedit voluptatum. Laboriosam esse similique voluptas numquam ratione. Sit sed soluta ratione reiciendis maiores labore earum porro velit doloremque. Aliquid ratione id dolores officiis veritatis molestiae, molestias recusandae commodi tempora consequuntur! Dolore autem maxime quos recusandae repellat soluta officiis nostrum quas quisquam? Impedit, et, quo debitis repudiandae maxime dicta veritatis porro voluptas nulla quas vel atque dolorem id voluptate magni aut! Quos aliquam in minus ad fugit optio aspernatur quis blanditiis pariatur.</p>
          </div> */}

          {message.map((message, i) =>
            <div key={i} className={message.isBot ? "chat bot" : "chat user"}>
              <div className='msg'>
                <img className='chatimg' src={message.isBot ? chatgptlogo : userlogo} alt="" /><pre className="txt">{message.text}</pre>
              </div>
            </div>
          )}
          <div ref={msgEnd} />

        </div>
        <div className="message">
          <div className="inp">
            <input type="text" placeholder='Enter a Message' value={input} onKeyDown={handleEnter} onChange={(e) => setinput(e.target.value)} /><button onClick={handlesend} className="send"><img src={send} alt="send" /></button>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, tenetur.</p>
        </div>
      </div>
    </div>
  )
}

export default App
