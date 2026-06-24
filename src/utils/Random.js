export class Random {
  static getInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getPosition(exclude = -1, totalCells) {
    let position;
    let attempts = 0;
    do {
      position = Random.getInt(0, totalCells - 1);
      attempts++;
    } while (position === exclude && attempts < 100);
    return position;
  }
}