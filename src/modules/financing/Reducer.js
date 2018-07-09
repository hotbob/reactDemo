const financing_itemId = (financing_itemId = '', action)=> {
  if ("/financing/selItem" === action.type) {
    return action.itemId;
  } else {
    return financing_itemId;
  }
}

export default { financing_itemId }
