import express from "express"
import { scripts } from "chalk-scripts"
import { sleep } from "../../../utils"

// Application Structure || Define Variables
// =======================================================================================
// =======================================================================================
const app = express()
const duration = 100
const port = process.env.PORT || 4000


// Application Structure || Define Routes
// =======================================================================================
// =======================================================================================
app.get("/", async (req, res) => {
  const script = scripts()

  script.default("init")
  script.warning("init")
  script.success("init")
  script.failure("init")
  script.insight("init")
  script.tracker("init")
  await sleep(duration)
  script.log("2")
  await sleep(duration)
  script.log("3")
  await sleep(duration)
  const apple = script.log("4")
  console.log(apple)

  script.insight("Hello World! This is the simplest Express app.")
  // logger.info("GET request received on /")
  res.json({
    message: "Hello World! This is the simplest Express app.",
    timestamp: new Date().toISOString()
  })
})

app.get("/health", (req, res) => {
  // logger.success("Health check requested")
  res.json({ status: "healthy" })
})

app.post("/test", (req, res) => {
  // logger.debug("POST request received on /test")
  // logger.warn("This is a test warning")
  res.json({ message: "Test endpoint", body: req.body })
})

app.use("*", (req, res) => {
  // logger.error(`Route not found: ${req.method} ${req.originalUrl}`)
  res.status(404).json({ error: "Route not found" })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
  console.log(`Visit http://localhost:${port} to see the app`)
})
