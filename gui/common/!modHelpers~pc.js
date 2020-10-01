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

function __overwrite(funcName, replacementFunc) {
  const originalFunc = global[funcName].bind(global)
  if (!originalFunc)
    throw new Error(
      'Attempting to overwrite non-existent global function ' + funcName
    )
  global[funcName] = replacementFunc
}

const ModHelpers = {
  patch: __patch,
  overwrite: __overwrite,
}
