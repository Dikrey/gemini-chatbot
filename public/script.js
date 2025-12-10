document.addEventListener('DOMContentLoaded', () => {
    // --- UI Elements ---
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const welcomeScreen = document.getElementById('welcome-screen');
    const sendBtn = document.getElementById('send-btn');
    const stopBtn = document.getElementById('stop-btn');
    const voiceOverlay = document.getElementById('voice-overlay');
    
    // Sidebar & Navigation
    const sidebar = document.getElementById('sidebar');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const historyList = document.getElementById('history-list');
    const newChatBtn = document.getElementById('new-chat-btn');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const copyChatBtn = document.getElementById('copy-chat-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');

    // Tools
    const emojiBtn = document.getElementById('emoji-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const emojiPicker = document.getElementById('emoji-picker');

    const API_ENDPOINT = '/api/chat';

    // --- State Management ---
    let currentChatId = null;
    let chats = {};
    let abortController = null;
    let recognition = null;

    // --- INIT ---
    const init = () => {
        loadChats();
        loadTheme();
        
        // Typing Intro
        const introTexts = ["HELLO, I AM RAIHAN AI.", "YOUR CODING ASSISTANT.", "LET'S BUILD SOMETHING."];
        typeWriter(document.getElementById('typing-text'), introTexts);

        // Load specific or new chat
        if (!currentChatId) createNewChat(false);
        else renderCurrentChat();

        setupEventListeners();
    };

    // --- Typing Animation ---
    const typeWriter = (el, texts) => {
        let textIndex = 0, charIndex = 0, isDeleting = false;
        
        const type = () => {
            const current = texts[textIndex];
            el.textContent = current.substring(0, charIndex + (isDeleting ? -1 : 1));
            charIndex += isDeleting ? -1 : 1;

            let speed = isDeleting ? 50 : 100;
            if (!isDeleting && charIndex === current.length) { speed = 2000; isDeleting = true; }
            else if (isDeleting && charIndex === 0) { isDeleting = false; textIndex = (textIndex + 1) % texts.length; speed = 500; }
            
            setTimeout(type, speed);
        };
        type();
    };

    // --- Chat Logic ---
    const loadChats = () => {
        const saved = localStorage.getItem('raihan_chats');
        if(saved) chats = JSON.parse(saved);
        currentChatId = localStorage.getItem('raihan_active_id');
    };

    const saveChats = () => {
        localStorage.setItem('raihan_chats', JSON.stringify(chats));
        if(currentChatId) localStorage.setItem('raihan_active_id', currentChatId);
        renderHistory();
    };

    const createNewChat = (focus = true) => {
        const id = Date.now().toString();
        chats[id] = [];
        currentChatId = id;
        saveChats();
        renderCurrentChat();
        if(focus) userInput.focus();
        if(window.innerWidth <= 768) sidebar.classList.remove('open');
    };

    const renderHistory = () => {
        historyList.innerHTML = '';
        Object.keys(chats).reverse().forEach(id => {
            const msgs = chats[id];
            const title = msgs.length ? msgs[0].text : 'New Session';
            
            const div = document.createElement('div');
            div.className = `history-item ${id === currentChatId ? 'active' : ''}`;
            div.innerHTML = `<i class="ri-message-3-line"></i> <span>${title.substring(0, 20)}...</span>`;
            div.onclick = () => { currentChatId = id; saveChats(); renderCurrentChat(); };
            historyList.appendChild(div);
        });
    };

    const renderCurrentChat = () => {
        // Clear chat box except welcome screen logic
        const msgs = chats[currentChatId] || [];
        
        // Remove old messages
        Array.from(chatBox.children).forEach(child => {
            if (child.id !== 'welcome-screen') child.remove();
        });

        if(msgs.length === 0) {
            welcomeScreen.classList.remove('hidden');
        } else {
            welcomeScreen.classList.add('hidden');
            msgs.forEach(m => {
                const sender = m.role === 'user' ? 'user' : 'bot';
                appendMessage(m.text, sender, false);
            });
        }
        renderHistory();
        scrollToBottom();
    };

    // --- Message UI (With Terminal Code Blocks) ---
    const appendMessage = (text, sender, animate = true) => {
        if(!welcomeScreen.classList.contains('hidden')) welcomeScreen.classList.add('hidden');

        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}-message`;
        
        const avatarIcon = sender === 'user' ? '<i class="ri-user-smile-line"></i>' : '<i class="ri-robot-2-line"></i>';
        
        // Parse Text
        const contentHtml = sender === 'bot' ? marked.parse(text) : text.replace(/\n/g, '<br>');

        msgDiv.innerHTML = `
            <div class="avatar">${avatarIcon}</div>
            <div class="msg-content">
                <div class="bubble">${contentHtml}</div>
            </div>
        `;

        // Handle Code Blocks
        if(sender === 'bot') {
            msgDiv.querySelectorAll('pre code').forEach(block => {
                hljs.highlightElement(block);
                
                // Add Copy Button to Code Block
                const btn = document.createElement('button');
                btn.className = 'copy-code-btn';
                btn.innerHTML = '<i class="ri-file-copy-line"></i> Copy';
                btn.onclick = () => {
                    navigator.clipboard.writeText(block.textContent);
                    showToast('Code copied to clipboard!');
                };
                block.parentElement.appendChild(btn);
            });
        }

        chatBox.appendChild(msgDiv);
        scrollToBottom();
        return msgDiv;
    };

    const scrollToBottom = () => chatBox.scrollTop = chatBox.scrollHeight;

    // --- API Handlers ---
    const handleSubmit = async (e) => {
        if(e) e.preventDefault();
        const text = userInput.value.trim();
        if(!text) return;

        userInput.value = '';
        userInput.style.height = 'auto';
        sendBtn.disabled = true;
        sendBtn.classList.add('loading');
        stopBtn.classList.remove('hidden');

        // User Side
        appendMessage(text, 'user');
        if(!chats[currentChatId]) chats[currentChatId] = [];
        chats[currentChatId].push({role:'user', text:text});
        saveChats();

        // Thinking
        const thinkingMsg = document.createElement('div');
        thinkingMsg.className = 'chat-message bot-message';
        thinkingMsg.innerHTML = `<div class="avatar"><i class="ri-robot-2-line"></i></div><div class="bubble" style="opacity:0.7">Thinking...</div>`;
        chatBox.appendChild(thinkingMsg);
        scrollToBottom();

        // API Call
        const context = chats[currentChatId].map(m => ({role: m.role, text: m.text}));
        abortController = new AbortController();

        try {
            const res = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({conversation: context}),
                signal: abortController.signal
            });

            thinkingMsg.remove();
            
            if(!res.ok) throw new Error('API Error');
            const data = await res.json();

            if(data.success && data.data) {
                appendMessage(data.data, 'bot');
                chats[currentChatId].push({role:'model', text: data.data});
                saveChats();
            } else {
                appendMessage('Error: ' + (data.error || 'No response'), 'bot');
            }

        } catch(err) {
            thinkingMsg.remove();
            if(err.name !== 'AbortError') appendMessage('Connection Error: ' + err.message, 'bot');
        } finally {
            sendBtn.disabled = false;
            sendBtn.classList.remove('loading');
            stopBtn.classList.add('hidden');
            abortController = null;
            userInput.focus();
        }
    };

    // --- Features: Voice, Copy All, Settings ---

    // 1. Voice to Text (Fixed)
    const toggleVoice = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Browser not supported for voice.'); 
            return;
        }
        
        if (recognition) {
            recognition.stop();
            recognition = null;
            voiceOverlay.classList.add('hidden');
            return;
        }

        recognition = new webkitSpeechRecognition();
        recognition.lang = 'id-ID'; // Bahasa Indonesia Default
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            voiceOverlay.classList.remove('hidden');
        };

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            userInput.value += (userInput.value ? ' ' : '') + transcript;
            userInput.dispatchEvent(new Event('input')); // resize textarea
        };

        recognition.onend = () => {
            voiceOverlay.classList.add('hidden');
            recognition = null;
            userInput.focus();
        };

        recognition.onerror = (e) => {
            console.error(e);
            voiceOverlay.classList.add('hidden');
            recognition = null;
            showToast('Voice Error: ' + e.error);
        };

        recognition.start();
    };

    // 2. Copy All Chat
    copyChatBtn.addEventListener('click', () => {
        if(!chats[currentChatId]) return;
        const text = chats[currentChatId].map(m => `[${m.role.toUpperCase()}]: ${m.text}`).join('\n\n');
        navigator.clipboard.writeText(text);
        showToast('Full conversation copied!');
    });

    // 3. Helper: Toast
    const showToast = (msg) => {
        const t = document.getElementById('toast');
        document.getElementById('toast-msg').textContent = msg;
        t.classList.remove('hidden');
        setTimeout(() => t.classList.add('hidden'), 3000);
    };

    // 4. Helper: Quick Reply
    window.setInput = (txt) => {
        userInput.value = txt;
        handleSubmit();
    };

    // --- Event Listeners ---
    chatForm.addEventListener('submit', handleSubmit);
    
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        sendBtn.disabled = this.value.trim() === '';
    });

    userInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
    });

    stopBtn.addEventListener('click', () => { if(abortController) abortController.abort(); });
    voiceBtn.addEventListener('click', toggleVoice);
    
    // Sidebar
    hamburgerBtn.addEventListener('click', () => sidebar.classList.add('open'));
    closeSidebarBtn.addEventListener('click', () => sidebar.classList.remove('open'));
    newChatBtn.addEventListener('click', () => createNewChat());
    
    clearAllBtn.addEventListener('click', () => {
        if(confirm('Delete all chats?')) {
            chats = {}; currentChatId = null; 
            localStorage.removeItem('raihan_chats'); 
            createNewChat();
        }
    });

    // Settings Modal
    settingsBtn.addEventListener('click', () => settingsModal.classList.remove('hidden'));
    document.getElementById('close-settings').addEventListener('click', () => settingsModal.classList.add('hidden'));

    // Theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('raihan_theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    // Emoji (Simplified)
    emojiBtn.addEventListener('click', () => {
        emojiPicker.classList.toggle('hidden');
        if(emojiPicker.innerHTML === '') {
            const emojis = ['😀','😂','❤️','👍','🔥','🎉','🤖','🧠','💻','🚀'];
            emojis.forEach(e => {
                const s = document.createElement('span');
                s.textContent = e;
                s.style.cssText = "font-size:1.5rem; cursor:pointer; padding:5px;";
                s.onclick = () => { userInput.value += e; emojiPicker.classList.add('hidden'); };
                emojiPicker.appendChild(s);
            });
        }
    });

    // Run
    init();
});