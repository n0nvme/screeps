var roleRepairer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.claimController(creep.room.controller) != 0) {
            creep.moveTo(Game.flags.Flag1);
        }
    }
};

module.exports = roleRepairer;