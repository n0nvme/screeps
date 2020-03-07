var creeps_spawn = {
    /** @param {Game} game **/
    run: function(game) {
        var harvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.target == 1);
        var harvesters0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.target == 0);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

        // if(harvesters1.length < 2) {
        //     var newName = 'HarvesterBIG' + Game.time;
        //     console.log('Spawning new big harvester: ' + newName);
        //     Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, 
        //         {memory: {role: 'harvester', target: 1}});
        // }
        if (harvesters1.length < 2 && game.rooms[0].energyAvailable < 550 && game.rooms[0].energyAvailable >= 300) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'harvester', target: 1 } });
        } else if (harvesters1.length < 2 && game.rooms[0].energyAvailable >= 550) {
            var newName = 'HarvesterBIG' + Game.time;
            console.log('Spawning new big harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'harvester', target: 1 } });
        }

        if (harvesters0.length < 2 && game.rooms[0].energyAvailable < 550) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'harvester', target: 0 } });
        } else if (harvesters0.length < 2 && game.rooms[0].energyAvailable >= 550) {
            var newName = 'HarvesterBIG' + Game.time;
            console.log('Spawning new big harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'harvester', target: 0 } });
        }


        // if (harvesters0.length < 2) {
        //     var newName = 'HarvesterBIG' + Game.time;
        //     console.log('Spawning new big harvester: ' + newName);
        //     Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'harvester', target: 0 } });
        // }
        // if (harvesters0.length < 3) {
        //     var newName = 'Harvester' + Game.time;
        //     console.log('Spawning new harvester: ' + newName);
        //     Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'harvester', target: 0 } });
        // }


        // if(builders.length < 2) {
        //     var newName = 'BuilderBIG' + Game.time;
        //     console.log('Spawning new big builder: ' + newName);
        //     Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, 
        //         {memory: {role: 'builder'}});
        // }
        if (builders.length < 2) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'builder' } });
        }

        // if(upgraders.length < 2) {
        //     var newName = 'UpgraderBIG' + Game.time;
        //     console.log('Spawning new big upgrader: ' + newName);
        //     Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, 
        //         {memory: {role: 'upgrader'}});
        // }
        if (upgraders.length < 3) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'upgrader' } });
        }

    }
};



module.exports = creeps_spawn;