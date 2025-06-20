<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LaravelGPT Chat | Laravel</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="{{asset('assets/css/my.css')}}">
</head>


<body>
    <div class="header">
        <div class="logo">
            <div class="logo-icon">AI</div>
            <span>LaravelGPT</span>
        </div>
        <div class="controls">
            <button class="control-button" title="Clear conversation" id="clearButton">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    </div>

    <div class="chat-container" id="chatContainer">
        <div class="message bot-message">
            <div class="message-content">
                <div class="avatar bot-avatar">AI</div>
                <div class="message-body">
                    <div class="message-actions">
                        <button class="action-button" title="Copy">
                            <i class="far fa-copy"></i>
                        </button>
                    </div>
                    <div class="message-text markdown-content">Hello! I'm your AI assistant powered by LaravelGPT. How can I help you today?
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="input-container">
        <div class="input-wrapper">
            <form id="chatForm">
                <textarea id="msg" class="input-field" placeholder="Message LaravelGPT..." rows="1" autofocus></textarea>
                <button type="submit" class="send-button" id="sendButton" disabled>
                    <i class="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    </div>

    <div class="scroll-indicator" id="scrollIndicator">
        <i class="fas fa-arrow-down"></i>
    </div>
<script src="{{asset('assets/js/my.js')}}"></script>
</body>
</html>
