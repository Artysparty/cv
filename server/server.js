const express = require('express');
const cors = require('cors');
require('dotenv').config();
const TelegramBot = require("node-telegram-bot-api");

// Инициализируем Express приложение
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Инициализируем бота
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

app.post("/send-email", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const telegramMessage = `📨 Новое сообщение с сайта
        
👤 Имя: ${name}
📧 Email: ${email}
📝 Тема: ${subject}
💬 Сообщение: ${message}`;

    await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, telegramMessage);

    res.json({ success: true });
  } catch (error) {
    console.error("Ошибка:", error);
    res
      .status(500)
      .json({ success: false, message: "Ошибка отправки сообщения" });
  }
});

// Запускаем сервер
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
