
# Chalk Scripts

A powerful, flexible logging library with colorized output and JSON value extraction capabilities.

## Installation

```bash
npm install chalk-scripts
# or
yarn add chalk-scripts
```

## Quick Start

```typescript
import { scripts } from "chalk-scripts"

const script = scripts({ id: "1234567890", name: "example" })

// Basic logging
await script.log("Hello World!")
await script.success("Operation completed")
await script.error("Something went wrong")

// Get structured data back
const result = await script.tracker("Processing user data")
console.log(result.timeElapsed) // "0001.2340"
console.log(result.logText)     // "Processing user data"
```

## Features

- 🎨 **Colorized Console Output** - Different colors for different log types
- ⏱️ **Built-in Timing** - Automatic elapsed time tracking
- 📊 **Structured Data** - Get timing and metadata back from log calls
- 🔧 **Configurable** - Customize log sequences, styles, and behavior
- 📝 **JSON Support** - Log objects and get JSON output
- 🎯 **TypeScript** - Full TypeScript support with type definitions

## API Reference

### Constructor

```typescript
const script = new Script({
  id: "my-script",              // Unique identifier
  name: "MyApp",                // Display name
  logStyle: ELogStyle.STRING,   // Output format (STRING | VALUES)
  logSequence: ["id", "timeElapsed", "name"], // Display order
})
```

### Log Methods

All log methods are async and return a `TScriptOutputs` object with timing and metadata.

```typescript
// Basic logging methods
await script.log("message")       // Default/info logging
await script.success("message")   // Success (green)
await script.warning("message")   // Warning (yellow) 
await script.error("message")     // Error (red)
await script.insight("message")   // Insight (blue)
await script.tracker("message")   // Tracker (magenta)

// Special methods  
await script.values("message")    // Always outputs JSON
const data = await script.extract("message") // Get data without logging
```

### Configuration

```typescript
// Update configuration on the fly
script.set({
  logStyle: ELogStyle.VALUES,  // Switch to JSON output
  name: "NewName",
  logSequence: ["timeElapsed", "name", "type"]
})
```

### Log Styles

```typescript
import { ELogStyle } from 'chalk-scripts'

// String output (default) - colorized console messages
script.set({ logStyle: ELogStyle.STRING })

// Values output - structured JSON data
script.set({ logStyle: ELogStyle.VALUES })
```

### Log Sequence

Customize what information appears in your logs and in what order:

```typescript
script.set({
  logSequence: [
    "id",           // Script ID
    "timeElapsed",  // Time since script start
    "trace",        // Random trace ID
    "name",         // Script name
    "type"          // Log type (SUCCESS, ERROR, etc.)
  ]
})
```

## License

MIT

