import express from "express"
import { scripts } from "chalk-scripts"
import { sleep } from "../../../utils"

// Application Structure || Define Variables
// =======================================================================================
// =======================================================================================
const app = express()
const duration = 500
const port = process.env.PORT || 4000


// Application Structure || Define Routes
// =======================================================================================
// =======================================================================================
app.get("/", async (req, res) => {
  const script = scripts({ id: "1234567890", name: "route(/)" })

  await script.default("default")
  await script.warning("warning")
  await script.success("success")
  await script.failure("failure")
  await script.insight("insight")
  await script.tracker("tracker")
  await sleep(duration)
  await script.default("Offset Check 1")
  await sleep(duration)
  await script.default("Offset Check 2")
  await sleep(duration)
  await script.default("Offset Check 3")

  res.json({
    message: "Hello World! This is the simplest Express app.",
    timestamp: new Date().toISOString()
  })
})


app.get("/values", async (req, res) => {
  const script = scripts({ id: "1234567890", name: "route(/values)" })
  await script.values("example text string", { rawr: "rawr" })
  res.json({ message: "Test endpoint", body: req.body })
})

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
  console.log(`Visit http://localhost:${port} to see the app`)
})
