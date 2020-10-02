// Helper - remove mod with name from a list of mods
function removeMod(mod, modList) {
  return modList.filter(([modName, modVersion]) => modName !== mod)
}

// Don't take this mod into account in mod comparisons, since it doesn't affect gameplay.
ModHelpers.patch('hasSameMods', (hasSameMods, [modsA, modsB]) => {
  return hasSameMods(
    removeMod('pop-chart', modsA),
    removeMod('pop-chart', modsB)
  )
})
