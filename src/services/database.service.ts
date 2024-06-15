import mongoose from 'mongoose'

class DatabaseService {
  async connect() {
    try {
      await mongoose.connect('mongodb://localhost:27017/watch-management')
      console.log('Connected to database')
    } catch (error) {
      console.error('Error connecting to database', error)
    }
  }
}

const databaseService = new DatabaseService()

export default databaseService
