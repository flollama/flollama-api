# Flollama API

Public AI inference API providing streaming conversational responses and utility access through a unified endpoint.

---

## Overview

Flollama API is a lightweight HTTP service designed to integrate AI capabilities into applications with minimal complexity.

It exposes a single endpoint that supports both:

* Conversational AI (POST requests)
* Utility responses (GET requests)

---

## Endpoint

### /chat

#### GET /chat

Returns a programming joke in plain text.

**Example**

```bash
curl https://flollama.in/api/chat
```

**Response**

* Content-Type: `text/plain`
* Status: `200 OK`

---

#### POST /chat

Generates AI responses based on a sequence of messages.

**Request Body**

```json
{
  "messages": [
    { "role": "user", "content": "Explain recursion simply" }
  ]
}
```

**Response**

* Content-Type: `text/plain`
* Streaming (chunked response)

---

## Features

* Single endpoint API design
* Streaming AI responses
* Simple HTTP interface
* Fast and lightweight integration
* Works across web, mobile, and backend environments

---

## Usage Notes

* Intended for development and non-commercial use
* Responses are generated dynamically and may vary
* Proper handling of streaming responses is required

---

## License

This project is licensed under the Unlicense.

See the [LICENSE](LICENSE) file for full terms.
