import { useContext, useState } from "react";
import "./chat.scss";
import { IoMdClose } from "react-icons/io";
import { Chat as ChatTypes } from "../../../interfaces/chat.interface";
import { AuthContext } from "../../../context/AuthContext";
import apiRequest from "../../../lib/apiRequest";
import { User } from "../../../interfaces/user.interface";
import { format } from "timeago.js";
import { Message } from "../../../interfaces/message.interface";

interface ChatProps {
	chats: ChatTypes[];
}

const Chat = ({ chats }: ChatProps) => {
	const [chat, setChat] = useState<any>(null);
	const { currentUser } = useContext(AuthContext);
	const handleOpenChat = async (id: string, reciever: User) => {
		try {
			const res = await apiRequest.get("/chat/" + id);
			setChat({ ...res.data, reciever });
		} catch (error) {
			console.log(error);
		}
	};
	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const text = formData.get("text") as string;
		if (!text) return;
		try {
			const res = await apiRequest.post("/message/" + chat?.id, { text });
			setChat((prev: ChatTypes) => ({
				...prev,
				lastMessage: text,
				messages: [...prev?.messages, res.data],
			}));
			e.target.reset();
			const chatIndex = chats.findIndex((item) => item.id === chat.id);
			if (chatIndex !== -1) {
				chats[chatIndex].lastMessage = text;
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="chat">
			<div className="messages">
				<h1>Messages</h1>
				{chats.map((chat) => (
					<div
						style={{
							backgroundColor: chat.seenBy.includes(
								currentUser ? currentUser.id : ""
							)
								? "white"
								: "#fecd514e",
						}}
						key={chat.id}
						className="message"
						onClick={() => handleOpenChat(chat.id, chat.reciever)}
					>
						<img
							src={chat.reciever.avatar || "/assets/avatar.png"}
							alt="avatar"
						/>
						<span>{chat.reciever.username}</span>
						<p>{chat.lastMessage}</p>
					</div>
				))}
			</div>
			{chat && (
				<div className="chatBox">
					<div className="top">
						<div className="user">
							<img
								src={chat.reciever.avatar || "/assets/avatar.png"}
								alt="avatar"
							/>
							<span>{chat.reciever.username}</span>
						</div>
						<IoMdClose onClick={() => setChat(null)} className="close" />
					</div>
					<div className="center">
						{chat.messages.map((message: Message) => (
							<div
								style={{
									alignSelf: currentUser
										? message.userId === currentUser.id
											? "flex-end"
											: "flex-start"
										: undefined,
									textAlign: currentUser
										? message.userId === currentUser.id
											? "right"
											: "left"
										: undefined,
								}}
								className="chatMessage"
							>
								<p>{message.text}</p>
								<span>{format(message.createdAt)}</span>
							</div>
						))}
					</div>
					<form onSubmit={handleSubmit} className="bottom">
						<textarea name="text"></textarea>
						<button>Send</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Chat;
