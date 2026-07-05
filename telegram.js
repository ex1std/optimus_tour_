async function sendLead(name, phone, meta = {}) {
  if (!window.CONFIG) {
    throw new Error('Не найден config.js');
  }

  const token = String(CONFIG.BOT_TOKEN || '').trim();
  const chatId = String(CONFIG.CHAT_ID || '').trim();

  if (!token || token.includes('PASTE_') || !chatId || chatId.includes('PASTE_')) {
    throw new Error('Заполните BOT_TOKEN и CHAT_ID в config.js');
  }

  const page = meta.page ? `
🌐 Страница: ${meta.page}` : '';
  const text = `📩 Новая заявка с сайта Optimus Tour

👤 Имя: ${name}
📞 Телефон: ${phone}${page}`;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const data = new URLSearchParams();
  data.append('chat_id', chatId);
  data.append('text', text);
  data.append('disable_web_page_preview', 'true');

  const response = await fetch(url, {
    method: 'POST',
    body: data
  });

  let result = null;
  try {
    result = await response.json();
  } catch (e) {}

  if (!response.ok || !result || !result.ok) {
    throw new Error(result?.description || `Telegram API error ${response.status}`);
  }

  return result;
}
