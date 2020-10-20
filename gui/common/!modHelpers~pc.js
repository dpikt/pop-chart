// Helper for patching an existing function defined in the global scope
function __patch(funcName, replacementFunc) {
  const originalFunc = global[funcName].bind(global)
  if (!originalFunc)
    throw new Error(
      'Attempting to patch non-existent global function ' + funcName
    )
  global[funcName] = (...args) => {
    return replacementFunc(originalFunc, args)
  }
}

// Helper for patching an existing function defined in the global scope
function __overwrite(funcName, replacementFunc) {
  const originalFunc = global[funcName].bind(global)
  if (!originalFunc)
    throw new Error(
      'Attempting to overwrite non-existent global function ' + funcName
    )
  global[funcName] = replacementFunc
}

// Helper - remove mod with a given name from a list of mods
function __removeModFromModList(modList, mod) {
  return modList.filter(([modName, modVersion]) => modName !== mod)
}

// "Modularize" the helpers.
const ModHelpers = {
  patch: __patch,
  overwrite: __overwrite,
  removeModFromModList: __removeModFromModList,
}
