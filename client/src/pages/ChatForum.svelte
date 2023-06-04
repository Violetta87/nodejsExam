<script>
    import { afterUpdate, onMount } from 'svelte';
    import { BASE_URL } from '../store/base_url.js';
    import { userN } from '../store/user.js';
    import { messages } from '../store/forum.js';
    import io from "socket.io-client";

    let socket;
    let newMessage = '';
    let chatForumContainer;

    function messageDate(){
      const currentDate = new Date();
      const dayOfWeek = currentDate.toLocaleDateString('en',{weekday: 'long'})
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes().toLocaleString('en', { minimumIntegerDigits:2 });
      const forMattedDate = `${dayOfWeek}, ${hours}:${minutes}`
      return forMattedDate;
    }

    function sendMessage(){
      const dayAndTime = messageDate();
      socket.emit("newMessage", {username: $userN, message: newMessage, dayAndTime: dayAndTime})
      newMessage='';
    }

    onMount(() => {
      console.log($userN)
        socket = io($BASE_URL);
        socket.on("messagesRecieved",(data) => {
            messages.update(messagesList => {
                messagesList.push(data)
                return messagesList;
            })
        });
    });

    afterUpdate(()=>{
      chatForumContainer.scrollTo({top: chatForumContainer.scrollHeight, behavior: "smooth"});
    })

</script>

<div class=outer-body-container>
  <div class="body-container">
    <h1>ChatForum</h1>
    <div class="chat-forum" bind:this={chatForumContainer}>
        {#each $messages as message}
        <div class="message-container">
          <div class="message-bubble {message.username === $userN ? 'current-user': 'received-user'}">
            <div class="message-text-container {message.username === $userN ? 'current-user': 'received-user'}">
              <div class="username">{message.username}</div>
              <div class="message-content">{message.message}</div>
            </div>
            <div class="message-meta-container">
              <span class="day-and-time">{message.dayAndTime}</span>
            </div>
          </div>
        </div>
        {/each}
      </div>
      <div class="message-input">
        <div class="input-container">
          <input type="text" bind:value={newMessage} placeholder="Type your message..." />
          <button on:click={sendMessage}>Send</button>
        </div>
      </div>
</div>
</div>


  
  <style>

  .body-container{
    height:70vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  
  .chat-forum {
      flex:1;
      display: flex;
      flex-direction: column;
      width: 50vw;
      padding: 10px;
      border: 2px solid pink;
      border-radius: 10px;
      overflow-y: auto;
      background-color: white;
    }

    .message-container{
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }
  
    .message-bubble {
      display: flex;
      flex-direction: column;
      max-width: 100vw;
    }

    .message-bubble.current-user{
      align-self: flex-end;
    }
    .message-bubble.received-user{
      align-self: flex-start;
    }
  
    .username {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .input-container{
      display:flex;
      align-items: flex-end;
      width: 100%;
      margin: 2%;
    }
  
    .message-input {
      display: flex;
      margin-top: auto;
      justify-content: flex-end;
      width: 50vw;
      background: pink;
      border-radius: 10px;
    }
  
    .message-input input {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 10px;
      font-size: 14px;
    }
  
    .message-input button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background-color: #4caf50;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin-left: 10px;
    }

    .message-meta-container{
      display: flex;
      justify-content: flex-end;
      font-size: 12px;
      color: #888;
    }

    .message-text-container{
      display: flex;
      flex-direction: column;
      max-width: 100vw;
      margin-bottom: 5px;
      padding: 10px;
      border-radius: 10px;
      background-color: #f0f0f0;
    }

    .message-text-container.received-user{
      align-self: flex-start;
      background-color: lightgray;
      color:#000;
      
    }

    .message-text-container.current-user{
      align-self: flex-end;
      background-color: blue;
      color: #fff;
      
    }

    .message-text-container .username{
      font-weight: bold;
      margin-bottom:5px;
    }

    .message-text-container .message-content{
      margin-bottom: 5px;
    }

  </style>


  