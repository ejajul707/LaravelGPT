
    document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chatForm');
    const msgInput = document.getElementById('msg');
    const chatContainer = document.getElementById('chatContainer');
    const sendButton = document.getElementById('sendButton');
    const clearButton = document.getElementById('clearButton');
    const scrollIndicator = document.getElementById('scrollIndicator');

    let currentEventSource = null;
    let isGenerating = false;
    let currentBotMessageId = null;
    let userScroll = false;
    msgInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 200) + 'px';
        updateSendButtonState();
    });
    msgInput.addEventListener('keyup', updateSendButtonState);
    msgInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey && !isGenerating && this.value.trim()) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });
    chatContainer.addEventListener('scroll', function() {
        const { scrollTop, scrollHeight, clientHeight } = chatContainer;
        const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
        userScroll = distanceFromBottom > 100;
        scrollIndicator.classList.toggle('visible', userScroll);
    });
    scrollIndicator.addEventListener('click', function() {
        scrollToBottom(true);
        this.classList.remove('visible');
    });
    chatForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const message = msgInput.value.trim();

        if (!message || isGenerating) return;
        addMessage('user', message);
        msgInput.value = '';
        msgInput.style.height = 'auto';
        sendButton.disabled = true;
        removeAllTypingIndicators();
        currentBotMessageId = 'bot-message-' + Date.now();
        const botMessageDiv = createBotMessageElement(currentBotMessageId);
        chatContainer.appendChild(botMessageDiv);
        const messageTextElement = botMessageDiv.querySelector('.message-text');

        messageTextElement.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
        scrollToBottom();

        isGenerating = true;
        currentEventSource = new EventSource(`/chat?message=${encodeURIComponent(message)}`);

        let fullResponse = '';
        let firstChunkReceived = false;

        currentEventSource.onmessage = function(event) {
            try {
                const data = JSON.parse(event.data);
                
                if (!firstChunkReceived) {
                    messageTextElement.innerHTML = '';
                    firstChunkReceived = true;
                }

                if (data.error) {
                    showErrorMessage(messageTextElement, data.error);
                    if (data.done) endGeneration();
                    return;
                }

                if (data.reply !== undefined) {
                    fullResponse += data.reply;
                    messageTextElement.innerHTML = markdownToHtml(fullResponse);
                    
                    if (!userScroll) {
                        setTimeout(() => scrollToBottom(), 50);
                    }
                }

                if (data.done) {
                    endGeneration();
                }
            } catch (error) {
                console.error('Error parsing SSE data:', error);
                showErrorMessage(messageTextElement, 'Error processing response');
                endGeneration();
            }
        };

        currentEventSource.onerror = function() {
            if (!firstChunkReceived) {
                showErrorMessage(messageTextElement, 'Connection error. Please try again.');
            }
            endGeneration();
        };
    });

    clearButton.addEventListener('click', function() {
        if (confirm('Clear conversation history?')) {
            if (isGenerating) {
                endGeneration();
            }
            chatContainer.innerHTML = `
                <div class="message bot-message">
                    <div class="message-content">
                        <div class="avatar bot-avatar">AI</div>
                        <div class="message-body">
                            <div class="message-text markdown-content">
                                Hello! I'm your AI assistant. How can I help you today?
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    function updateSendButtonState() {
        sendButton.disabled = msgInput.value.trim() === '' || isGenerating;
    }


function addMessage(sender, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const avatar = document.createElement('div');
    avatar.className = `avatar ${sender}-avatar`;
    avatar.textContent = sender === 'user' ? 'You' : 'AI';
    
    const messageBody = document.createElement('div');
    messageBody.className = 'message-body';
    
    const messageActions = document.createElement('div');
    messageActions.className = 'message-actions';
    
    const copyButton = document.createElement('button');
    copyButton.className = 'action-button';
    copyButton.title = 'Copy';
    copyButton.innerHTML = '<i class="far fa-copy"></i>';
    
    const messageText = document.createElement('div');
    messageText.className = 'message-text markdown-content';
    messageText.innerHTML = sender === 'user' ? content : markdownToHtml(content);
    
    messageActions.appendChild(copyButton);
    messageBody.appendChild(messageActions);
    messageBody.appendChild(messageText);
    messageContent.appendChild(avatar);
    messageContent.appendChild(messageBody);
    messageDiv.appendChild(messageContent);
    
    copyButton.addEventListener('click', () => {
        const textToCopy = messageText.textContent;
        navigator.clipboard.writeText(textToCopy);
        copyButton.innerHTML = '<i class="fas fa-check"></i>';
        copyButton.title = 'Copied!';
        setTimeout(() => {
            copyButton.innerHTML = '<i class="far fa-copy"></i>';
            copyButton.title = 'Copy';
        }, 2000);
    });
    
    chatContainer.appendChild(messageDiv);
    scrollToBottom();
}

    function createBotMessageElement(id) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.id = id;

        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="avatar bot-avatar">AI</div>
                <div class="message-body">
                    <div class="message-actions">
                        <button class="action-button" title="Copy">
                            <i class="far fa-copy"></i>
                        </button>
                    </div>
                    <div class="message-text markdown-content"></div>
                </div>
            </div>
        `;
        const copyButton = messageDiv.querySelector('.action-button');
        const messageText = messageDiv.querySelector('.message-text');
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(messageText.textContent);
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            copyButton.title = 'Copied!';
            setTimeout(() => {
                copyButton.innerHTML = '<i class="far fa-copy"></i>';
                copyButton.title = 'Copy';
            }, 2000);
        });

        return messageDiv;
    }

    function removeAllTypingIndicators() {
        document.querySelectorAll('.typing-indicator').forEach(el => {
            el.closest('.message').remove();
        });
    }

    function showErrorMessage(element, message) {
        if (!element) return;
        element.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
            </div>
        `;
    }

    function scrollToBottom(force = false) {
        if (force || !userScroll) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    function endGeneration() {
        if (currentEventSource) {
            currentEventSource.close();
            currentEventSource = null;
        }
        isGenerating = false;
        currentBotMessageId = null;
        updateSendButtonState();
        msgInput.focus();
    }

    function markdownToHtml(text) {
        return text
            .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            .replace(/\n/g, '<br>');
    }
});