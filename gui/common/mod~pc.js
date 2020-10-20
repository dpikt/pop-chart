// Don't take this mod into account in mod comparisons, since it doesn't affect gameplay.
ModHelpers.patch('hasSameMods', (hasSameMods, [modsA, modsB]) => {
  return hasSameMods(
    ModHelpers.removeModFromModList(modsA, 'pop-chart'),
    ModHelpers.removeModFromModList(modsB, 'pop-chart')
  )
})
