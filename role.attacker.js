var roleAttacker = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.room.name !== creep.memory.target_room) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.target_room), { visualizePathStyle: { stroke: '#ee0000' } })
        } else {
            target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            if (targets) {
                if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ee0000' } });
                }
            } else {
                targets = creep.room.find(FIND_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_SPAWN });
                if (targets.length != 0) {
                    if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ee0000' } });
                    }
                }
            }
        }
    }
};

module.exports = roleAttacker;