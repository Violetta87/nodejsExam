<script>
    import { onMount } from 'svelte';
    import { BASE_URL } from '../store/base_url.js';
    import { user, userN } from '../store/user.js';
    import { messages } from '../store/forum.js';
    import io from "socket.io-client";

    let socket;
    console.log($userN)
  
    let newMessage = '';
  
    function sendMessage(){
        socket.emit("newMessage", {username: $userN, message: newMessage})
    }
    onMount(() => {
        socket = io("http://localhost:3000");
        socket.on("messagesRecieved",(data) => {
            messages.update(messagesList => {
                messagesList.push(data)
                console.log(data)
                return messagesList;
            })
        });
    });

</script>

<div class="body-container">
    <h1>ChatForum</h1>
    <div class="chat-forum">
        {#each $messages as message}
        <div>{message.username}</div>
          <div class="message">{message.message}</div>
        {/each}
      
        <div class="message-input">
          <input type="text" bind:value={newMessage} placeholder="Type your message..." />
          <button on:click={sendMessage}>Send</button>
        </div>
      </div>
</div>
  
  <style>
  
    .message-input {
      display: flex;
      margin-top: 20px;
    }
  
    .message-input input {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 5px;
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
  </style>
  
  