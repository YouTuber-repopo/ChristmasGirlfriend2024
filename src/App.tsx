import './App.css'
import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, Conversation, ConversationHeader, Avatar, InfoButton, TypingIndicator} from '@chatscope/chat-ui-kit-react';

interface MessageModel {
  message: string;
  sentTime: Date;
  sender: AvaterModel;
  direction: 'incoming' | 'outgoing';
  position: 'normal' | 'first' | 'last' | 'single';
}

interface AvaterModel {
  name: string;
  image: string;
}

const GirlFriend: AvaterModel = {
  name: 'ｶｽ',
  image: 'src/assets/girlfriend.svg',
}

const User: AvaterModel = {
  name: 'Repopo',
  image: 'src/assets/user.jpg',
}

function App() {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const $typingIndicator = document.getElementById('typingIndicator');
  $typingIndicator && ($typingIndicator.style.display = 'none');
  let typer: string = 'Repopo';
  let typingTimeoutId: number;

  function handleSendMessage(message: string) {
    typingTimeoutId && clearTimeout(typingTimeoutId);
    const messageObject: MessageModel = {
      message: message,
      sentTime: new Date(),
      sender: User,
      direction: 'outgoing',
      position: 'normal',
    }

    setMessages([...messages, messageObject]);
    $typingIndicator && ($typingIndicator.style.display = 'none');

    typingTimeoutId = setTimeout(() => {
      handleReceiveMessage(messageObject, chooseMessage());
    } , 1000);
  }

  function chooseMessage(): string {
    const messages = [
      '大っ嫌い！',
      '話しかけないで！', 
      'もういいよ！',
      'もういいから！',
      'もういいってば！',
      'まだ話しかけるの？',
      '私の事どう思ってるの？',
      '嫌い。この世で一番。',
      'まぁ、別に、、好きとかじゃないから…',
      '口を慎め',
    ]
    let message = messages[Math.floor(Math.random() * messages.length)];
    return message;
  }

  function handleReceiveMessage(user_message: MessageModel, message: string) {
    setMessages([...messages, user_message, {
      message: message,
      sentTime: new Date(),
      sender: GirlFriend,
      direction: 'incoming',
      position: 'normal',
    }]);
  }

  function handleTypingIndicator(messenger: string) {
    typer = messenger;
    $typingIndicator && ($typingIndicator.style.display = 'flex');
    setTimeout(() => {
      $typingIndicator && ($typingIndicator.style.display = 'none');
    }, 3000);
  }

  return (
    <div className='chat-box' style={{position: 'relative', height: '90vh'}}>
      <MainContainer>
        <ChatContainer>
          <ConversationHeader>
            <Avatar name={GirlFriend.name} src={GirlFriend.image} />
            <ConversationHeader.Content userName={GirlFriend.name} info='Active 1h ago' />
            <ConversationHeader.Actions>
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList>
            {messages.map((message, index) => (
              <Message key={index} model={{
                message: message.message,
                sentTime: message.sentTime.toLocaleString(),
                sender: message.sender.name,
                direction: message.direction,
                position: message.position
              }}>
                <Avatar name={message.sender.name} src={message.sender.image} />
              </Message>
            ))}
            <TypingIndicator content={`${typer} is typing...`} id='typingIndicator' style={{}} />
          </MessageList>
          <MessageInput 
            placeholder="Type message here" 
            onSend={(message) => handleSendMessage(message)}
            onChange={handleTypingIndicator}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  )
}

export default App