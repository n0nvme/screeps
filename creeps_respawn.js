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

        var spawn_level = 0;
        if (available_energy >= 300 && available_energy < 550) {
            spawn_level = 1
        } else if (available_energy >= 550 && available_energy < 800) {
            spawn_level = 2;
        } else if (available_energy >= 800) {
            spawn_level = 3;
        }

        if (harvesters1.length < 3 && spawn_level == 1) {
            var newName = 'Harvester' + current_time;
            console.log('Spawning new harvester: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'harvester', target: 1, level: spawn_level } });
            return
        } else if (harvesters1.length < 3 && spawn_level == 2) {
            var newName = 'HarvesterBIG' + current_time;
            console.log('Spawning new big harvester: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'harvester', target: 1, level: spawn_level } });
            return
        } else if (harvesters1.length < 3 && spawn_level == 3) {
            var newName = 'HarvesterBOSS' + current_time;
            console.log('Spawning new BOSS harvester: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester', target: 1, level: spawn_level } });
            return
        }

        if (harvesters0.length < 3 && spawn_level == 1) {
            var newName = 'Harvester' + current_time;
            console.log('Spawning new harvester: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'harvester', target: 0, level: spawn_level } });
            return
        } else if (harvesters0.length < 3 && spawn_level == 2) {
            var newName = 'HarvesterBIG' + current_time;
            console.log('Spawning new big harvester: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'harvester', target: 0, level: spawn_level } });
            return
        } else if (harvesters0.length < 3 && spawn_level == 3) {
            var newName = 'HarvesterBOSS' + current_time;
            console.log('Spawning new BOSS harvester: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester', target: 0, level: spawn_level } });
            return
        }

        if (upgraders.length < 2 && spawn_level == 1) {
            var newName = 'Upgrader' + current_time;
            console.log('Spawning new upgrader: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'upgrader', level: spawn_level } });
            return
        } else if (upgraders.length < 3 && spawn_level == 2) {
            var newName = 'UpgraderBIG' + current_time;
            console.log('Spawning new big upgrader: ' + newName)
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'upgrader', level: spawn_level } });
        } else if (upgraders.length < 3 && spawn_level == 3) {
            var newName = 'UpgraderBOSS' + current_time;
            console.log('Spawning new BOSS upgrader: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                { memory: { role: 'upgrader', level: spawn_level } });
        }


        if (repairers.length < 1 && spawn_level != 0) {
            var newName = 'Repairer' + current_time;
            console.log('Spawning new repairer: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'repairer' }, level: spawn_level });
            return
        }
        if (builders.length < 2 && spawn_level == 1) {
            var newName = 'Builder' + current_time;
            console.log('Spawning new builder: ' + newName);
            game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'builder' }, level: spawn_level });
            return
        } else if (builders.length < 2 && spawn_level == 2) {
            var newName = 'BuilderBIG' + current_time;
            console.log('Spawning new big builder: ' + newName)
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'builder' }, level: spawn_level });
        } else if (builders.length < 4 && spawn_level == 3) {
            var newName = 'BuilderBOSS' + current_time;
            console.log('Spawning new BOSS builder: ' + newName)
            game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                { memory: { role: 'builder' }, level: spawn_level });
        }
    }
}



module.exports = creeps_spawn;