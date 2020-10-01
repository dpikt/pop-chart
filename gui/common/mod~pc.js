function removeMod(mod, modList) {
  return modList.filter(([modName, modVersion]) => modName !== mod)
}

ModHelpers.patch('hasSameMods', (hasSameMods, [modsA, modsB]) => {
  return hasSameMods(modsA, removeMod('pop-chart', modsB))
})
