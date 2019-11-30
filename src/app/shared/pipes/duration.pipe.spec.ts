import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if value undefined', () => {
    const n = undefined;

    expect(pipe.transform(n).length).toBe(0);
  });

  it('should return only hours if number multiple of 60', () => {
    const n = 120;

    expect(pipe.transform(n)).toBe('2h');
  });

  it('should return only minutes if number less then 60', () => {
    const n = 59;

    expect(pipe.transform(n)).toBe(`${n}m`);
  });

  it('should return hours and minutes if number more then 60', () => {
    const n = 61;

    expect(pipe.transform(n)).toBe(`1h 1m`);
  });
});
