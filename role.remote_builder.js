var roleRemoteBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }

        if (creep.memory.building) {
            if (creep.room.name !== creep.memory.target_room) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.target_room), { visualizePathStyle: { stroke: '#ffaa00' } })
            } else {
                var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        } else {
            if (creep.room.name !== creep.memory.main_room) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.main_room), { visualizePathStyle: { stroke: '#ffffff' } })
            } else {
                if (creep.room.storage) {
                    if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, { visualizePathStyle: { stroke: '#00ee00' } });
                    }
                } else {
                    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy < 2000)
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
    }
};

module.exports = roleRemoteBuilder;