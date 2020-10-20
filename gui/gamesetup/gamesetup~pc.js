// This function may have already been defined by another mod, so we allow for that possibility.
global.getFilteredMods =
  global.getFilteredMods || (() => Engine.GetEngineInfo().mods)

ModHelpers.patch('getFilteredMods', (getFilteredMods) => {
  const modList = getFilteredMods()
  return ModHelpers.removeModFromModList(modList, 'pop-chart')
})

// Overwrite this function to allow anyone to join games with this mod, effectively making this mod a "spec only" mod.
// Unfortunately, this function is written in such a way that we need to include all of it to change the functionality we need.
ModHelpers.overwrite('sendRegisterGameStanzaImmediate', () => {
  if (!g_IsController || !Engine.HasXmppClient()) return

  if (g_GameStanzaTimer !== undefined) {
    clearTimeout(g_GameStanzaTimer)
    g_GameStanzaTimer = undefined
  }

  let clients = formatClientsForStanza()
  let stanza = {
    name: g_ServerName,
    port: g_ServerPort,
    hostUsername: Engine.LobbyGetNick(),
    mapName: g_GameAttributes.map,
    niceMapName: getMapDisplayName(g_GameAttributes.map),
    mapSize:
      g_GameAttributes.mapType == 'random'
        ? g_GameAttributes.settings.Size
        : 'Default',
    mapType: g_GameAttributes.mapType,
    victoryConditions: g_GameAttributes.settings.VictoryConditions.join(','),
    nbp: clients.connectedPlayers,
    maxnbp: g_GameAttributes.settings.PlayerData.length,
    players: clients.list,
    stunIP: g_StunEndpoint ? g_StunEndpoint.ip : '',
    stunPort: g_StunEndpoint ? g_StunEndpoint.port : '',
    mods: JSON.stringify(getFilteredMods(g_GameAttributes)), // <----- THIS CHANGES
  }

  // Only send the stanza if the relevant settings actually changed
  if (
    g_LastGameStanza &&
    Object.keys(stanza).every((prop) => g_LastGameStanza[prop] == stanza[prop])
  )
    return

  g_LastGameStanza = stanza
  Engine.SendRegisterGame(stanza)
})
