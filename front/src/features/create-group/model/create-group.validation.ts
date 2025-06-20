import { z } from 'zod';

export const createGroupSchema = z.object({
  name: z.string().min(3, 'Название группы должно содержать минимум 3 символа'),
  ownerId: z.number().min(1, 'ID владельца обязателен'),
  memberIds: z.array(z.number()).optional(),
});

export type CreateGroupFormData = z.infer<typeof createGroupSchema>;

