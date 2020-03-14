var creeps_spawn = {
    /** @param {Game} game **/
    run: function (game) {
        if (!game.spawns['Spawn1'].spawning) {
            var nearest_creeps = Game.spawns['Spawn1'].pos.findInRange(FIND_MY_CREEPS, 1)
            if (nearest_creeps.length != 0 && Game.spawns['Spawn1'].renewCreep(nearest_creeps[0])) {
                console.log('renewing ' + nearest_creeps[0].name);
                return;
            }
            var main_room = 'E24N9'
            var available_energy = game.rooms[main_room].energyAvailable;
            var current_time = game.time;

            var rooms_to_harvest = ['E24N8', 'E25N9', 'E25N8', 'E23N8']
            var remote_harvesters = {}
            rooms_to_harvest.forEach(room_to_harvest => {
                remote_harvesters[room_to_harvest] = _.filter(game.creeps, (creep) => creep.memory.role == 'remote_harvester' && creep.memory.target_room == room_to_harvest && creep.memory.main_room == main_room).length;
            });
            // console.log(JSON.stringify(remote_harvesters))

            var harvesters1 = _.filter(game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.target == 1 && creep.memory.main_room == main_room);
            var harvesters0 = _.filter(game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.target == 0 && creep.memory.main_room == main_room);
            // var remote_harvesters = _.filter(game.creeps, (creep) => creep.memory.role == 'remote_harvester' && creep.memory.target_room == 'E24N8' && creep.memory.main_room == main_room);
            var builders = _.filter(game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.main_room == main_room);
            var upgraders = _.filter(game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.main_room == main_room);
            var repairers = _.filter(game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.main_room == main_room);
            // var scouts = _.filter(game.creeps, (creep) => creep.memory.role == 'scout' && creep.memory.main_room == main_room);
            var couriers = _.filter(game.creeps, (creep) => creep.memory.role == 'courier' && creep.memory.main_room == main_room);

            var spawn_level = 0;
            if (available_energy >= 300 && available_energy < 550) {
                spawn_level = 1
            } else if (available_energy >= 550 && available_energy < 800) {
                spawn_level = 2;
            } else if (available_energy >= 800 && available_energy <= 1300) {
                spawn_level = 3;
            }
            else if (available_energy >= 1300) {
                spawn_level = 4;
            }
            // console.log(spawn_level)

            if (harvesters0.length < 3 && spawn_level == 1) {
                var newName = 'Harvester' + current_time;
                console.log('Spawning new harvester: ' + newName);
                game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'harvester', target: 0, level: spawn_level, main_room: main_room } });
                return
            } else if (harvesters0.length < 3 && spawn_level == 2) {
                var newName = 'HarvesterBIG' + current_time;
                console.log('Spawning new big harvester: ' + newName);
                game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'harvester', target: 0, level: spawn_level, main_room: main_room } });
                return
            } else if (harvesters0.length < 3 && spawn_level >= 3) {
                var newName = 'HarvesterBOSS' + current_time;
                console.log('Spawning new BOSS harvester: ' + newName);
                game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester', target: 0, level: spawn_level, main_room: main_room } });
                return
            }

            if (harvesters1.length < 3 && spawn_level == 1) {
                var newName = 'Harvester' + current_time;
                console.log('Spawning new harvester: ' + newName);
                game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'harvester', target: 1, level: spawn_level, main_room: main_room } });
                return
            } else if (harvesters1.length < 3 && spawn_level == 2) {
                var newName = 'HarvesterBIG' + current_time;
                console.log('Spawning new big harvester: ' + newName);
                game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'harvester', target: 1, level: spawn_level, main_room: main_room } });
                return
            } else if (harvesters1.length < 3 && spawn_level >= 3) {
                var newName = 'HarvesterBOSS' + current_time;
                console.log('Spawning new BOSS harvester: ' + newName);
                game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester', target: 1, level: spawn_level, main_room: main_room } });
                return
            }

            if (repairers.length < 2 && spawn_level != 0) {
                var newName = 'Repairer' + current_time;
                console.log('Spawning new repairer: ' + newName);
                game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'repairer', level: spawn_level, main_room: main_room } });
                return
            }

            for (var room_name in remote_harvesters) {
                if (remote_harvesters[room_name] < 1 && spawn_level == 1) {
                    var newName = 'remoteHarvester' + current_time;
                    console.log('Spawning new remote harvester: ' + newName);
                    game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'remote_harvester', target_room: room_name, level: spawn_level, main_room: main_room } });
                    return
                } else if (remote_harvesters[room_name] < 2 && spawn_level == 2) {
                    var newName = 'RemoteHarvesterBIG' + current_time;
                    console.log('Spawning new big remote harvester: ' + newName);
                    game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'remote_harvester', target_room: room_name, level: spawn_level, main_room: main_room } });
                    return
                } else if (remote_harvesters[room_name] < 3 && spawn_level == 3) {
                    var newName = 'RemoteHarvesterBOSS' + current_time;
                    console.log('Spawning new BOSS remote harvester: ' + newName);
                    game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'remote_harvester', target_room: room_name, level: spawn_level, main_room: main_room } });
                    return
                } else if (remote_harvesters[room_name] < 3 && spawn_level >= 4) {
                    var newName = 'RemoteHarvesterULTRA' + current_time;
                    console.log('Spawning new ULTRA remote harvester: ' + newName);
                    game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'remote_harvester', target_room: room_name, level: spawn_level, main_room: main_room } });
                    return
                }
            }

            if (upgraders.length < 2 && spawn_level == 1) {
                var newName = 'Upgrader' + current_time;
                console.log('Spawning new upgrader: ' + newName);
                game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'upgrader', level: spawn_level, main_room: main_room } });
                return
            } else if (upgraders.length < 2 && spawn_level == 2) {
                var newName = 'UpgraderBIG' + current_time;
                console.log('Spawning new big upgrader: ' + newName)
                game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'upgrader', level: spawn_level, main_room: main_room } });
            } else if (upgraders.length < 2 && spawn_level == 3) {
                var newName = 'UpgraderBOSS' + current_time;
                console.log('Spawning new BOSS upgrader: ' + newName);
                game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                    { memory: { role: 'upgrader', level: spawn_level, main_room: main_room } });
            } else if (upgraders.length < 2 && spawn_level >= 4) {
                var newName = 'UpgraderULTRA' + current_time;
                console.log('Spawning new ULTRA upgrader: ' + newName);
                game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                    { memory: { role: 'upgrader', level: spawn_level, main_room: main_room } });
            }

            if (builders.length < 2 && spawn_level == 1) {
                var newName = 'Builder' + current_time;
                console.log('Spawning new builder: ' + newName);
                game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'builder', level: spawn_level, main_room: main_room } });
                return
            } else if (builders.length < 2 && spawn_level == 2) {
                var newName = 'BuilderBIG' + current_time;
                console.log('Spawning new big builder: ' + newName)
                game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'builder', level: spawn_level, main_room: main_room } });
            } else if (builders.length < 2 && spawn_level == 3) {
                var newName = 'BuilderBOSS' + current_time;
                console.log('Spawning new BOSS builder: ' + newName)
                game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                    { memory: { role: 'builder', level: spawn_level, main_room: main_room } });
            } else if (builders.length < 2 && spawn_level >= 4) {
                var newName = 'BuilderULTRA' + current_time;
                console.log('Spawning new ULTRA builder: ' + newName)
                game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
                    { memory: { role: 'builder', level: spawn_level, main_room: main_room } });
            }



            // if (scouts.length < 1 && spawn_level != 0) {
            //     var newName = 'Scout' + current_time;
            //     console.log('Spawning new scout: ' + newName);
            //     game.spawns['Spawn1'].spawnCreep([CARRY, MOVE, MOVE, MOVE, MOVE, CLAIM], newName, { memory: { role: 'scout' }, level: spawn_level, main_room: main_room });
            //     return
            // }
            if (couriers.length < 1 && spawn_level != 0 && spawn_level < 4) {
                var newName = 'Courier' + current_time;
                console.log('Spawning new courier: ' + newName);
                game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'courier', level: spawn_level, main_room: main_room } });
                return
            } else if (couriers.length < 4 && spawn_level >= 3) {
                var newName = 'CourierBIG' + current_time;
                console.log('Spawning new BIG courier: ' + newName);
                game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'courier', level: spawn_level, main_room: main_room } });
                return
            }

        }
    }

}

module.exports = creeps_spawn;