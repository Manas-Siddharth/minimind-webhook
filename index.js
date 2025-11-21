import express from "express";

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "mysecretkey";   // use the same token you typed in Meta

// Webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Receive messages
app.post("/webhook", (req, res) => {
  console.log("Incoming message:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running on port 3000"));
