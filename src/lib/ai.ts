export async function getAIResponse(message: string): Promise<string> {
  const res = await fetch("https://local.in/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // add auth headers if required
      // "Authorization": "Bearer YOUR_TOKEN",
    },
    body: JSON.stringify({
      message,
    }),
  })

  if (!res.ok) {
    throw new Error(`AI API failed: ${res.status}`)
  }

  const data = await res.json()

  // 🔑 adjust this based on API response shape
  const aiMessage = data.message || data.response || data.output

  if (!aiMessage || typeof aiMessage !== "string") {
    throw new Error("Invalid AI response")
  }

  return aiMessage
}
