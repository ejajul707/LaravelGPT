LaravelGPT 🤖💬
LaravelGPT is a robust, offline AI-powered chatbot built using the Laravel framework and integrated with LLaMA 3 via Ollama. Designed for privacy, speed, and extensibility, it leverages Server-Sent Events (SSE) for real-time response streaming, offering a seamless and interactive user experience. Ideal for developers, learners, and enthusiasts looking to explore AI-driven applications within a secure, local environment.


🧠 Chat UI Preview


🚀 Features

Offline AI Chatbot: Powered by LLaMA 3 through Ollama, ensuring complete privacy with no external API dependencies.
Real-Time Streaming: Utilizes Server-Sent Events (SSE) for instant, dynamic response rendering.
Laravel-Powered: Built on the Laravel 10 framework for scalability and maintainability.
Responsive UI: Crafted with Tailwind CSS and Blade templates for a modern, user-friendly interface.
Developer-Friendly: Lightweight, modular, and easy to extend for custom use cases.
Local Processing: No API keys or cloud services required, ensuring data security.


🔧 Tech Stack

Framework: Laravel 10
Language: PHP 8.x
AI Model: LLaMA 3 (via Ollama)
Frontend: Tailwind CSS, JavaScript (EventSource API), Blade Templates
Database: MySQL/SQLite (configurable)
Local LLM Server: Ollama


📦 Installation
Follow these steps to set up LaravelGPT on your local system.
1️⃣ Prerequisites

PHP 8.x
Composer
Node.js & npm
MySQL/SQLite (or any Laravel-supported database)
Ollama (for running LLaMA 3 locally)

2️⃣ Clone the Repository
git clone https://github.com/ejajul707/LaravelGPT.git
cd LaravelGPT

3️⃣ Install Laravel Dependencies
composer install
cp .env.example .env
php artisan key:generate

4️⃣ Configure the Database
Update your .env file with your database credentials:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravelgpt
DB_USERNAME=root
DB_PASSWORD=

Run the migrations:
php artisan migrate

5️⃣ Install Frontend Dependencies
npm install
npm run dev

6️⃣ Set Up Ollama & LLaMA 3

Install Ollama:

Download and install Ollama for your OS (Mac, Windows, Linux) from https://ollama.com/download.
Verify installation by running ollama --version in your terminal.


Run LLaMA 3:
ollama run llama3

This command downloads and starts the LLaMA 3 model, running it locally as a server.


7️⃣ Start the Application
In one terminal, start the Laravel development server:
php artisan serve

In another terminal, compile and watch frontend assets:
npm run dev

8️⃣ Access the Chatbot
Open your browser and navigate to:
http://127.0.0.1:8000

Start interacting with your local AI chatbot!

🛠️ How It Works

User Input: Users submit messages via the chat interface (resources/views/chat.blade.php).
Real-Time Streaming: Laravel processes the input and streams responses using SSE (text/event-stream).
AI Integration: The application sends requests to the local Ollama server, which processes inputs using the LLaMA 3 model.
Response Delivery: Generated responses are streamed back to the UI in real time for a smooth user experience.


📁 Project Structure
LaravelGPT/
├── app/Http/Controllers/ChatController.php  # Handles chat logic and SSE streaming
├── routes/web.php                          # Defines web routes
├── resources/views/chat.blade.php          # Chat interface (Blade template)
├── public/
│   ├── css/app.css                        # Compiled Tailwind CSS
│   └── assets/images/                     # Screenshots and banner images
├── .env                                   # Environment configuration
├── README.md                              # Project documentation


📸 Screenshots

Chat UI: assets/images/screenshots/chat-ui.png
Banner: assets/images/banner.png (optional GitHub banner)

Place screenshots in the assets/images/screenshots/ directory for clarity.

🧩 Potential Enhancements

PDF Upload & Summarization: Allow users to upload PDFs and interact with their content.
Chat History: Store conversation history using Laravel sessions or a database.
Authentication: Implement user authentication for personalized chat experiences.
Prompt Modes: Add role-based prompts (e.g., "Assistant", "Coder", "Therapist").
REST API: Expose chatbot functionality via a RESTful API for integration with other applications.


🧑‍💻 Built By
Developed with ❤️ by Ejajul Ansari

GitHub: github.com/ejajul707
LinkedIn: linkedin.com/in/ejajul-ansari


💬 Support
For issues, feature requests, or questions:

Create an issue on the GitHub repository.
Reach out via direct message on LinkedIn.


📜 License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as needed.

🟢 Next Steps

Save this content as README.md in the LaravelGPT project folder.
Commit and push to your repository:

git add README.md
git commit -m "Add comprehensive README with setup instructions and features"
git push


Build something extraordinary with LaravelGPT! ✨
