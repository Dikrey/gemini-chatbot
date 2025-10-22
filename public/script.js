/**
 * @file script.js
 * @description Frontend logic for the chat interface.
 */

document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const submitButton = chatForm.querySelector('button[type="submit"]');

    const API_ENDPOINT = '/api/chat';

    let conversation = [];

    const addMessage = (message, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);

        const avatarElement = document.createElement('div');
        avatarElement.classList.add('message-avatar');

        if (sender === 'user') {
            avatarElement.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        } else if (sender === 'bot' || sender === 'thinking') {
            avatarElement.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.75 17L9 20L8 21H16L15 20L14.25 17M12 15H12.01M8.5 2.5L10.5 1L15.5 4.5L20.5 1L22.5 2.5V9.5L20.5 11L15.5 7.5L10.5 11L8.5 9.5V2.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        } else if (sender === 'error') {
            avatarElement.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 9V11M12 15H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        }


        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        const messageText = document.createElement('p');
        messageText.textContent = message;
        messageContent.appendChild(messageText);

        messageElement.appendChild(avatarElement);
        messageElement.appendChild(messageContent);

        chatBox.appendChild(messageElement);
      
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });

        if (sender === 'user' || sender === 'bot') {
            updateMessageCounter();
        }

        return messageElement;
    };

    /**
     * Handles the form submission event.
     * @param {Event} event - The form submission event.
     */
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const userMessage = userInput.value.trim();
        if (!userMessage) {
            return; 
        }

     
        submitButton.disabled = true;
        userInput.disabled = true;

        submitButton.classList.add('loading');

        
        addMessage(userMessage, 'user');
        userInput.value = '';

       
        conversation.push({ role: 'user', text: userMessage });

        const thinkingMessageElement = addMessage('Thinking...', 'thinking');

        try {
        
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ conversation }),
            });

            if (!response.ok) {
                
                throw new Error(`Failed to get response from server. Status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success && result.data) {
                thinkingMessageElement.classList.remove('thinking-message');
                thinkingMessageElement.classList.add('bot-message');
                thinkingMessageElement.querySelector('p').textContent = result.data;
                conversation.push({ role: 'model', text: result.data });

            } else {
                const errorMessage = result.error || "Sorry, no response received.";
                thinkingMessageElement.classList.remove('thinking-message');
                thinkingMessageElement.classList.add('error-message');
                thinkingMessageElement.querySelector('p').textContent = errorMessage;
            }
        } catch (error) {
            console.error('Error fetching chat response:', error);
            const errorMessage = error.message.includes('Status')
                ? error.message
                : "Failed to get response from server.";
            thinkingMessageElement.classList.remove('thinking-message');
            thinkingMessageElement.classList.add('error-message');
            thinkingMessageElement.querySelector('p').textContent = errorMessage;
        } finally {
            submitButton.disabled = false;
            userInput.disabled = false;
            submitButton.classList.remove('loading');
            userInput.focus();
        }
    };

    let typingTimeout;


    const showTypingIndicator = () => {
        clearTimeout(typingTimeout);
       
    };

    const hideTypingIndicator = () => {
        typingTimeout = setTimeout(() => {
        }, 5000);
    };


    if (chatForm) {
        chatForm.addEventListener('submit', handleFormSubmit);

        userInput.addEventListener('input', showTypingIndicator);
        userInput.addEventListener('keydown', hideTypingIndicator);
    } else {
        console.error('Chat form with id "chat-form" not found.');
    }

    let messageCount = 0;
    const messageCountElement = document.getElementById('message-count');

    const updateMessageCounter = () => {
        messageCount++;
        if (messageCountElement) {
            messageCountElement.textContent = messageCount;
            messageCountElement.style.animation = 'countPulse 0.3s ease-out';
            setTimeout(() => {
                messageCountElement.style.animation = '';
            }, 300);
        }
    };

    let isDarkMode = false;
    const themeToggle = document.getElementById('theme-toggle');

    const toggleTheme = () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode', isDarkMode);
        themeToggle.classList.toggle('dark', isDarkMode);
        localStorage.setItem('darkMode', isDarkMode);
    };


    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
        themeToggle.classList.add('dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    let soundEnabled = true;
    const soundToggle = document.getElementById('sound-toggle');

    const toggleSound = () => {
        soundEnabled = !soundEnabled;
        soundToggle.classList.toggle('muted', !soundEnabled);
        localStorage.setItem('soundEnabled', soundEnabled);
    };

    const savedSound = localStorage.getItem('soundEnabled');
    if (savedSound === 'false') {
        soundEnabled = false;
        soundToggle.classList.add('muted');
    }

    if (soundToggle) {
        soundToggle.addEventListener('click', toggleSound);
    }

    const clearChatBtn = document.getElementById('clear-chat');

    const clearChat = () => {
        chatBox.innerHTML = `
            <div class="welcome-message">
                <div class="bot-avatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4L19 9Z" fill="#10b981"/>
                    </svg>
                </div>
                <div class="welcome-content">
                    <p>Hello! I'm your AI assistant powered by Gemini. How can I help you today?</p>
                </div>
            </div>
        `;

        conversation = [];

      
        messageCount = 0;
        if (messageCountElement) {
            messageCountElement.textContent = messageCount;
        }

     
        submitButton.disabled = false;
        userInput.disabled = false;
        submitButton.classList.remove('loading');
        userInput.focus();
    };

    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', clearChat);
    }
});
