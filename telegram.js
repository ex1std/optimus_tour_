async function sendLead(name, phone, formName = "Форма сайта") {
  const response = await fetch(CONFIG.LEAD_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      form: formName,
      page: window.location.href
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.ok) {
    throw new Error(data.error || "Не удалось отправить заявку");
  }

  return data;
}
