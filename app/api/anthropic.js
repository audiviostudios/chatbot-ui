export default async function handler(req, res) {
  const { prompt } = req.body;

  // Llamada a la API de Anthropic con el modelo específico
  const response = await fetch("https://api.anthropic.com/v1/complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY",
    },
    body: JSON.stringify({
      prompt: `\nHuman: ${prompt}\nAssistant:`,
      max_tokens: 300, // Ajusta el número máximo de tokens según tus necesidades
      stop_sequences: ["\nHuman:"],
      model: "claude-3-5-sonnet-20241022", // Usa el nombre exacto del modelo
    }),
  });

  // Procesar la respuesta de la API
  const data = await response.json();
  res.status(200).json({ reply: data.completion });
}
