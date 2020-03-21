var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 refil');
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > 0);
                }
            });
            if (target) {
                if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN && structure.store.energy > 200);
                    }
                });
                if (target) {
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        }
    }
};

module.exports = roleUpgrader;