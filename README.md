```javascript
Game.rooms['W12S3'].createConstructionSite( 20, 37, STRUCTURE_ROAD)
Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'BOSSHarvester', {memory: {role: 'harvester', target: 0}});
Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], 'BOSSUpgrader', {memory: {role: 'upgrader'}});


Game.structures['5e6434b211a57011a35c3c91'].attack(Game.getObjectById('5e65169d9a572029954c381e'))
```