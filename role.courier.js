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
            var target = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
                filter: (structure) => {
                    return (structure.store.getUsedCapacity > 0);
                }
            });
            // console.log(JSON.stringify(target));

            if (target) {
                // console.log(JSON.stringify(target));
                // console.log(creep.withdraw(target, RESOURCE_ENERGY))
                console.log(JSON.stringify(target.name))

                if (creep.withdraw(target, target.store.keys()[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                var target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if (target) {
                    creep.moveTo(target);
                    creep.pickup(target);
                } else {
                    if (creep.room.storage) {
                        if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    }
                }
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER && structure.energy < 950);
                }
            });
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (((structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity) || (structure.structureType == STRUCTURE_SPAWN && structure.energy < 270)) || (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy < structure.storeCapacity));
                    }
                });
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
                // } else {
                //     var targets = creep.room.find(FIND_STRUCTURES, {
                //         filter: (structure) => {
                //             return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy < structure.storeCapacity);
                //         }
                //     });
                //     if (targets.length > 0) {
                //         if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //             creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                //         }
                //     }
                // }
            }
        }
    }
};

module.exports = roleCourier;