const UserModel = require('./user');
const FighterModel = require('./fighter');
const TeamModel = require('./team');


UserModel.hasMany(TeamModel);
TeamModel.belongsTo(UserModel);
UserModel.hasMany(FighterModel);
FighterModel.belongsTo(UserModel);
FighterModel.belongsToMany(TeamModel, {through: 'FighterTeam'});
TeamModel.belongsToMany(FighterModel, {through: 'FighterTeam'});


module.exports={
    UserModel, FighterModel, TeamModel
}