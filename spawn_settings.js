var spawn_settings = {
    1: {
        counts: {
            harvesters0: 2, harvesters1: 4, repairers: 1, upgraders: 1, builders: 1, couriers: 1, remote_harvesters: 2,
        },
        types: {
            harvester: [WORK, CARRY, MOVE, MOVE],
            repairer: [WORK, CARRY, MOVE, MOVE],
            upgrader: [WORK, CARRY, CARRY, MOVE],
            builder: [WORK, CARRY, CARRY, MOVE],
            courier: [WORK, CARRY, CARRY, MOVE, MOVE],
            remote_harvester: [WORK, CARRY, MOVE, MOVE]
        }
    },
    2: {
        counts: {
            harvesters0: 6, harvesters1: 7, repairers: 2, upgraders: 2, builders: 5, couriers: 1, remote_harvesters: 4,
        },
        types: {
            harvester: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
            builder: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
            repairer: [WORK, CARRY, MOVE, MOVE],
            upgrader: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE],
            courier: [WORK, CARRY, CARRY, MOVE, MOVE],
            remote_harvester: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        }
    },
    3: {
        counts: {
            harvesters0: 3, harvesters1: 4, repairers: 2, upgraders: 2, couriers: 1, remote_harvesters: 3
        },
        types: {
            harvester: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],

            repairer: [WORK, CARRY, MOVE, MOVE],
            builder: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            upgrader: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            courier: [WORK, CARRY, CARRY, MOVE, MOVE],
            remote_harvester: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],

        },
    },
    4: {
        counts: {
            harvesters0: 3, harvesters1: 4, repairers: 2, upgraders: 2, couriers: 4, remote_harvesters: 3
        },
        types: {
            harvester: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            builder: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            repairer: [WORK, CARRY, MOVE, MOVE],
            upgrader: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            courier: [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            remote_harvester: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        }
    }
}

module.exports = spawn_settings;
