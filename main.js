var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleCourier = require('role.courier');
var roleScout = require('role.scout');
var roleRemoteHarvester = require('role.remote_harvester');
var roleRemoteBuilder = require('role.remote_builder');
var roleAttacker = require('role.attacker');
var creeps_spawn = require('creeps_respawn');

module.exports.loop = function () {
    // console.log('cpu used:')

    creeps_spawn.run(Game);

    for (var name in Game.rooms) {
        //if (Game.rooms[name].energyAvailable == Game.rooms[name].energyCapacityAvailable){
        //Game.rooms[name].createConstructionSite(19, 39, STRUCTURE_EXTENSION);
        //}
        var towers = Game.rooms[name].find(
            FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });

        var hostiles = Game.rooms[name].find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${name}`);
            console.log(`User ${username} spotted in room ${name}`);

            towers.forEach(tower => tower.attack(hostiles[0]));
        } else {
            var my_creeps = Game.rooms[name].find(FIND_MY_CREEPS, {
                filter: (creep) => {
                    return (creep.hits < creep.hitsMax);
                }
            });
            if (my_creeps.length > 0) {
                towers.forEach(tower => tower.heal(my_creeps[0]));
            } else {
                var targets = Game.rooms[name].find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax && (object.structureType == STRUCTURE_ROAD || object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART) && object.hits < 75000
                });

                targets.sort((a, b) => a.hits - b.hits);
                awailable_towers = Game.rooms[name].find(FIND_STRUCTURES, {
                    filter: tower => (tower.structureType == STRUCTURE_TOWER && tower.store[RESOURCE_ENERGY] >= 300)
                })
                awailable_towers.forEach(tower => tower.repair(targets[0]));
            }
        }
        if (Game.time % 5 == 0) {
            console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy && ' + _.filter(Game.creeps, (creep) => creep.room == Game.rooms[name]).length + ' creeps total');
        }
        // Game.find();
    }
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
            continue;
        } else {
            var creep = Game.creeps[name];
            // creep.say(name);
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            } else if (creep.memory.role == 'remote_harvester') {
                roleRemoteHarvester.run(creep);
            } else if (creep.memory.role == 'remote_builder') {
                roleRemoteBuilder.run(creep);
            }
            else if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            else if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            else if (creep.memory.role == 'remote_attacker') {
                roleAttacker.run(creep)
            }
            else if (creep.memory.role == 'repairer') {
                roleRepairer.run(creep)
            }
            else if (creep.memory.role == 'scout') {
                roleScout.run(creep)
            }
            else if (creep.memory.role == 'courier') {
                roleCourier.run(creep)
            }
            // console.log(Game.cpu.getUsed())
        }
    }
    // console.log(Game.cpu.getUsed())

}