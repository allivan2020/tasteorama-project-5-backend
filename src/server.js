import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.json({
    message: 'Server is running',
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
