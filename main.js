var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var creeps_spawn = require('creeps_respawn.js');

module.exports.loop = function() {

    creeps_spawn.run(Game);

    for (var name in Game.rooms) {
        //if (Game.rooms[name].energyAvailable == Game.rooms[name].energyCapacityAvailable){
        //Game.rooms[name].createConstructionSite(19, 39, STRUCTURE_EXTENSION);
        //}
        console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
    }

    for (var name in Game.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
        var creep = Game.creeps[name];
        //creep.say(name);
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}