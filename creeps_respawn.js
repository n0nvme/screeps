var get_spawn_level = require('spawn_utils');
var spawn_settings = require('spawn_settings');
var creeps_spawn = {
    /** @param {Game} game **/
    run: function (game) {
        var main_room = 'W23S49'

        var rooms_to_harvest = ['W23S48']
        var rooms_to_build = []
        var rooms_to_attack = []


        for (spawn_name in Game.spawns) {
            room_name = Game.spawns[spawn_name].room.name;
            if (!Game.spawns[spawn_name].spawning) {
                var dying_creeps = Game.rooms[room_name].find(FIND_MY_CREEPS, { filter: creep => creep.memory.renewing });
                var nearest_creeps = Game.spawns[spawn_name].pos.findInRange(dying_creeps, 1);
                if (spawn_name !== 'Spawn2') {
                    if (nearest_creeps.length != 0 && Game.spawns[spawn_name].renewCreep(nearest_creeps[0])) {
                        console.log('renewing ' + nearest_creeps[0].name + ' on spawn ' + spawn_name);
                        return;
                    }
                }
                var available_energy = game.rooms[room_name].energyAvailable;
                var current_time = game.time;

                var remote_harvesters = {}
                rooms_to_harvest.forEach(room_to_harvest => {
                    remote_harvesters[room_to_harvest] = _.filter(game.creeps, (creep) => creep.memory.role == 'remote_harvester' && creep.memory.target_room == room_to_harvest && creep.memory.main_room == room_name).length;
                });
                var remote_builders = {}
                rooms_to_build.forEach(room_to_build => {
                    remote_builders[room_to_build] = _.filter(game.creeps, (creep) => creep.memory.role == 'remote_builder' && creep.memory.target_room == room_to_build && creep.memory.main_room == room_name).length;
                });
                var remote_attackers = {}
                rooms_to_attack.forEach(room_to_attack => {
                    remote_attackers[room_to_attack] = _.filter(game.creeps, (creep) => creep.memory.role == 'remote_attacker' && creep.memory.target_room == room_to_attack && creep.memory.main_room == room_name).length;
                });
                var remote_close_attackers = {}
                rooms_to_attack.forEach(room_to_attack => {
                    remote_attackers[room_to_attack] = _.filter(game.creeps, (creep) => creep.memory.role == 'remote_close_attacker' && creep.memory.target_room == room_to_attack && creep.memory.main_room == room_name).length;
                });

                var harvesters1 = _.filter(game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.target == 1 && creep.memory.main_room == room_name);
                var harvesters0 = _.filter(game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.target == 0 && creep.memory.main_room == room_name);
                var builders = _.filter(game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.main_room == room_name);
                var upgraders = _.filter(game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.main_room == room_name);
                var repairers = _.filter(game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.main_room == room_name);
                var scouts = _.filter(game.creeps, (creep) => creep.memory.role == 'scout' && creep.memory.main_room == room_name);
                var couriers = _.filter(game.creeps, (creep) => creep.memory.role == 'courier' && creep.memory.main_room == room_name);

                var spawn_level = get_spawn_level(available_energy);

                // console.log(spawn_level)
                if (spawn_level > 0) {
                    console.log('level: ' + spawn_level)

                    if (harvesters0.length < spawn_settings[spawn_level].counts.harvesters0) {
                        var newName = 'Harvester' + current_time;
                        console.log('not enough harvesters0')
                        game.spawns[spawn_name].spawnCreep(spawn_settings[spawn_level].types.harvester, newName, { memory: { role: 'harvester', target: 0, level: spawn_level, main_room: room_name } });
                        return
                    } else if (harvesters1.length < spawn_settings[spawn_level].counts.harvesters1) {
                        var newName = 'Harvester' + current_time;
                        console.log('not enough harvesters1')
                        game.spawns[spawn_name].spawnCreep(spawn_settings[spawn_level].types.harvester, newName, { memory: { role: 'harvester', target: 1, level: spawn_level, main_room: room_name } });
                        return
                    } else if (repairers.length < spawn_settings[spawn_level].counts.repairers) {
                        var newName = 'Repairer' + current_time;
                        console.log('not enough repairers')
                        game.spawns[spawn_name].spawnCreep(spawn_settings[spawn_level].types.repairer, newName, { memory: { role: 'repairer', level: spawn_level, main_room: room_name } });
                        return
                    } else if (upgraders.length < spawn_settings[spawn_level].counts.upgraders) {
                        var newName = 'Upgrader' + current_time;
                        console.log('Spawning new upgrader: ' + newName + ' on spawn ' + spawn_name)
                        game.spawns[spawn_name].spawnCreep(spawn_settings[spawn_level].types.upgrader, newName, { memory: { role: 'upgrader', level: spawn_level, main_room: room_name } });
                        return
                    } else if (builders.length < spawn_settings[spawn_level].counts.builders) {
                        var newName = 'Builder' + current_time;
                        console.log('Spawning new builder: ' + newName + ' on spawn ' + spawn_name);
                        game.spawns[spawn_name].spawnCreep(spawn_settings[spawn_level].types.builder, newName, { memory: { role: 'builder', level: spawn_level, main_room: room_name } });
                        return
                    } else if (couriers.length < spawn_settings[spawn_level].counts.couriers) {
                        var newName = 'Courier' + current_time;
                        console.log('Spawning new builder: ' + newName + ' on spawn ' + spawn_name);
                        game.spawns[spawn_name].spawnCreep(spawn_settings[spawn_level].types.courier, newName, { memory: { role: 'builder', level: spawn_level, main_room: room_name } });
                        return
                    } else {
                        for (var target_room_name in remote_harvesters) {
                            if (remote_harvesters[target_room_name] < spawn_settings[spawn_level].counts.remote_harvesters) {
                                var newName = 'remoteHarvester' + current_time;
                                console.log('Spawning new remote harvester: ' + newName + ' on spawn ' + spawn_name);
                                game.spawns[spawn_name].spawnCreep(spawn_settings[spawn_level].types.remote_harvester, newName, { memory: { role: 'remote_harvester', target_room: target_room_name, level: spawn_level, main_room: room_name } });
                                return
                            }
                        }
                    }
                }

                if (room_name == main_room) {

                    for (var target_room_name in remote_attackers) {
                        if (remote_attackers[target_room_name] < 1 && spawn_level == 1) {
                            var newName = 'remoteAttacker' + current_time;
                            console.log('Spawning new remote attacker: ' + newName + ' on spawn ' + spawn_name);
                            game.spawns[spawn_name].spawnCreep([RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, MOVE], newName, { memory: { role: 'remote_attacker', target_room: target_room_name, level: spawn_level, main_room: room_name } });
                            return
                        } else if (remote_attackers[target_room_name] < 2 && spawn_level == 2) {
                            var newName = 'RemoteAttackerBIG' + current_time;
                            console.log('Spawning new big remote attacker: ' + newName + ' on spawn ' + spawn_name);
                            game.spawns[spawn_name].spawnCreep([RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'remote_attacker', target_room: target_room_name, level: spawn_level, main_room: room_name } });
                            return
                        } else if (remote_attackers[target_room_name] < 3 && spawn_level == 3) {
                            var newName = 'RemoteAttackerBOSS' + current_time;
                            console.log('Spawning new BOSS remote attacker: ' + newName + ' on spawn ' + spawn_name);
                            game.spawns[spawn_name].spawnCreep([RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'remote_attacker', target_room: target_room_name, level: spawn_level, main_room: room_name } });
                            return
                        } else if (remote_attackers[target_room_name] < 3 && spawn_level >= 4) {
                            var newName = 'RemoteAttackerULTRA' + current_time;
                            console.log('Spawning new ULTRA remote attacker: ' + newName + ' on spawn ' + spawn_name);
                            game.spawns[spawn_name].spawnCreep([RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'remote_attacker', target_room: target_room_name, level: spawn_level, main_room: room_name } });
                            return
                        }
                    }
                    for (var target_room_name in remote_close_attackers) {
                        if (remote_attackers[target_room_name] < 1 && spawn_level == 1) {
                            var newName = 'remoteAttacker' + current_time;
                            console.log('Spawning new remote attacker: ' + newName + ' on spawn ' + spawn_name);
                            game.spawns[spawn_name].spawnCreep([ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, MOVE], newName, { memory: { role: 'remote_close_attacker', target_room: target_room_name, level: spawn_level, main_room: room_name } });
                            return
                        } else if (remote_close_attackers[target_room_name] < 2 && spawn_level == 2) {
                            var newName = 'RemoteAttackerBIG' + current_time;
                            console.log('Spawning new big remote attacker: ' + newName + ' on spawn ' + spawn_name);
                            game.spawns[spawn_name].spawnCreep([ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'remote_close_attacker', target_room: target_room_name, level: spawn_level, main_room: room_name } });
                            return
                        } else if (remote_close_attackers[target_room_name] < 3 && spawn_level == 3) {
                            var newName = 'RemoteAttackerBOSS' + current_time;
                            console.log('Spawning new BOSS remote attacker: ' + newName + ' on spawn ' + spawn_name);
                            game.spawns[spawn_name].spawnCreep([ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'remote_close_attacker', target_room: target_room_name, level: spawn_level, main_room: room_name } });
                            return
                        } else if (remote_close_attackers[target_room_name] < 3 && spawn_level >= 4) {
                            var newName = 'RemoteAttackerULTRA' + current_time;
                            console.log('Spawning new ULTRA remote attacker: ' + newName + ' on spawn ' + spawn_name);
                            game.spawns[spawn_name].spawnCreep([ATTACK, ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'remote_close_attacker', target_room: target_room_name, level: spawn_level, main_room: room_name } });
                            return
                        }
                    }
                }

                if (room_name == main_room) {

                    for (var target_room_name in remote_builders) {
                        if (remote_builders[target_room_name] < 1 && spawn_level == 1) {
                            var newName = 'remoteBuilder' + current_time;
                            console.log('Spawning new remote builder: ' + newName + ' on spawn ' + spawn_name);
                            game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'remote_builder', target_room: target_room_name, level: spawn_level, main_room: room_name } });
                            return
                        } else if (remote_builders[target_room_name] < 2 && spawn_level == 2) {
                            var newName = 'RemoteBuilderBIG' + current_time;
                            console.log('Spawning new big remote builder: ' + newName + ' on spawn ' + spawn_name);
                            game.spawns[spawn_name].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'remote_builder', target_room: target_room_name, level: spawn_level, main_room: room_name } });
                            return
                        } else if (remote_builders[target_room_name] < 2 && spawn_level == 3) {
                            var newName = 'RemoteBuilderBOSS' + current_time;
                            console.log('Spawning new BOSS remote builder: ' + newName + ' on spawn ' + spawn_name);
                            game.spawns[spawn_name].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'remote_builder', target_room: target_room_name, level: spawn_level, main_room: room_name } });
                            return
                        } else if (remote_builders[target_room_name] < 2 && spawn_level >= 4) {
                            var newName = 'RemoteBuilderULTRA' + current_time;
                            console.log('Spawning new ULTRA remote builder: ' + newName + ' on spawn ' + spawn_name);
                            game.spawns[spawn_name].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'remote_builder', target_room: target_room_name, level: spawn_level, main_room: room_name } });
                            return
                        }
                    }
                }


                // if (scouts.length < 1 && spawn_level != 0) {
                //     var newName = 'Scout' + current_time;
                //     console.log('Spawning new scout: ' + newName + ' on spawn ' + spawn_name);
                //     game.spawns[spawn_name].spawnCreep([CARRY, MOVE, MOVE, MOVE, MOVE, CLAIM], newName, { memory: { role: 'scout', level: spawn_level, main_room: room_name } });
                //     return
                // }
            }
        }
    }

};

module.exports = creeps_spawn;