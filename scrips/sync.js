import sequelize from "../model/index.js"

try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
} catch (error) {
    console.log(`Erro al sincronizar ❌ ${error}`)
}

/*
User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
User.sync({ force: true }) - This creates the table, dropping it first if it already existed
User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
 */