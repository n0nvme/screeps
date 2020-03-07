var creeps_spawn = {
    /** @param {Game} game **/
    run: function (game) {
        var harvesters1 = _.filter(game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.target == 1);
        var harvesters0 = _.filter(game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.target == 0);
        var builders = _.filter(game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(game.creeps, (creep) => creep.memory.role == 'upgrader');
        var repairers = _.filter(game.creeps, (creep) => creep.memory.role == 'repairer');


        var available_energy = game.rooms['W12S3'].energyAvailable;
        var current_time = game.time;

        if (harvesters1.length < 3 && available_energy < 550 && available_energy >= 300) {
            var newName = 'Harvester' + current_time;
            console.log('Spawning new harvester: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'harvester', target: 1 } });
            return
        } else if (harvesters1.length < 3 && available_energy >= 550) {
            var newName = 'HarvesterBIG' + current_time;
            console.log('Spawning new big harvester: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'harvester', target: 1 } });
            return
        }

        if (harvesters0.length < 3 && available_energy < 550 && available_energy >= 300) {
            var newName = 'Harvester' + current_time;
            console.log('Spawning new harvester: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'harvester', target: 0 } });
            return
        } else if (harvesters0.length < 3 && available_energy >= 550) {
            var newName = 'HarvesterBIG' + current_time;
            console.log('Spawning new big harvester: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'harvester', target: 0 } });
            return
        }
        if (upgraders.length < 2 && available_energy < 550 && available_energy >= 300) {
            var newName = 'Upgrader' + current_time;
            console.log('Spawning new upgrader: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'upgrader' } });
            return
        } else if (upgraders.length < 2 && available_energy >= 550) {
            var newName = 'UpgraderBIG' + current_time;
            console.log('Spawning new big upgrader: ' + newName)
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'upgrader' } });
        }
        if (repairers.length < 2 && available_energy >= 300) {
            var newName = 'Repairer' + current_time;
            console.log('Spawning new repairer: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'repairer' } });
            return
        }
        if (builders.length < 2 && available_energy < 550 && available_energy >= 300) {
            var newName = 'Builder' + current_time;
            console.log('Spawning new builder: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'builder' } });
            return
        } else if (builders.length < 2 && available_energy >= 550) {
            var newName = 'BuilderBIG' + current_time;
            console.log('Spawning new big builder: ' + newName)
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'builder' } });
        }
    }

    // if(upgraders.length < 2) {
    //     var newName = 'UpgraderBIG' + current_time;
    //     console.log('Spawning new big upgrader: ' + newName);
    //     game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, 
    //         {memory: {role: 'upgrader'}});
    // }


}



module.exports = creeps_spawn;