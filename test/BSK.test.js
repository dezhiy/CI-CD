/* eslint no-use-before-define: 0 */
import Frame from '../src/Frame';
import Game from '../src/Game';


describe('Demo Test Suite', () => {

  test('Demo test', () => {
        expect(1).toBe(1);
  });
});


describe('Bowling Score Test', () => {

  test('Create Frame', () => {
		const frame = new Frame(2,4);
		expect(frame.firstThrow()).toBe(2);
		expect(frame.secondThrow()).toBe(4);
  });

  test('Frame Score', () => {
		const frame = new Frame(2,6);
		expect(frame.sum()).toBe(8);
  });

  test('Game Score', () => {
		const game = new Game();
		game.addFrame(new Frame(1,5));
		game.addFrame(new Frame(3,6));
		game.addFrame(new Frame(7,2));
		game.addFrame(new Frame(3,6));
		game.addFrame(new Frame(4,4));
		game.addFrame(new Frame(5,3));
		game.addFrame(new Frame(3,3));
		game.addFrame(new Frame(4,5));
		game.addFrame(new Frame(8,1));
		game.addFrame(new Frame(2,6));
		expect(game.score()).toBe(81);
  });

  test('Identify Strike Frame', () => {
    const frame = new Frame(10,0);
    expect(frame.isStrike()).toBeTruthy();
    const anotherFrame = new Frame(9,1);
    expect(anotherFrame.isStrike()).toBeFalsy();
  });

  test('Score A Strike Frame', () => {
    const game = new Game();
    game.addFrame(new Frame(1,5));
    game.addFrame(new Frame(3,6));
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(9,1));
    expect(game.isStrike(3)).toBeTruthy();
    expect(game.frameScore(3)).toBe(20);
  });

  test('Identify Spare Frame', () => {
    const frame = new Frame(1,9);
    expect(frame.isSpare()).toBeTruthy();
    const anotherFrame = new Frame(0,9);
    expect(anotherFrame.isSpare()).toBeFalsy();
  });

  test('Score A Spare Frame', () => {
    const game = new Game();
    game.addFrame(new Frame(1,5));
    game.addFrame(new Frame(3,6));
    game.addFrame(new Frame(1,9));
    game.addFrame(new Frame(3,6));
    expect(game.isSpare(3)).toBeTruthy();
    expect(game.frameScore(3)).toBe(13);
  });

  test('Strike Followed By Spare', () => {
    const game = new Game();
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(5,5));
    game.addFrame(new Frame(3,6));

    expect(game.frameScore(1)).toBe(20);
    expect(game.frameScore(2)).toBe(13);
  });

  test('Identify Multiple Strikes', () => {
    const game = new Game();
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(10,0));
    expect(game.isStrike(1) && game.isStrike(2)).toBeTruthy();
  });

  test('Multiple Strike Score First Strike', () => {
    const game = new Game();
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(7,2));
    expect(game.frameScore(1)).toBe(27);
  });

  test('MulipleStrikeScoreSecondStrike', () => {
    const game = new Game();
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(7,2));
    expect(game.frameScore(2)).toBe(19);
  });

  test('Multiple Strikes Game Score', () => {
    const game = new Game();
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(7,2));
    game.addFrame(new Frame(3,6));
    game.addFrame(new Frame(4,4));
    game.addFrame(new Frame(5,3));
    game.addFrame(new Frame(3,3));
    game.addFrame(new Frame(4,5));
    game.addFrame(new Frame(8,1));
    game.addFrame(new Frame(2,6));

    expect(game.score()).toBe(112);
  });

  test('Multiple Spares', () => {
    const game = new Game();

    game.addFrame(new Frame(8,2));
    game.addFrame(new Frame(5,5));
    game.addFrame(new Frame(7,2));
    game.addFrame(new Frame(3,6));
    game.addFrame(new Frame(4,4));
    game.addFrame(new Frame(5,3));
    game.addFrame(new Frame(3,3));
    game.addFrame(new Frame(4,5));
    game.addFrame(new Frame(8,1));
    game.addFrame(new Frame(2,6));


    expect(game.frameScore(1)).toBe(10);
    expect(game.frameScore(2)).toBe(17);

    //check later
    expect(game.score()).toBe(93);
  });

  test('Is Last Spare', () => {
    const game = new Game();

    game.addFrame(new Frame(1,5));
    game.addFrame(new Frame(3,6));
    game.addFrame(new Frame(7,2));
    game.addFrame(new Frame(3,6));
    game.addFrame(new Frame(4,4));
    game.addFrame(new Frame(5,3));
    game.addFrame(new Frame(3,3));
    game.addFrame(new Frame(4,5));
    game.addFrame(new Frame(8,1));
    game.addFrame(new Frame(2,8));

    expect(game.isSpare(10)).toBeTruthy();
  });

  test('Last Spare Score', () => {
    const game = new Game();

    game.addFrame(new Frame(1,5));
    game.addFrame(new Frame(3,6));
    game.addFrame(new Frame(7,2));
    game.addFrame(new Frame(3,6));
    game.addFrame(new Frame(4,4));
    game.addFrame(new Frame(5,3));
    game.addFrame(new Frame(3,3));
    game.addFrame(new Frame(4,5));
    game.addFrame(new Frame(8,1));
    game.addFrame(new Frame(2,8));
    game.addBonusThrow(7);

    expect(game.frameScore(10)).toBe(17);
    expect(game.score()).toBe(90);
  });

  test('Last Frame Strike', () => {
    const game = new Game();

    game.addFrame(new Frame(1,5));
    game.addFrame(new Frame(3,6));
    game.addFrame(new Frame(7,2));
    game.addFrame(new Frame(3,6));
    game.addFrame(new Frame(4,4));
    game.addFrame(new Frame(5,3));
    game.addFrame(new Frame(3,3));
    game.addFrame(new Frame(4,5));
    game.addFrame(new Frame(8,1));
    game.addFrame(new Frame(10,0));
    game.addBonusThrow(7);
    game.addBonusThrow(2);

    expect(game.frameScore(10)).toBe(19);
    expect(game.score()).toBe(92);
  });

  test('Bonus is Strike', () => {
    const game = new Game();

    game.addFrame(new Frame(1,5));
    game.addFrame(new Frame(3,6));
    game.addFrame(new Frame(7,2));
    game.addFrame(new Frame(3,6));
    game.addFrame(new Frame(4,4));
    game.addFrame(new Frame(5,3));
    game.addFrame(new Frame(3,3));
    game.addFrame(new Frame(4,5));
    game.addFrame(new Frame(8,1));
    game.addFrame(new Frame(2,8));
    game.addBonusThrow(10);

    expect(game.frameScore(10)).toBe(20);
    expect(game.score()).toBe(93);
  });

  test('Best Score', () => {
    const game = new Game();

    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(10,0));
    game.addBonusThrow(10);
    game.addBonusThrow(10);

    for(let i = 1; i < 10; i += 1){
        expect(game.frameScore(i)).toBe(30);
    }

    expect(game.score()).toBe(300);
  });

  test('Real Game', () => {

    const game = new Game();

    game.addFrame(new Frame(6,3));
    game.addFrame(new Frame(7,1));
    game.addFrame(new Frame(8,2));
    game.addFrame(new Frame(7,2));
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(6,2));
    game.addFrame(new Frame(7,3));
    game.addFrame(new Frame(10,0));
    game.addFrame(new Frame(8,0));
    game.addFrame(new Frame(7,3));
    game.addBonusThrow(10);

    expect(game.frameScore(1)).toBe(9);
    expect(game.frameScore(2)).toBe(8);
    expect(game.frameScore(3)).toBe(17);
    expect(game.frameScore(4)).toBe(9);
    expect(game.frameScore(5)).toBe(18);
    expect(game.frameScore(6)).toBe(8);
    expect(game.frameScore(7)).toBe(20);
    expect(game.frameScore(8)).toBe(18);
    expect(game.frameScore(9)).toBe(8);
    expect(game.frameScore(10)).toBe(20);

    expect(game.score()).toBe(135);
  });

  test('Throw Can Not Be Negative', () => {
    const t = () => new Frame(1, -1);
    expect(t).toThrow();
  });

});
