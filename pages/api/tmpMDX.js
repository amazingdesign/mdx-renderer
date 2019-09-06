import db from '../../src/db'

export default (req, res) => {
  const { content } = req.body

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