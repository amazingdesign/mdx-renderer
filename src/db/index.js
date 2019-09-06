import DataStore from 'nedb'

const db = new DataStore({
  inMemoryOnly: true
})

export default db