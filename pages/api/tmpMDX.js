import db from '../../src/db'

export default (req, res) => {
  const { method, content } = req.body

  if (method !== 'POST') {
    res.status(500).json({
      error: 'Method Not Allowed',
      code: 405,
    })

    return
  }

  db.insert(
    { content },
    (err, newDoc) => {
      if (err) res.status(500).send(err)

      setTimeout(
        () => db.remove({ _id: newDoc._id }),
        5 * 60 * 1000
      )

      res.json(newDoc)
    }
  )
}