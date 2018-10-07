/**
 * items: [
      { id: "1", row: 0, column: 0 },
      { id: "2", row: 0, column: 1 },
      { id: "3", row: 1, column: 0 }
    ]

    const row0 = [{ id: "1", row: 0, column: 0 }, { id: "2", row: 0, column: 1 }];
    const row1 = [{ id: "3", row: 1, column: 0 }];
    const rows = [row0, row1, row2];
 */

export default items => {
  let maxRow = 0;
  const rows = items.reduce((_rows, item) => {
    // console.log(item.row, _rows, item);
    if (maxRow < item.row) maxRow = item.row;

    if (!_rows[item.row]) _rows[item.row] = [];
    _rows[item.row][item.column] = item;

    return _rows;
  }, []);
  // console.log(maxRow);
  for (let i = 0; i <= maxRow + 1; i++) {
    if (!rows[i]) rows[i] = [];
  }
  return rows;
};
