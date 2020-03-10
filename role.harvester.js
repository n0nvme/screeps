var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
            // creep.say('🔄 refil');
        }
        if (!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
            // creep.say('🚧 repair');
        }

        if (creep.memory.harvesting) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[creep.memory.target]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.target], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity)
                    }
                })
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else {
                    if (creep.room.storage) {
                        if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    } else {
                        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER)
                            }
                        })
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

module.exports = roleHarvester;