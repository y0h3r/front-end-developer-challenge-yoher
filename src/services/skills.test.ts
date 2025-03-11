import { SkillService } from './skills';
import { fromStringToBoolean } from '@utils/to-boolean';

jest.mock('@utils/to-boolean', () => ({
  fromStringToBoolean: jest.fn(),
}));

describe('SkillService - Fetching Skills', () => {
  test('returns mock skills when USE_MOCK is true', async () => {
    (fromStringToBoolean as jest.Mock).mockReturnValue(true);

    const skills = await SkillService.getSkills();

    expect(skills).toHaveLength(8);
    expect(skills[0]).toEqual({ id: 'L1-1', icon: 'stack' });
  });

  test('returns an empty array when USE_MOCK is false', async () => {
    (fromStringToBoolean as jest.Mock).mockReturnValue(false);

    const skills = await SkillService.getSkills();

    expect(skills).toEqual([]);
  });

  test('waits for the async operation before resolving', async () => {
    jest.useFakeTimers();

    (fromStringToBoolean as jest.Mock).mockReturnValue(true);

    const skillPromise = SkillService.getSkills();

    jest.runAllTimers();
    const skills = await skillPromise;

    expect(skills).toHaveLength(8);

    jest.useRealTimers();
  });
});
