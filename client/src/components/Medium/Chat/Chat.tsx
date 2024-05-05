import { useState } from "react";
import "./chat.scss";
import { IoMdClose } from "react-icons/io";

const Chat = () => {
	const [chat, setChat] = useState<boolean | null>(true);

	return (
		<div className="chat">
			<div className="messages">
				<div className="message">
					<img
						src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="avatar"
					/>
					<span>John Doe</span>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
						excepturi?
					</p>
				</div>
				<div className="message">
					<img
						src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="avatar"
					/>
					<span>John Doe</span>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
						excepturi?
					</p>
				</div>
				<div className="message">
					<img
						src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="avatar"
					/>
					<span>John Doe</span>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
						excepturi?
					</p>
				</div>
				<div className="message">
					<img
						src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="avatar"
					/>
					<span>John Doe</span>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
						excepturi?
					</p>
				</div>
				<div className="message">
					<img
						src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="avatar"
					/>
					<span>John Doe</span>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
						excepturi?
					</p>
				</div>
			</div>
			{chat && (
				<div className="chatBox">
					<div className="top">
						<div className="user">
							<img
								src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt="avatar"
							/>
							<span>John Doe</span>
						</div>
						<IoMdClose onClick={() => setChat(false)} className="close" />
					</div>
					<div className="center">
						<div className="chatMessage">
							<p>Lorem ipsum dolor sit.</p>
							<span>1 hour ago</span>
						</div>
						<div className="chatMessage">
							<p>Lorem ipsum dolor sit.</p>
							<span>1 hour ago</span>
						</div>
						<div className="chatMessage own">
							<p>Lorem ipsum dolor sit.</p>
							<span>1 hour ago</span>
						</div>
						<div className="chatMessage">
							<p>Lorem ipsum dolor sit.</p>
							<span>1 hour ago</span>
						</div>
						<div className="chatMessage own">
							<p>Lorem ipsum dolor sit.</p>
							<span>1 hour ago</span>
						</div>
						<div className="chatMessage own">
							<p>Lorem ipsum dolor sit.</p>
							<span>1 hour ago</span>
						</div>
						<div className="chatMessage">
							<p>Lorem ipsum dolor sit.</p>
							<span>1 hour ago</span>
						</div>
					</div>
					<div className="bottom">
						<textarea></textarea>
						<button>Send</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Chat;
