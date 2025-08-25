import express from "express"
import { script } from "chalk-scripts"
import { sleep } from "chalk-scripts/ulits/ulits"

const PORT = 4000
const app = express()

app.get("/old", async (req, res) => {
  const c = await script.start({ func: "app.get(/test1)" })
  script.config(c).default("ref1").log()
  await sleep(500)
  script.config(c).default("ref1").log()
  await sleep(501)
  script.config(c).warning("ref1").log()
  await sleep(502)
  script.config(c).default("ref1").log()
  res.send("test complete")
})

app.get("/new", async (req, res) => {
  const script = new Script(config)
  await script.log("")
  await script.error("")
  await script.default("")
  await script.mistake("")
  await script.success("")
  res.send("test complete")
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
