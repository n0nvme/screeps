var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleCourier = require('role.courier');
var roleScout = require('role.scout');
var creeps_spawn = require('creeps_respawn');

module.exports.loop = function () {

    creeps_spawn.run(Game);

    for (var name in Game.rooms) {
        //if (Game.rooms[name].energyAvailable == Game.rooms[name].energyCapacityAvailable){
        //Game.rooms[name].createConstructionSite(19, 39, STRUCTURE_EXTENSION);
        //}
        if (Game.time % 5 == 0) {
            console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy && ' + _.filter(Game.creeps, (creep) => creep.room == Game.rooms[name]).length + ' creeps total');
        }
        // Game.find();
    }

    for (var name in Game.creeps) {
        if (!Game.creeps[name]) {
            console.log('kek')
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
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep)
        }
        if (creep.memory.role == 'scout') {
            roleScout.run(creep)
        }
        if (creep.memory.role == 'courier') {
            roleCourier.run(creep)
        }
    }
}