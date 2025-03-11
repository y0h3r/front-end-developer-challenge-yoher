import { fromStringToBoolean } from '@utils/to-boolean';

export interface Skill {
  id: string;
  icon:
    | 'stack'
    | 'fork'
    | 'cake'
    | 'crown'
    | 'ship'
    | 'goggles'
    | 'lightning'
    | 'skull';
  requiredSkill?: string;
}

const mockSkills: Skill[] = [
  { id: 'L1-1', icon: 'stack' },
  { id: 'L1-2', icon: 'fork', requiredSkill: 'L1-1' },
  { id: 'L1-3', icon: 'cake', requiredSkill: 'L1-2' },
  { id: 'L1-4', icon: 'crown', requiredSkill: 'L1-3' },
  { id: 'L2-1', icon: 'ship' },
  { id: 'L2-2', icon: 'goggles', requiredSkill: 'L2-1' },
  { id: 'L2-3', icon: 'lightning', requiredSkill: 'L2-2' },
  { id: 'L2-4', icon: 'skull', requiredSkill: 'L2-3' },
];

const USE_MOCK = fromStringToBoolean(process.env.USE_MOCK || 'false');

export class SkillService {
  static async getSkills(): Promise<Skill[]> {
    if (USE_MOCK) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(mockSkills), 1000)
      );
    } else {
      // implent service skills
      return new Promise((resolve) => setTimeout(() => resolve([]), 1000));
    }
  }
}
