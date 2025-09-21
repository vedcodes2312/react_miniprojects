import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import * as THREE from "three";

const sampleAssistant = {
  id:"assistant",
  name:"jarvis 🤖✨",
  avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
};

const sampleUser = {
id: "user",
name: "You",
avatar: "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
};
/*  
export default function ... is the way to define 
a function (or component) as the default export of a file/module.        
A file can have only one default export.

When you import it, you don’t need curly braces {}.

You can even rename it while importing.

// ChatbotInterface.jsx
export default function ChatbotInterface() {
  return <div>Hello! I’m a chatbot 🤖</div>;
}
// App.jsx
import ChatbotInterface from "./ChatbotInterface";
// No curly braces needed, name can be anything
*/
export default function ChatBotInterface ({
  botName = sampleAssistant.name,
  botAvatar = sampleAssistant.avatar,
  userAvatar = sampleUser.avatar,
  initialMessages = [
{ id: 1, role: "assistant", text: "🌟 Hey explorer! I am Jarvis — ready for a fun chat? 🚀", time: Date.now() },
],
onSendMessage,
}) {
   const [messages, setMessages] = useState(initialMessages);
const [input, setInput] = useState("");
const [isTyping, setIsTyping] = useState(false);
const [sending, setSending] = useState(false);
const listRef = useRef(null);
const canvasRef = useRef(null);

// Auto-scroll
useEffect(() => {
if (!listRef.current) return;
listRef.current.scrollTop = listRef.current.scrollHeight;
}, [messages, isTyping]);

// Setup Three.js background once
useEffect(() => {
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
renderer.setSize(600, 600);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xff8800, wireframe: true });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(20, 20, 20);
scene.add(light);

camera.position.z = 50;

const animate = function () {
requestAnimationFrame(animate);
torusKnot.rotation.x += 0.01;
torusKnot.rotation.y += 0.01;
renderer.render(scene, camera);
};

animate();

return () => {
renderer.dispose();
};
}, []);
// bot reply simulation
async function sendMessageToBot(text) {
setIsTyping(true);
await new Promise((r) => setTimeout(r, 1000));

const funReplies = [
`✨ Ooooh! "${text}" sounds exciting! Tell me more 😃`,
`😂 Haha, you’re funny! "${text}" cracked me up!`,
`🧠 Hmm... thinking about "${text}"... wow!`,
`🎉 Yay! "${text}" is awesome!`
];

const botReply = {
id: Date.now() + "-bot",
role: "assistant",
text: funReplies[Math.floor(Math.random() * funReplies.length)],
time: Date.now(),
};

setMessages((m) => [...m, botReply]);
setIsTyping(false);
}

async function handleSend(e) {
e?.preventDefault?.();
const trimmed = input.trim();
if (!trimmed) return;
setSending(true);

const userMsg = { id: Date.now(), role: "user", text: trimmed, time: Date.now() };
setMessages((m) => [...m, userMsg]);
setInput("");

try {
if (onSendMessage) {
const maybeReply = await onSendMessage(trimmed);
if (maybeReply) setMessages((m) => [...m, { ...maybeReply, role: "assistant" }]);
} else {
await sendMessageToBot(trimmed);
}
} catch (err) {
setMessages((m) => [
...m,
{ id: Date.now() + "-err", role: "assistant", text: "😢 Oops, something went wrong!", time: Date.now() },
]);
console.error(err);
} finally {
setSending(false);
}
}

function formatTime(ts) {
const d = new Date(ts);
return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
return (
<div className="container d-flex flex-column border rounded shadow-lg position-relative" style={{ maxWidth: "600px", height: "85vh", overflow: "hidden" }}>
{/* canvas three js background */}
<canvas ref={canvasRef} className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0, opacity: 0.2 }} />

{/* Chat overlay */}
<div className="d-flex flex-column h-100" style={{ zIndex: 1, position: "relative" }}>
{/* Header */}
<div className="d-flex align-items-center p-3 bg-dark text-white rounded-top">
<img src={botAvatar} alt="bot" className="rounded-circle me-3 border border-light" style={{ width: "50px", height: "50px" }} />
<div className="flex-grow-1">
<div className="fw-bold h5 mb-0">{botName}</div>
<span className="badge bg-success">🌐 Online</span>
</div>
<div className="fw-light">🎊 Let’s Chat!</div>
</div>

{/* Messages */}
<div ref={listRef} className="flex-grow-1 p-3 overflow-auto" style={{ backgroundColor: "rgba(255,255,255,0.9)" }}>
<div className="d-flex flex-column gap-3">
{messages.map((m) => (
<div key={m.id} className={`d-flex ${m.role === "user" ? "justify-content-end" : "justify-content-start"} align-items-end animate__animated animate__fadeIn`}>
{m.role !== "user" && (
<img src={botAvatar} alt="bot" className="rounded-circle me-2 shadow-sm" style={{ width: "40px", height: "40px" }} />
)}

<div className={`p-3 rounded-4 shadow ${
m.role === "user" ? "bg-primary text-white" : "bg-warning text-dark"
}`} style={{ maxWidth: "70%", fontSize: "0.9rem" }}>
<div>{m.text}</div>
<div className="small text-end opacity-75">{formatTime(m.time)}</div>
</div>

{m.role === "user" && (
<img src={userAvatar} alt="you" className="rounded-circle ms-2 shadow-sm" style={{ width: "40px", height: "40px" }} />
)}
</div>
))}

{isTyping && (
<div className="d-flex align-items-center gap-2 animate__animated animate__pulse animate__infinite">
<img src={botAvatar} alt="bot" className="rounded-circle shadow-sm" style={{ width: "36px", height: "36px" }} />
<div className="bg-white rounded px-3 py-2 shadow-sm d-flex gap-1">
<span className="spinner-grow spinner-grow-sm text-warning"></span>
<span className="spinner-grow spinner-grow-sm text-danger"></span>
<span className="spinner-grow spinner-grow-sm text-success"></span>
</div>
</div>
)}
</div>
</div>

{/* Composer */}
<form onSubmit={handleSend} className="d-flex align-items-center p-3 border-top bg-white gap-2">
<button
type="button"
className="btn btn-outline-secondary rounded-circle"
title="Attach"
onClick={() => alert("📎 Attach files feature coming soon!")}
>
📎
</button>

<input
value={input}
onChange={(e) => setInput(e.target.value)}
placeholder="Type something fun... ✨"
className="form-control rounded-pill shadow-sm"
/>

<button type="submit" disabled={sending} className={`btn rounded-pill px-4 ${sending ? "btn-secondary" : "btn-success"}`}>
{sending ? "⏳" : "🚀 Send"}
</button>
</form>
</div>
</div>
);
}
