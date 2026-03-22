import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer, WebSocket } from "ws";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Translation Endpoint
  app.post("/api/translate", async (req, res) => {
    const { text, targetLang } = req.body;
    if (!text || !targetLang) return res.status(400).json({ error: "Missing text or targetLang" });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Translate the following text to ${targetLang}. Only return the translated text: "${text}"`,
      });
      res.json({ translation: response.text });
    } catch (error) {
      console.error("Translation error:", error);
      res.status(500).json({ error: "Translation failed" });
    }
  });

  // Automation Stats
  app.get("/api/stats", (req, res) => {
    res.json({
      revenue: 12340,
      orders: 320,
      products: 1200,
      automation_rate: 92
    });
  });

  // Trend Analysis
  app.get("/api/trends", (req, res) => {
    const trends = [
      { keyword: "Wireless Earbuds", growth: 85, demand: 12000, score: 78 },
      { keyword: "Smart Watch", growth: 45, demand: 8500, score: 62 },
      { keyword: "Yoga Mat", growth: 120, demand: 5000, score: 88 },
      { keyword: "Portable Blender", growth: 95, demand: 7200, score: 82 },
    ];
    res.json(trends);
  });

  // Growth Engine Execution
  app.post("/api/automation/run", async (req, res) => {
    const { task } = req.body;
    console.log(`Running automation task: ${task}...`);
    
    // Simulate long-running process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    res.json({ 
      success: true, 
      message: `Task '${task}' completed successfully`,
      results: {
        products_sourced: 12,
        listings_created: 8,
        campaigns_optimized: 5
      }
    });
  });

  // AI Business Engine - Branding
  app.post("/api/ai/branding", (req, res) => {
    const { productName } = req.body;
    // Simulate GPT-4o-mini response
    const branding = {
      brandName: `Lux${productName.split(' ')[0]}`,
      concept: "Minimalist eco-friendly packaging with matte finish and gold foil accents.",
      tagline: "Elevate your everyday essentials."
    };
    res.json(branding);
  });

  // AI Business Engine - Review Analysis
  app.post("/api/ai/analyze-reviews", (req, res) => {
    const { productId } = req.body;
    res.json({
      sentiment: "Positive (82%)",
      pros: ["High build quality", "Fast shipping", "Sleek design"],
      cons: ["Instruction manual unclear", "Packaging could be better"],
      recommendation: "Improve the unboxing experience and provide a digital QR code for the manual."
    });
  });

  // AI Business Engine - Revenue Simulation
  app.post("/api/ai/simulate", (req, res) => {
    const { price, cost, traffic, conversionRate } = req.body;
    const sales = Math.floor(traffic * (conversionRate / 100));
    const revenue = sales * price;
    const profit = sales * (price - cost);
    res.json({ sales, revenue, profit });
  });

  // AI Business Engine - Video Generation
  app.post("/api/ai/generate-video", (req, res) => {
    const { productId } = req.body;
    res.json({
      status: "success",
      videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      thumbnail: "https://picsum.photos/seed/video/400/700",
      duration: "15s",
      platform: "TikTok/Reels"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // WebSocket Server
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket");

    ws.on("message", async (data) => {
      const message = JSON.parse(data.toString());
      console.log("Received message:", message);

      // Broadcast user message to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });

      // Generate AI response if it's a user message
      if (message.sender === 'user') {
        try {
          const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `You are a helpful AI assistant for a global e-commerce platform. The user says: "${message.text}". Provide a concise and professional response.`,
          });

          const aiMsg = {
            id: Date.now() + 1,
            text: response.text,
            sender: 'ai'
          };

          // Broadcast AI response to all clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(aiMsg));
            }
          });
        } catch (error) {
          console.error("AI response error:", error);
        }
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected from WebSocket");
    });
  });
}

startServer();
