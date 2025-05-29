export async function sendRequest<TRequest, TResponse>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: TRequest
): Promise<TResponse> {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });
  
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  if (response.status === 204) {
    return undefined as TResponse; // Handle no content response
  }
  return response.json();
}