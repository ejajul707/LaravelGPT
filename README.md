![LaravelGPT](https://github.com/user-attachments/assets/886db180-b913-46a1-8eda-31e12bf5a2fb)# 🌟 LaravelGPT: Your Friendly AI Chatbot 🤖💬

Welcome to **LaravelGPT**! A super **cute and powerful offline AI chatbot** crafted with love using **Laravel** and powered by the brilliant **LLaMA 3** via **Ollama**. It’s fast, private, and designed to make your AI experience delightful—whether you're coding, learning, or just chatting for fun! With **real-time streaming** and a cozy interface, it’s like having a smart buddy right on your computer! 😊

![LaravelGPT](https://github.com/user-attachments/assets/d7070832-3969-4333-8e9c-0f2b5da4ce0a)


---

## 🎨 Sneak Peek at the Chat Magic

![Chat UI Preview](![image](https://github.com/user-attachments/assets/5734e375-9fc4-4663-bacb-02f5371452dd)
)

---

## ✨ Why You'll Love LaravelGPT

- 🌈 **Offline & Private**: Runs locally with LLaMA 3—no internet, no API keys, just pure privacy! 🛡️
- ⚡️ **Instant Replies**: Real-time streaming with Server-Sent Events (SSE) for a smooth, snappy chat experience.
- 🧡 **Laravel Magic**: Built with Laravel 10 for a robust and developer-friendly vibe.
- 🎉 **Adorable UI**: A clean, responsive interface styled with Tailwind CSS that feels like a warm hug.
- 🛠️ **Easy to Tweak**: Lightweight and perfect for adding your own creative touches!
- 💻 **Local Power**: No cloud, no fuss—just you and your AI pal.

---

## 🛠️ Tech Stack That Shines

- **Framework**: Laravel 10 (the heart of the magic ✨)
- **Language**: PHP 8.x
- **AI Brain**: LLaMA 3 via Ollama
- **Frontend**: Tailwind CSS, JavaScript (EventSource API), Blade Templates
- **Database**: MySQL or SQLite (your choice!)
- **AI Server**: Ollama (your local AI powerhouse)

---

## 🚀 Get Started in a Snap!

Ready to bring LaravelGPT to life? Follow these simple steps to set it up on your system. It’s as easy as sipping your favorite chai! ☕

### 1️⃣ Prerequisites

- PHP 8.x
- Composer
- Node.js & npm
- MySQL or SQLite
- Ollama (to power the AI magic)

### 2️⃣ Grab the Code

```bash
git clone https://github.com/ejajul707/LaravelGPT.git
cd LaravelGPT
```

### 3️⃣ Set Up Laravel

```bash
composer install
cp .env.example .env
php artisan key:generate
```

### 4️⃣ Prep Your Database

Create a database (e.g., `laravelgpt`) and update your `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravelgpt
DB_USERNAME=root
DB_PASSWORD=
```

Run the migrations:

```bash
php artisan migrate
```

### 5️⃣ Style It Up

Install and compile frontend assets:

```bash
npm install
npm run dev
```

### 6️⃣ Unleash the AI with Ollama

1. **Install Ollama**: Grab it from [https://ollama.com/download](https://ollama.com/download) for Mac, Windows, or Linux. Check it’s working with `ollama --version`.
2. **Run LLaMA 3**:
   ```bash
   ollama run llama3
   ```
   This downloads LLaMA 3 and starts it as your local AI server. So cool, right? 😎

### 7️⃣ Launch Your Chatbot

In one terminal, start the Laravel server:

```bash
php artisan serve
```

In another, keep the frontend fresh:

```bash
npm run dev
```

### 8️⃣ Start Chatting!

Open your browser and visit:

```
http://127.0.0.1:8000
```

Say "Hello" to your new AI friend! 🥰

---

## 🧙‍♂️ How the Magic Happens

1. **You Type**: Drop a message in the adorable chat UI (`resources/views/chat.blade.php`).
2. **Real-Time Vibes**: Laravel streams replies instantly using SSE (`text/event-stream`).
3. **AI Brain at Work**: Laravel talks to the local Ollama server, powered by LLaMA 3.
4. **Chat Flows**: Responses pop up in real time, making it feel like a live convo!

---

## 📂 Project Structure

```
LaravelGPT/
├── app/Http/Controllers/ChatController.php  # The brain behind the chat
├── routes/web.php                          # Routes to guide the magic
├── resources/views/chat.blade.php          # Your cozy chat interface
├── public/
│   ├── css/app.css                        # Stylish Tailwind CSS
│   └── assets/images/                     # Cute banners & screenshots
├── .env                                   # Your secret settings
├── README.md                              # This adorable guide
```

---

## 📸 Cute Screenshots

- **Chat UI**: `assets/images/screenshots/chat-ui.png`
- **Banner**: `assets/images/banner.png` (optional GitHub sparkle)

Tuck your screenshots into `assets/images/screenshots/` for easy access!

---

## 🌟 Fun Ideas to Make It Yours

- 📜 **PDF Chats**: Upload a PDF and chat about its contents.
- 🧠 **Memory Magic**: Save your chats with sessions or a database.
- 🔒 **Login Love**: Add user accounts for personal chat histories.
- 🎭 **AI Roles**: Switch between "Assistant", "Coder", or "Bestie" modes.
- 🌐 **API Fun**: Turn it into a REST API for other apps to join the party!

---

## 🧑‍💻 Crafted with Love

Built with tons of ❤️ by **Ejajul Ansari**

- **GitHub**: [github.com/ejajul707](https://github.com/ejajul707)
- **LinkedIn**: [linkedin.com/in/ejajul-ansari](https://linkedin.com/in/ejajul-ansari)

---

## 💬 Need a Hand?

Got questions or ideas? We’re here for you!
- Drop an issue on the [GitHub repo](https://github.com/ejajul707/LaravelGPT).
- Ping me on LinkedIn for a friendly chat!

---

## 📜 License

LaravelGPT is **open-source** under the **MIT License**. Fork it, tweak it, and spread the love! 💖

---

## 🟢 Your Next Adventure

1. Save this as `README.md` in your `LaravelGPT` folder.
2. Push it to your repo:

```bash
git add README.md
git commit -m "Add super cute README with setup and sparkles"
git push
```

Want to make it even more adorable? I can:
- Whip up a **GitHub banner** with a fun vibe.
- Add a **PDF upload feature** to chat with documents.
- Craft a **LinkedIn post** to show off your awesome project!

Just let me know, bhai! 💪✨
