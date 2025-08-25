import express from "express"
import { logger } from "chalk-scripts"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get("/", (req, res) => {
  logger.info("GET request received on /")
  res.json({
    message: "Hello World! This is the simplest Express app.",
    timestamp: new Date().toISOString()
  })
})

app.get("/health", (req, res) => {
  logger.success("Health check requested")
  res.json({ status: "healthy" })
})

app.post("/test", (req, res) => {
  logger.debug("POST request received on /test")
  logger.warn("This is a test warning")
  res.json({ message: "Test endpoint", body: req.body })
})

app.use("*", (req, res) => {
  logger.error(`Route not found: ${req.method} ${req.originalUrl}`)
  res.status(404).json({ error: "Route not found" })
})

app.listen(port, () => {
  logger.success(`Server running on port ${port}`)
  logger.info(`Visit http://localhost:${port} to see the app`)
})
