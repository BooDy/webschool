const Sequelize = require('sequelize');
const sequelize = new Sequelize('starwarsdb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

const Character = sequelize.define('character', {
    name: Sequelize.STRING,
    height: Sequelize.INTEGER,
    hair_color: Sequelize.STRING,
    gender: Sequelize.STRING,
});

sequelize.sync()

Character.create({ name: 'Luke Skywalker', height: '180', hair_color: 'Brown', gender: 'male' })
.then(() => Character.findOrCreate({where: {name: 'Luke Skywalker'}}))
.spread((user, created) => {
    console.log(user.get({
        plain: true
    }))
    console.log(created)
})

process.exit()
