var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    
    var harvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.target == 1);
    var harvesters0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.target == 0);
    // if(harvesters1.length < 2) {
    //     var newName = 'HarvesterBIG' + Game.time;
    //     console.log('Spawning new big harvester: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, 
    //         {memory: {role: 'harvester', target: 1}});
    // }
    if(harvesters1.length < 4) {
       var newName = 'Harvester' + Game.time;
       console.log('Spawning new harvester: ' + newName);
       Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, 
           {memory: {role: 'harvester', target: 1}});
    }
    // if(harvesters0.length < 2) {
    //     var newName = 'HarvesterBIG' + Game.time;
    //     console.log('Spawning new big harvester: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, 
    //         {memory: {role: 'harvester', target: 0}});
    // }
    if(harvesters0.length < 3) {
       var newName = 'Harvester' + Game.time;
       console.log('Spawning new harvester: ' + newName);
       Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, 
           {memory: {role: 'harvester', target: 0}});
    }
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    // if(builders.length < 2) {
    //     var newName = 'BuilderBIG' + Game.time;
    //     console.log('Spawning new big builder: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, 
    //         {memory: {role: 'builder'}});
    // }
    if(builders.length < 2) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, 
            {memory: {role: 'builder'}});
    }
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    // if(upgraders.length < 2) {
    //     var newName = 'UpgraderBIG' + Game.time;
    //     console.log('Spawning new big upgrader: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, 
    //         {memory: {role: 'upgrader'}});
    // }
    if(upgraders.length < 3) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }
    
    for(var name in Game.rooms) {
        //if (Game.rooms[name].energyAvailable == Game.rooms[name].energyCapacityAvailable){
        //Game.rooms[name].createConstructionSite(19, 39, STRUCTURE_EXTENSION);
        //}
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }
    
    for(var name in Game.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
        var creep = Game.creeps[name];
        //creep.say(name);
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}