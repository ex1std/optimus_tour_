async function sendLead(name, phone, formName = "Форма сайта") {
  if (typeof CONFIG === "undefined" || !CONFIG.LEAD_ENDPOINT) {
    throw new Error("CONFIG.LEAD_ENDPOINT is missing");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(CONFIG.LEAD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      signal: controller.signal,
      body: JSON.stringify({
        name: String(name || "").trim(),
        phone: String(phone || "").trim(),
        form: String(formName || "Форма сайта"),
        page: window.location.href
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.ok) {
      console.error("Lead endpoint error:", data);
      throw new Error(data.error || "Не удалось отправить заявку");
    }

    return data;

  } catch (error) {
    console.error("Lead send failed:", error);
    throw error;

  } finally {
    clearTimeout(timeoutId);
  }
}
