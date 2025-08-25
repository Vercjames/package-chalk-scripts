import express from "express"
import { scripts } from "chalk-scripts"

// Application Structure || Define imports
// =======================================================================================
// =======================================================================================
import { sleep } from "../../../utils"

// Application Structure || Define Variables
// =======================================================================================
// =======================================================================================
const PORT = 4000
const SLEEP_TIME = 100
const app = express()

// Application Structure || Define Routes
// =======================================================================================
// =======================================================================================
app.get("/", async (req, res) => {
  const script = scripts({ root: ".logs" })
  await script.log()
  res.send("Check your .logs folder!")
})

app.get("/test1", async (req, res) => {
  const script = new scripts({ root: ".logs" })
  await script.log("test1")
  await sleep(SLEEP_TIME)
  await script.error("test1")
  await sleep(SLEEP_TIME)
  await script.default("test1")
  await sleep(SLEEP_TIME)
  await script.mistake("test1")
  await sleep(SLEEP_TIME)
  await script.success("test1")
  res.send("test complete")
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
