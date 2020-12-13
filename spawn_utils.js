var get_spawn_level = function (available_energy) {
    var spawn_level = 0;
    if (available_energy >= 300 && available_energy < 500) {
        spawn_level = 1
    } else if (available_energy >= 550 && available_energy < 800) {
        spawn_level = 2;
    } else if (available_energy >= 800 && available_energy <= 1300) {
        spawn_level = 3;
    }
    else if (available_energy >= 1300) {
        spawn_level = 4;
    }
    return spawn_level
}

module.exports = get_spawn_level
