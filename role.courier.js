var roleCourier = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (!creep.memory.moving && creep.carry.energy == 0) {
            creep.memory.moving = true;
            creep.say('🔄 refil');
        }
        if (creep.memory.moving && creep.carry.energy == creep.carryCapacity) {
            creep.memory.moving = false;
            creep.say('move energy');
        }

        if (creep.memory.moving) {
            var targets = creep.room.find(FIND_TOMBSTONES);
            if (targets.length) {
                console.log(targets)
                console.log(creep.withdraw(targets[0], RESOURCE_ENERGY))

                if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                var targets = creep.room.find(FIND_DROPPED_RESOURCES);
                if (targets.length) {
                    creep.moveTo(targets[0]);
                    creep.pickup(targets[0]);
                }
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER);
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};

module.exports = roleCourier;