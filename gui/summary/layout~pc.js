ModHelpers.patch('getScorePanelsData', (getScorePanelsData) => {
  const data = getScorePanelsData()
  data.units.titleHeadings[0].caption = sprintf(
    translate(
      'Units Statistics (%(onMap)s / %(trained)s / %(killed)s / %(captured)s / %(lost)s)'
    ),
    {
      onMap: getColoredTypeTranslation('onMap'),
      trained: getColoredTypeTranslation('trained'),
      killed: getColoredTypeTranslation('killed'),
      captured: getColoredTypeTranslation('captured'),
      lost: getColoredTypeTranslation('lost'),
    }
  )
  data.buildings.titleHeadings[0].caption = sprintf(
    translate(
      'Buildings Statistics (%(onMap)s / %(constructed)s / %(destroyed)s / %(captured)s / %(lost)s)'
    ),
    {
      onMap: getColoredTypeTranslation('onMap'),
      constructed: getColoredTypeTranslation('constructed'),
      destroyed: getColoredTypeTranslation('destroyed'),
      captured: getColoredTypeTranslation('captured'),
      lost: getColoredTypeTranslation('lost'),
    }
  )
  return data
})
