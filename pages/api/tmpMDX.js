import db from '../../src/db'

import { getConfig } from '@bit/amazingdesign.utils.config'

const tmpConfigDelete = getConfig('TMP_CONTENT_DELETE') === 'false' ? false : true
const tmpConfigDeleteTime = getConfig('TMP_CONTENT_DELETE_TIME') || 5 * 60 * 1000

export default (req, res) => {
  const { method } = req
  const { content } = req.body

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

      if (tmpConfigDelete) {
        setTimeout(
          () => db.remove({ _id: newDoc._id }),
          tmpConfigDeleteTime
        )
      }

      res.json(newDoc)
    }
  )
}