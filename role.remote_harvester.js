var roleRemoteHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
        }
        if (!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
        }
        if (creep.room.name == creep.memory.main_room && creep.memory.harvesting && creep.ticksToLive < 500) {
            creep.memory.renewing = true;
        }
        if (creep.memory.renewing && creep.ticksToLive >= 1200) {
            creep.memory.renewing = false;
        }
        if (creep.memory.renewing) {
            var target = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            creep.moveTo(target);
        } else {
            if (creep.memory.harvesting) {
                if (creep.room.name !== creep.memory.target_room) {
                    creep.moveTo(new RoomPosition(25, 25, creep.memory.target_room), { visualizePathStyle: { stroke: '#ffaa00' } })
                } else {
                    var sources = creep.room.find(FIND_SOURCES);
                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
            } else {
                if (creep.room.name !== creep.memory.main_room) {
                    creep.moveTo(new RoomPosition(25, 25, creep.memory.main_room), { visualizePathStyle: { stroke: '#ffffff' } })
                } else {
                    if (creep.room.storage) {
                        if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage, { visualizePathStyle: { stroke: '#00ee00' } });
                        }
                    } else {
                        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy < 2000)
                            }
                        });
                        if (target) {
                            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleRemoteHarvester;