var INITIAL_BUILDING_QUANTITIES = {
  total: 1,
  CivCentre: 1,
}

var INITIAL_UNIT_QUANTITIES = {
  total: 9,
  Infantry: 4,
  Worker: 8,
  Cavalry: 1,
}

function calculateTotalBuildingCount(numConstructed, numLost, type) {
  const initialQuantity = INITIAL_BUILDING_QUANTITIES[type] || 0
  return initialQuantity + numConstructed - numLost
}

ModHelpers.overwrite('calculateBuildings', (playerState, index, type) => {
  const buildingsConstructed =
    playerState.sequences.buildingsConstructed[type][index]
  const buildingsDestroyed =
    playerState.sequences.enemyBuildingsDestroyed[type][index]
  const buildingsCaptured = playerState.sequences.buildingsCaptured[type][index]
  const buildingsLost = playerState.sequences.buildingsLost[type][index]
  return {
    onMap: calculateTotalBuildingCount(
      buildingsConstructed,
      buildingsLost,
      type
    ),
    constructed: buildingsConstructed,
    destroyed: buildingsDestroyed,
    captured: buildingsCaptured,
    lost: buildingsLost,
  }
})

function calculateTotalPop(numTrained, numLost, type) {
  var initialQuantity = INITIAL_UNIT_QUANTITIES[type] || 0
  return initialQuantity + numTrained - numLost
}

ModHelpers.overwrite(
  'calculateUnitsWithCaptured',
  (playerState, index, type) => {
    var counts = calculateUnits(playerState, index, type)
    var capturedUnits = playerState.sequences.unitsCaptured[type][index]
    return {
      onMap: counts.onMap,
      trained: counts.trained,
      killed: counts.killed,
      captured: capturedUnits,
      lost: counts.lost,
    }
  }
)

ModHelpers.overwrite('calculateUnits', (playerState, index, type) => {
  const unitsTrained = playerState.sequences.unitsTrained[type][index]
  const unitsKilled = playerState.sequences.enemyUnitsKilled[type][index]
  const unitsLost = playerState.sequences.unitsLost[type][index]
  return {
    onMap: calculateTotalPop(unitsTrained, unitsLost, type),
    trained: unitsTrained,
    killed: unitsKilled,
    lost: unitsLost,
  }
})
