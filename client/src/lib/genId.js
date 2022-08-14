function genId() {
  const symbols = 'XSDRW123456789';
  let id = '';

  for (let i = 0; i < 6; i++) {
    let s = Math.floor(Math.random() * symbols.length);
    id += symbols[s];
  }
  return id;
}

export default genId;
