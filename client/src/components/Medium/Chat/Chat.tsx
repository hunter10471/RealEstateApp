import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { IoMdClose } from "react-icons/io";
import { Chat as ChatTypes } from "../../../interfaces/chat.interface";
import { AuthContext } from "../../../context/AuthContext";
import apiRequest from "../../../lib/apiRequest";
import { User } from "../../../interfaces/user.interface";
import { format } from "timeago.js";
import { Message } from "../../../interfaces/message.interface";
import { SocketContext } from "../../../context/SocketContext";
import { useStore } from "../../../lib/notificationStore";

interface ChatProps {
	chats: ChatTypes[];
}

const Chat = ({ chats }: ChatProps) => {
	const [chat, setChat] = useState<any>(null);
	const { currentUser } = useContext(AuthContext);
	const { socket } = useContext(SocketContext);
	const messageEndRef = useRef<HTMLDivElement>(null);
	const decrease = useStore((state) => state.decrease);
	const handleOpenChat = async (id: string, receiver: User) => {
		try {
			const res = await apiRequest.get("/chat/" + id);
			if (!res.data.seenBy.includes(currentUser?.id)) {
				decrease();
			}
			setChat({ ...res.data, receiver });
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
			socket?.emit("sendMessage", {
				receiverId: chat.receiver.id,
				data: res.data,
			});
			const chatIndex = chats.findIndex((item) => item.id === chat.id);
			if (chatIndex !== -1) {
				chats[chatIndex].lastMessage = text;
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const read = async () => {
			try {
				await apiRequest.put("/chat/read/" + chat.id);
			} catch (error) {
				console.log(error);
			}
		};
		if (chat && socket) {
			socket.on("getMessage", (data) => {
				if (chat.id === data.chatId) {
					setChat((prev: ChatTypes) => ({
						...prev,
						messages: [...prev.messages, data],
					}));
					read();
				}
			});

			return () => {
				socket.off("getMessage");
			};
		}
	}, [socket, chat]);

	useEffect(() => {
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chat]);
	return (
		<div className="chat">
			<div className="messages">
				<h1>Messages</h1>
				{chats.map((item) => (
					<div
						style={{
							backgroundColor:
								item.seenBy.includes(currentUser ? currentUser.id : "") ||
								(chat && chat.id) === item.id
									? "white"
									: "#fecd514e",
						}}
						key={item.id}
						className="message"
						onClick={() => handleOpenChat(item.id, item.receiver)}
					>
						<img
							src={item.receiver.avatar || "/assets/avatar.png"}
							alt="avatar"
						/>
						<span>{item.receiver.username}</span>
						<p>{item.lastMessage}</p>
					</div>
				))}
			</div>
			{chat && (
				<div className="chatBox">
					<div className="top">
						<div className="user">
							<img
								src={chat.receiver.avatar || "/assets/avatar.png"}
								alt="avatar"
							/>
							<span>{chat.receiver.username}</span>
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
								key={message.id}
							>
								<p>{message.text}</p>
								<span>{format(message.createdAt)}</span>
							</div>
						))}
						<div ref={messageEndRef}></div>
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
