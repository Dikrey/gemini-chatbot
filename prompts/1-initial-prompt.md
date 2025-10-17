Hey bro, I need your help in implementing chat APIs into a front-end file named @script.js. The implementation of the API is located in @index.js file. The request body that has to be made, and the response format for success and error results are already present there.

So, I need your help in implementing chat APIs that are already present. On the frontend, I have a form with a text input and a submit button.

When the user submits the form, I want to:
- Add the user's message to the chat box.
- Show a temporary "Thinking..." bot message.
- Send the user's message as a POST request to /api/chat (with body format provided in @index.js file).
- When the response arrives, replace the "Thinking..." message with the AI's actual reply (from the `data` property received from the back-end).
- If an error occurs or no result is received, show "Sorry, no response received." or "Failed to get response from server."

Can you help me write the enhanced @script.js for the front-end (which uses vanilla JS, no frameworks are used) that covers this flow, including a proper error handling and DOM manipulation provided from there?

Please make sure the code is simple and production-ready!

The HTML structure is:

```
<div id="chat-box"></div>

<form id="chat-form">
    <input type="text" id="user-input" />
    <button type="submit">Send</button>
</form>
```

Make sure to focus only on @script.js file, matching the backend API spec above. I have tested the back-end, and it worked wonderfully.

Can you help me, bro?